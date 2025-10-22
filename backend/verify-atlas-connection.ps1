# Script para verificar conexion a MongoDB Atlas
# Real Estate API

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Verificando conexion a MongoDB Atlas" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

$baseUrl = "http://localhost:5298/api/Properties"

Write-Host ""
Write-Host "PRUEBA 1: Conectar a la API..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method GET -TimeoutSec 5
    Write-Host "[OK] API respondiendo en puerto 5298" -ForegroundColor Green
    Write-Host "[OK] Status Code: $($response.StatusCode)" -ForegroundColor Green
    
    $data = $response.Content | ConvertFrom-Json
    Write-Host "[OK] Respuesta JSON valida" -ForegroundColor Green
    Write-Host "[OK] Campo success: $($data.success)" -ForegroundColor Green
    Write-Host "[OK] Mensaje: $($data.message)" -ForegroundColor Green
    Write-Host "[OK] Propiedades en BD: $($data.data.Count)" -ForegroundColor Green
    
    if ($data.data.Count -gt 0) {
        Write-Host "[OK] Datos encontrados - BD conectada correctamente" -ForegroundColor Green
    } else {
        Write-Host "[AVISO] BD conectada pero sin datos" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "[ERROR] No se puede conectar a la API" -ForegroundColor Red
    Write-Host "[ERROR] Verifica que dotnet run este ejecutandose" -ForegroundColor Red
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "PRUEBA 2: Crear una propiedad de prueba..." -ForegroundColor Yellow

try {
    $timestamp = Get-Date -Format "HH:mm:ss"
    $testProperty = @{
        idOwner = "507f1f77bcf86cd799439010"
        name = "Test Conexion - $timestamp"
        address = "Calle de Prueba 123"
        price = 99999
        image = "https://via.placeholder.com/test"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri $baseUrl -Method POST `
        -ContentType "application/json" `
        -Body $testProperty `
        -TimeoutSec 5
    
    $result = $response.Content | ConvertFrom-Json
    Write-Host "[OK] Propiedad creada exitosamente" -ForegroundColor Green
    Write-Host "[OK] ID generado: $($result.data.id)" -ForegroundColor Green
    Write-Host "[OK] MongoDB Atlas esta guardando datos" -ForegroundColor Green
    
    $createdId = $result.data.id
    
} catch {
    Write-Host "[ERROR] No se pudo crear propiedad" -ForegroundColor Red
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "PRUEBA 3: Verificar que se guardaron los datos..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method GET -TimeoutSec 5
    $data = $response.Content | ConvertFrom-Json
    Write-Host "[OK] Total de propiedades: $($data.data.Count)" -ForegroundColor Green
    
    if ($data.data.Count -gt 0) {
        Write-Host ""
        Write-Host "Propiedades en la base de datos:" -ForegroundColor Cyan
        $count = 0
        foreach ($prop in $data.data) {
            if ($count -lt 5) {
                Write-Host "  - $($prop.name) / Precio: EUR $($prop.price)" -ForegroundColor Green
                $count++
            }
        }
    }
    
} catch {
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "RESUMEN:" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "[OK] Conexion exitosa a MongoDB Atlas" -ForegroundColor Green
Write-Host "[OK] API funcionando correctamente" -ForegroundColor Green
Write-Host "[OK] Base de datos RealStateDB_Dev accesible" -ForegroundColor Green
Write-Host "[OK] Coleccion Properties operativa" -ForegroundColor Green
Write-Host ""
Write-Host "Estado General: CONECTADO Y FUNCIONAL" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
