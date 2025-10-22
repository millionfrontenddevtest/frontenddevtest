# Script para insertar datos de prueba en MongoDB Atlas
# Real Estate API

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Insertando Datos de Prueba" -ForegroundColor Cyan
Write-Host "MongoDB Atlas - RealStateDB_Dev" -ForegroundColor Cyan
Write-Host "Ubicacion: Florida, USA" -ForegroundColor Cyan
Write-Host "Moneda: USD (Dolares)" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

$baseUrl = "http://localhost:5298/api/Properties"

# Array de propiedades para insertar
$propiedades = @(
    @{
        idOwner = "507f1f77bcf86cd799439010"
        name = "Casa Moderna en Miami"
        address = "Ocean Drive 123, Miami, Florida"
        price = 385000
        image = "https://via.placeholder.com/400x300?text=Casa+Miami"
    },
    @{
        idOwner = "507f1f77bcf86cd799439011"
        name = "Apartamento Lujo Fort Lauderdale"
        address = "Las Olas Boulevard 456, Fort Lauderdale, Florida"
        price = 495000
        image = "https://via.placeholder.com/400x300?text=Apartamento+FortLauderdale"
    },
    @{
        idOwner = "507f1f77bcf86cd799439012"
        name = "Villa Moderna Tampa"
        address = "Bayshore Boulevard 789, Tampa, Florida"
        price = 320000
        image = "https://via.placeholder.com/400x300?text=Villa+Tampa"
    },
    @{
        idOwner = "507f1f77bcf86cd799439013"
        name = "Piso Centro Orlando"
        address = "International Drive 101, Orlando, Florida"
        price = 295000
        image = "https://via.placeholder.com/400x300?text=Piso+Orlando"
    },
    @{
        idOwner = "507f1f77bcf86cd799439014"
        name = "Chalet Historico Jacksonville"
        address = "Riverside Avenue 202, Jacksonville, Florida"
        price = 410000
        image = "https://via.placeholder.com/400x300?text=Chalet+Jacksonville"
    },
    @{
        idOwner = "507f1f77bcf86cd799439015"
        name = "Penthouse Miami Beach"
        address = "Collins Avenue 259, Miami Beach, Florida"
        price = 720000
        image = "https://via.placeholder.com/400x300?text=Penthouse+MiamiBeach"
    },
    @{
        idOwner = "507f1f77bcf86cd799439016"
        name = "Casa Playa Clearwater"
        address = "Gulf to Bay Boulevard 55, Clearwater, Florida"
        price = 475000
        image = "https://via.placeholder.com/400x300?text=Casa+Clearwater"
    },
    @{
        idOwner = "507f1f77bcf86cd799439017"
        name = "Loft Industrial Naples"
        address = "Central Avenue 78, Naples, Florida"
        price = 385000
        image = "https://via.placeholder.com/400x300?text=Loft+Naples"
    }
)

$insertados = 0
$errores = 0

Write-Host ""
Write-Host "Insertando $($propiedades.Count) propiedades..." -ForegroundColor Yellow
Write-Host ""

foreach ($prop in $propiedades) {
    try {
        $body = $prop | ConvertTo-Json
        $response = Invoke-WebRequest -Uri $baseUrl `
            -Method POST `
            -ContentType "application/json" `
            -Body $body `
            -TimeoutSec 10 `
            -ErrorAction Stop
        
        $result = $response.Content | ConvertFrom-Json
        
        Write-Host "[OK] $($prop.name)" -ForegroundColor Green
        Write-Host "     ID: $($result.data.id)" -ForegroundColor Green
        Write-Host "     Precio: USD $($prop.price)" -ForegroundColor Green
        
        $insertados++
    } catch {
        Write-Host "[ERROR] $($prop.name)" -ForegroundColor Red
        Write-Host "        $($_.Exception.Message)" -ForegroundColor Red
        $errores++
    }
    
    Start-Sleep -Milliseconds 300
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Resumen de Insercion:" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Insertados: $insertados" -ForegroundColor Green
Write-Host "Errores: $errores" -ForegroundColor $(if ($errores -eq 0) { "Green" } else { "Red" })
Write-Host ""

# Verificar datos insertados
Write-Host "Verificando datos en la base de datos..." -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method GET -TimeoutSec 10
    $result = $response.Content | ConvertFrom-Json
    
    Write-Host "Total de propiedades en BD: $($result.data.Count)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Listado de propiedades:" -ForegroundColor Cyan
    
    $count = 1
    foreach ($prop in $result.data) {
        Write-Host "$count. $($prop.name)" -ForegroundColor Yellow
        Write-Host "   Precio: USD $($prop.price)" -ForegroundColor White
        Write-Host "   Direccion: $($prop.address)" -ForegroundColor White
        Write-Host "   ID: $($prop.id)" -ForegroundColor Gray
        Write-Host ""
        $count++
    }
    
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "INSERTACION COMPLETADA EXITOSAMENTE" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Cyan
    
} catch {
    Write-Host "Error al verificar: $($_.Exception.Message)" -ForegroundColor Red
}
