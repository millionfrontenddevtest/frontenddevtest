# PowerShell Testing Script for Real Estate API
# Ejecutar: powershell -ExecutionPolicy Bypass -File test-api.ps1

Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Real Estate API - Prueba Automática de Endpoints        ║" -ForegroundColor Cyan
Write-Host "║   PowerShell Testing Script                               ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

# Configuración
$baseUrl = "http://localhost:5000/api/properties"
$testsPassed = 0
$testsFailed = 0

# Función para probar endpoint
function Test-Endpoint {
    param(
        [string]$name,
        [string]$method,
        [string]$url,
        [hashtable]$headers = @{ "Content-Type" = "application/json" },
        [object]$body = $null
    )
    
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
    Write-Host "TEST: $name" -ForegroundColor Yellow
    Write-Host "Method: $method | URL: $url" -ForegroundColor Gray
    
    try {
        if ($body) {
            $bodyJson = $body | ConvertTo-Json
            Write-Host "Body: $bodyJson" -ForegroundColor Gray
            
            $response = Invoke-RestMethod -Uri $url `
                -Method $method `
                -ContentType "application/json" `
                -Headers $headers `
                -Body $bodyJson
        }
        else {
            $response = Invoke-RestMethod -Uri $url `
                -Method $method `
                -ContentType "application/json" `
                -Headers $headers
        }
        
        if ($response.success) {
            Write-Host "✅ EXITOSO" -ForegroundColor Green
            Write-Host "Respuesta: " -ForegroundColor Green
            $response | ConvertTo-Json | Write-Host -ForegroundColor Green
            $script:testsPassed++
            return $response
        }
        else {
            Write-Host "❌ FALLO (success = false)" -ForegroundColor Red
            Write-Host "Respuesta: " -ForegroundColor Red
            $response | ConvertTo-Json | Write-Host -ForegroundColor Red
            $script:testsFailed++
            return $null
        }
    }
    catch {
        Write-Host "❌ ERROR: $_" -ForegroundColor Red
        $script:testsFailed++
        return $null
    }
}

# ============================================================================
# PRUEBAS
# ============================================================================

Write-Host "`n[INICIANDO PRUEBAS...]" -ForegroundColor Cyan

# 1. GET - Obtener todas las propiedades
Write-Host "`n[1/7] Prueba: GET - Obtener todas las propiedades" -ForegroundColor Cyan
$allProperties = Test-Endpoint `
    -name "Obtener todas las propiedades" `
    -method "Get" `
    -url $baseUrl

if ($allProperties -and $allProperties.data -and $allProperties.data.Count -gt 0) {
    $firstProperty = $allProperties.data[0]
    $propertyId = $firstProperty.id
    Write-Host "Primera propiedad ID: $propertyId" -ForegroundColor Green
}

# 2. GET - Obtener propiedad por ID
if ($propertyId) {
    Write-Host "`n[2/7] Prueba: GET - Obtener propiedad por ID" -ForegroundColor Cyan
    Test-Endpoint `
        -name "Obtener propiedad por ID" `
        -method "Get" `
        -url "$baseUrl/$propertyId" | Out-Null
}

# 3. POST - Crear nueva propiedad
Write-Host "`n[3/7] Prueba: POST - Crear nueva propiedad" -ForegroundColor Cyan
$newProperty = @{
    idOwner = "507f1f77bcf86cd799439050"
    name = "Casa de Test $(Get-Date -Format 'yyyyMMdd-HHmmss')"
    address = "Calle de Prueba 123, Test City"
    price = 195000
    image = "https://example.com/test-property.jpg"
}

$createdProperty = Test-Endpoint `
    -name "Crear nueva propiedad" `
    -method "Post" `
    -url $baseUrl `
    -body $newProperty

if ($createdProperty -and $createdProperty.data) {
    $createdId = $createdProperty.data.id
    Write-Host "Propiedad creada con ID: $createdId" -ForegroundColor Green
}

# 4. PUT - Actualizar propiedad
if ($createdId) {
    Write-Host "`n[4/7] Prueba: PUT - Actualizar propiedad" -ForegroundColor Cyan
    $updateData = @{
        idOwner = "507f1f77bcf86cd799439050"
        name = "Casa Actualizada $(Get-Date -Format 'yyyyMMdd-HHmmss')"
        address = "Calle Actualizada 456, Test City"
        price = 210000
        image = "https://example.com/test-updated.jpg"
    }
    
    Test-Endpoint `
        -name "Actualizar propiedad" `
        -method "Put" `
        -url "$baseUrl/$createdId" `
        -body $updateData | Out-Null
}

# 5. POST - Filtrar propiedades por precio
Write-Host "`n[5/7] Prueba: POST - Filtrar propiedades por precio" -ForegroundColor Cyan
$filterPrice = @{
    minPrice = 100000
    maxPrice = 300000
}

Test-Endpoint `
    -name "Filtrar propiedades por precio (100k-300k)" `
    -method "Post" `
    -url "$baseUrl/filter" `
    -body $filterPrice | Out-Null

# 6. POST - Filtrar propiedades por nombre
Write-Host "`n[6/7] Prueba: POST - Filtrar propiedades por nombre" -ForegroundColor Cyan
$filterName = @{
    name = "casa"
}

Test-Endpoint `
    -name "Filtrar propiedades por nombre" `
    -method "Post" `
    -url "$baseUrl/filter" `
    -body $filterName | Out-Null

# 7. DELETE - Eliminar propiedad
if ($createdId) {
    Write-Host "`n[7/7] Prueba: DELETE - Eliminar propiedad" -ForegroundColor Cyan
    Test-Endpoint `
        -name "Eliminar propiedad creada" `
        -method "Delete" `
        -url "$baseUrl/$createdId" | Out-Null
}

# ============================================================================
# RESUMEN
# ============================================================================

Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    RESUMEN DE PRUEBAS                     ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

Write-Host "`n📊 Resultados:" -ForegroundColor Cyan
Write-Host "✅ Pruebas exitosas: $testsPassed" -ForegroundColor Green
Write-Host "❌ Pruebas fallidas:  $testsFailed" -ForegroundColor Red

if ($testsFailed -eq 0) {
    Write-Host "`n🎉 ¡TODAS LAS PRUEBAS PASARON!" -ForegroundColor Green
    Write-Host "Tu API está funcionando correctamente." -ForegroundColor Green
}
else {
    Write-Host "`n⚠️  Algunas pruebas fallaron. Revisa los errores arriba." -ForegroundColor Yellow
}

Write-Host "`n" -ForegroundColor Cyan
