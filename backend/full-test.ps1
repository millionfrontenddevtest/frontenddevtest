# Script de prueba completa - Real Estate API
# Prueba todos los endpoints: GET, POST, PUT, DELETE, FILTER

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "PRUEBA COMPLETA - Real Estate API" -ForegroundColor Cyan
Write-Host "MongoDB Atlas + Real Estate API" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

$baseUrl = "http://localhost:5298/api/Properties"
$testsPass = 0
$testsFail = 0
$createdId = $null

# TEST 1: GET All Properties
Write-Host ""
Write-Host "TEST 1: GET All Properties" -ForegroundColor Yellow
Write-Host "GET $baseUrl" -ForegroundColor Gray

try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method GET -TimeoutSec 5
    $data = $response.Content | ConvertFrom-Json
    
    if ($response.StatusCode -eq 200 -and $data.success) {
        Write-Host "[PASS] Status 200 - Propiedades obtenidas" -ForegroundColor Green
        Write-Host "       Total en BD: $($data.data.Count)" -ForegroundColor Green
        $testsPass++
    } else {
        Write-Host "[FAIL] Respuesta inesperada" -ForegroundColor Red
        $testsFail++
    }
} catch {
    Write-Host "[FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
    $testsFail++
}

# TEST 2: POST Create Property
Write-Host ""
Write-Host "TEST 2: POST Create Property" -ForegroundColor Yellow
Write-Host "POST $baseUrl" -ForegroundColor Gray

try {
    $timestamp = Get-Date -Format "dd/MM/yyyy HH:mm:ss"
    $newProperty = @{
        idOwner = "507f1f77bcf86cd799439010"
        name = "Casa Premium - $timestamp"
        address = "Avenida Principal 456, Valencia"
        price = 425000
        image = "https://via.placeholder.com/400x300?text=Casa+Premium"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri $baseUrl -Method POST `
        -ContentType "application/json" `
        -Body $newProperty `
        -TimeoutSec 5
    
    $result = $response.Content | ConvertFrom-Json
    
    if ($response.StatusCode -eq 201 -and $result.data.id) {
        Write-Host "[PASS] Status 201 - Propiedad creada" -ForegroundColor Green
        Write-Host "       ID: $($result.data.id)" -ForegroundColor Green
        Write-Host "       Nombre: $($result.data.name)" -ForegroundColor Green
        Write-Host "       Precio: EUR $($result.data.price)" -ForegroundColor Green
        $createdId = $result.data.id
        $testsPass++
    } else {
        Write-Host "[FAIL] No se creo la propiedad" -ForegroundColor Red
        $testsFail++
    }
} catch {
    Write-Host "[FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
    $testsFail++
}

# TEST 3: GET by ID
if ($createdId) {
    Write-Host ""
    Write-Host "TEST 3: GET Property by ID" -ForegroundColor Yellow
    Write-Host "GET $baseUrl/$createdId" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl/$createdId" -Method GET -TimeoutSec 5
        $result = $response.Content | ConvertFrom-Json
        
        if ($response.StatusCode -eq 200 -and $result.data.id) {
            Write-Host "[PASS] Status 200 - Propiedad obtenida" -ForegroundColor Green
            Write-Host "       Nombre: $($result.data.name)" -ForegroundColor Green
            Write-Host "       Direccion: $($result.data.address)" -ForegroundColor Green
            $testsPass++
        } else {
            Write-Host "[FAIL] No se obtuvo la propiedad" -ForegroundColor Red
            $testsFail++
        }
    } catch {
        Write-Host "[FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
        $testsFail++
    }
}

# TEST 4: PUT Update Property
if ($createdId) {
    Write-Host ""
    Write-Host "TEST 4: PUT Update Property" -ForegroundColor Yellow
    Write-Host "PUT $baseUrl/$createdId" -ForegroundColor Gray
    
    try {
        $updateProperty = @{
            idOwner = "507f1f77bcf86cd799439010"
            name = "Casa Premium ACTUALIZADA"
            address = "Avenida Principal 789, Valencia"
            price = 475000
            image = "https://via.placeholder.com/400x300?text=Updated"
        } | ConvertTo-Json
        
        $response = Invoke-WebRequest -Uri "$baseUrl/$createdId" -Method PUT `
            -ContentType "application/json" `
            -Body $updateProperty `
            -TimeoutSec 5
        
        $result = $response.Content | ConvertFrom-Json
        
        if ($response.StatusCode -eq 200 -and $result.success) {
            Write-Host "[PASS] Status 200 - Propiedad actualizada" -ForegroundColor Green
            Write-Host "       Nuevo precio: EUR 475000" -ForegroundColor Green
            $testsPass++
        } else {
            Write-Host "[FAIL] No se actualizo la propiedad" -ForegroundColor Red
            $testsFail++
        }
    } catch {
        Write-Host "[FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
        $testsFail++
    }
}

