# Quick Test - Real Estate API
# Run this after dotnet run is executing

Write-Host "`n🧪 Testing Real Estate API with MongoDB Atlas" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

$baseUrl = "http://localhost:5298/api/Properties"

# Test 1: Simple connection test
Write-Host "`n1️⃣ Testing connection to API..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $baseUrl -Method GET -TimeoutSec 10
    Write-Host "✅ API is responding!" -ForegroundColor Green
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
    
    $data = $response.Content | ConvertFrom-Json
    Write-Host "✅ Data received: $($data.data.Count) properties" -ForegroundColor Green
    
    Write-Host "`n📊 Properties in Database:" -ForegroundColor Cyan
    foreach ($prop in $data.data | Select-Object -First 5) {
        Write-Host "  • $($prop.name) - €$($prop.price)" -ForegroundColor Green
    }
    
} catch {
    Write-Host "❌ ERROR: Could not connect to API" -ForegroundColor Red
    Write-Host "❌ Make sure: 'dotnet run' is executing in another terminal" -ForegroundColor Red
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ CONNECTION TEST PASSED!" -ForegroundColor Green
Write-Host "✅ MongoDB Atlas is connected and working!" -ForegroundColor Green
Write-Host "`n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
