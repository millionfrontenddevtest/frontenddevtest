# Script para limpiar todas las propiedades existentes
# y luego insertar las nuevas de Florida

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Limpiando Base de Datos" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

$baseUrl = "http://localhost:5298/api/Properties"

Write-Host ""
Write-Host "Obteniendo todas las propiedades existentes..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method GET -TimeoutSec 10
    $result = $response.Content | ConvertFrom-Json
    
    $propiedadesToDelete = $result.data.Count
    
    if ($propiedadesToDelete -gt 0) {
        Write-Host "Se encontraron $propiedadesToDelete propiedades para eliminar" -ForegroundColor Yellow
        Write-Host ""
        
        $deleted = 0
        foreach ($prop in $result.data) {
            try {
                $deleteResponse = Invoke-WebRequest -Uri "$baseUrl/$($prop.id)" -Method DELETE -TimeoutSec 10
                Write-Host "[OK] Eliminada: $($prop.name)" -ForegroundColor Green
                $deleted++
            } catch {
                Write-Host "[ERROR] No se pudo eliminar $($prop.name)" -ForegroundColor Red
            }
            
            Start-Sleep -Milliseconds 200
        }
        
        Write-Host ""
        Write-Host "Propiedades eliminadas: $deleted" -ForegroundColor Green
    } else {
        Write-Host "La base de datos ya esta vacia" -ForegroundColor Green
    }
    
} catch {
    Write-Host "Error al obtener propiedades: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Ahora ejecuta:" -ForegroundColor Yellow
Write-Host "powershell -ExecutionPolicy Bypass -File insert-properties.ps1" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