# TEST 5: POST Filter by Price
Write-Host ""
Write-Host "TEST 5: POST Filter by Price" -ForegroundColor Yellow
Write-Host "POST $baseUrl/filter" -ForegroundColor Gray

try {
    $filter = @{
        minPrice = 300000
        maxPrice = 500000
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$baseUrl/filter" -Method POST `
        -ContentType "application/json" `
        -Body $filter `
        -TimeoutSec 5
    
    $result = $response.Content | ConvertFrom-Json
    
    if ($response.StatusCode -eq 200 -and $result.success) {
        Write-Host "[PASS] Status 200 - Filtro aplicado" -ForegroundColor Green
        Write-Host "       Propiedades encontradas: $($result.data.Count)" -ForegroundColor Green
        Write-Host "       Rango: EUR 300000 - EUR 500000" -ForegroundColor Green
        $testsPass++
    } else {
        Write-Host "[FAIL] No se aplico el filtro" -ForegroundColor Red
        $testsFail++
    }
} catch {
    Write-Host "[FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
    $testsFail++
}

# TEST 6: DELETE Property
if ($createdId) {
    Write-Host ""
    Write-Host "TEST 6: DELETE Property" -ForegroundColor Yellow
    Write-Host "DELETE $baseUrl/$createdId" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl/$createdId" -Method DELETE -TimeoutSec 5
        $result = $response.Content | ConvertFrom-Json
        
        if ($response.StatusCode -eq 200 -and $result.success) {
            Write-Host "[PASS] Status 200 - Propiedad eliminada" -ForegroundColor Green
            $testsPass++
        } else {
            Write-Host "[FAIL] No se elimino la propiedad" -ForegroundColor Red
            $testsFail++
        }
    } catch {
        Write-Host "[FAIL] Error: $($_.Exception.Message)" -ForegroundColor Red
        $testsFail++
    }
}

# TEST 7: Verify Deletion
if ($createdId) {
    Write-Host ""
    Write-Host "TEST 7: Verify Deletion (GET)" -ForegroundColor Yellow
    Write-Host "GET $baseUrl/$createdId" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri "$baseUrl/$createdId" -Method GET `
            -TimeoutSec 5 -ErrorAction Stop
        Write-Host "[FAIL] La propiedad aun existe" -ForegroundColor Red
        $testsFail++
    } catch {
        if ($_.Exception.Response.StatusCode -eq 404) {
            Write-Host "[PASS] Status 404 - Propiedad correctamente eliminada" -ForegroundColor Green
            $testsPass++
        } else {
            Write-Host "[FAIL] Error inesperado: $($_.Exception.Message)" -ForegroundColor Red
            $testsFail++
        }
    }
}

# RESUMEN FINAL
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "RESUMEN DE PRUEBAS" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pruebas Exitosas: $testsPass" -ForegroundColor Green
Write-Host "Pruebas Fallidas: $testsFail" -ForegroundColor $(if ($testsFail -eq 0) { "Green" } else { "Red" })
Write-Host ""

if ($testsFail -eq 0 -and $testsPass -ge 7) {
    Write-Host "RESULTADO: TODOS LOS TESTS PASARON" -ForegroundColor Green
    Write-Host ""
    Write-Host "El API esta 100% funcional:" -ForegroundColor Green
    Write-Host "  - Conexion a MongoDB Atlas: OK" -ForegroundColor Green
    Write-Host "  - GET (obtener propiedades): OK" -ForegroundColor Green
    Write-Host "  - POST (crear propiedades): OK" -ForegroundColor Green
    Write-Host "  - PUT (actualizar propiedades): OK" -ForegroundColor Green
    Write-Host "  - DELETE (eliminar propiedades): OK" -ForegroundColor Green
    Write-Host "  - FILTER (filtrar propiedades): OK" -ForegroundColor Green
} else {
    Write-Host "RESULTADO: ALGUNOS TESTS FALLARON" -ForegroundColor Yellow
    Write-Host "Revisa los errores arriba" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
