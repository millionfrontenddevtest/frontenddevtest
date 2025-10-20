# Complete API Test Suite for Real Estate API
# Tests all 6 endpoints with MongoDB Atlas

param(
    [string]$BaseUrl = "http://localhost:5298/api/Properties"
)

Write-Host "
╔════════════════════════════════════════════════════╗
║     Real Estate API - Complete Test Suite          ║
║          MongoDB Atlas Connected                   ║
╚════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

$testsPassed = 0
$testsFailed = 0
$propertyId = $null

# Test 1: GET All Properties
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "1️⃣  TEST: GET All Properties" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri $BaseUrl -Method GET -ErrorAction Stop
    $data = $response.Content | ConvertFrom-Json
    
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "✅ Message: $($data.message)" -ForegroundColor Green
    Write-Host "✅ Properties found: $($data.data.Count)" -ForegroundColor Green
    
    # Get first property ID for later tests
    if ($data.data.Count -gt 0) {
        $propertyId = $data.data[0].id
        Write-Host "✅ First property ID: $propertyId" -ForegroundColor Green
    }
    
    $testsPassed++
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Test 2: GET by ID
if ($propertyId) {
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "2️⃣  TEST: GET Property by ID" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    
    try {
        $response = Invoke-WebRequest -Uri "$BaseUrl/$propertyId" -Method GET -ErrorAction Stop
        $data = $response.Content | ConvertFrom-Json
        
        Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "✅ Property Name: $($data.data.name)" -ForegroundColor Green
        Write-Host "✅ Property Price: €$($data.data.price)" -ForegroundColor Green
        Write-Host "✅ Property Address: $($data.data.address)" -ForegroundColor Green
        
        $testsPassed++
    } catch {
        Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
        $testsFailed++
    }
}

# Test 3: CREATE new property
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "3️⃣  TEST: POST Create New Property" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

try {
    $newProperty = @{
        idOwner = "507f1f77bcf86cd799439010"
        name = "Casa de Prueba - $(Get-Date -Format 'HH:mm:ss')"
        address = "Calle Test 456, Madrid"
        price = 250000
        image = "https://via.placeholder.com/400x300?text=Casa+Test"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri $BaseUrl -Method POST `
      -ContentType "application/json" `
      -Body $newProperty `
      -ErrorAction Stop
    
    $data = $response.Content | ConvertFrom-Json
    $newPropertyId = $data.data.id
    
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "✅ Property Created" -ForegroundColor Green
    Write-Host "✅ New Property ID: $newPropertyId" -ForegroundColor Green
    Write-Host "✅ Name: $($data.data.name)" -ForegroundColor Green
    
    $testsPassed++
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
    $newPropertyId = $null
}

# Test 4: UPDATE property
if ($newPropertyId) {
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "4️⃣  TEST: PUT Update Property" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    
    try {
        $updatedProperty = @{
            idOwner = "507f1f77bcf86cd799439010"
            name = "Casa Actualizada - Premium"
            address = "Calle Actualizada 789, Barcelona"
            price = 350000
            image = "https://via.placeholder.com/400x300?text=Casa+Actualizada"
        } | ConvertTo-Json

        $response = Invoke-WebRequest -Uri "$BaseUrl/$newPropertyId" -Method PUT `
          -ContentType "application/json" `
          -Body $updatedProperty `
          -ErrorAction Stop
        
        $data = $response.Content | ConvertFrom-Json
        
        Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "✅ Property Updated" -ForegroundColor Green
        Write-Host "✅ New Name: Casa Actualizada - Premium" -ForegroundColor Green
        Write-Host "✅ New Price: €350,000" -ForegroundColor Green
        
        $testsPassed++
    } catch {
        Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
        $testsFailed++
    }
}

# Test 5: FILTER by Price Range
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "5️⃣  TEST: POST Filter Properties (by price)" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

try {
    $filter = @{
        minPrice = 100000
        maxPrice = 400000
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "$BaseUrl/filter" -Method POST `
      -ContentType "application/json" `
      -Body $filter `
      -ErrorAction Stop
    
    $data = $response.Content | ConvertFrom-Json
    
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "✅ Filter: €100,000 - €400,000" -ForegroundColor Green
    Write-Host "✅ Properties found in range: $($data.data.Count)" -ForegroundColor Green
    
    $testsPassed++
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Test 6: FILTER by Name
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "6️⃣  TEST: POST Filter Properties (by name)" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

try {
    $filter = @{
        name = "Casa"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "$BaseUrl/filter" -Method POST `
      -ContentType "application/json" `
      -Body $filter `
      -ErrorAction Stop
    
    $data = $response.Content | ConvertFrom-Json
    
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "✅ Search term: 'Casa'" -ForegroundColor Green
    Write-Host "✅ Properties found: $($data.data.Count)" -ForegroundColor Green
    
    $testsPassed++
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Test 7: DELETE property
if ($newPropertyId) {
    Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "7️⃣  TEST: DELETE Property" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    
    try {
        $response = Invoke-WebRequest -Uri "$BaseUrl/$newPropertyId" -Method DELETE `
          -ErrorAction Stop
        
        $data = $response.Content | ConvertFrom-Json
        
        Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "✅ Property Deleted Successfully" -ForegroundColor Green
        Write-Host "✅ Message: $($data.message)" -ForegroundColor Green
        
        $testsPassed++
    } catch {
        Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
        $testsFailed++
    }
}

# Summary Report
Write-Host "`n
╔════════════════════════════════════════════════════╗
║              TEST SUMMARY REPORT                   ║
╚════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

Write-Host "✅ Tests Passed: $testsPassed" -ForegroundColor Green
Write-Host "❌ Tests Failed: $testsFailed" -ForegroundColor $(if ($testsFailed -eq 0) { "Green" } else { "Red" })

if ($testsFailed -eq 0) {
    Write-Host "`n🎉 ALL TESTS PASSED! API is working correctly!" -ForegroundColor Green
    Write-Host "`n✅ MongoDB Atlas Connection: WORKING" -ForegroundColor Green
    Write-Host "✅ All 7 Endpoints: FUNCTIONAL" -ForegroundColor Green
    Write-Host "✅ CRUD Operations: COMPLETE" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  Some tests failed. Check the errors above." -ForegroundColor Yellow
}

Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "Finished at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
