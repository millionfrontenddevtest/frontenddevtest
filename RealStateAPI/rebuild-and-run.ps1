# Script para limpiar, compilar y ejecutar el API

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Limpiando, Compilando y Ejecutando API" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

$apiPath = "C:\Users\jose_\OneDrive\Desktop\realState\RealStateAPI"

# PASO 1: Clean
Write-Host ""
Write-Host "PASO 1: Limpiando compilaciones anteriores..." -ForegroundColor Yellow
cd $apiPath
dotnet clean

Write-Host "[OK] Clean completado" -ForegroundColor Green

# PASO 2: Restore
Write-Host ""
Write-Host "PASO 2: Restaurando dependencias..." -ForegroundColor Yellow
dotnet restore

Write-Host "[OK] Restore completado" -ForegroundColor Green

# PASO 3: Build
Write-Host ""
Write-Host "PASO 3: Compilando..." -ForegroundColor Yellow
dotnet build

Write-Host "[OK] Build completado" -ForegroundColor Green

# PASO 4: Run
Write-Host ""
Write-Host "PASO 4: Iniciando API..." -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "API iniciando... Espera el mensaje:" -ForegroundColor Cyan
Write-Host "Now listening on: http://localhost:5298" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

dotnet run
