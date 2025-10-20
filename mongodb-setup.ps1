# MongoDB Database Setup Script for Real Estate API
# Windows PowerShell Script
# Execute: powershell -ExecutionPolicy Bypass -File mongodb-setup.ps1

[CmdletBinding()]
param()

Write-Host "╔════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   MongoDB Real Estate API - Database Setup Script                  ║" -ForegroundColor Cyan
Write-Host "║   Platform: Windows | Date: 18 Oct 2025                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan

# ============================================================================
# 1. VERIFICAR SI MONGODB ESTÁ INSTALADO
# ============================================================================

Write-Host "`n[1/5] Verificando MongoDB..." -ForegroundColor Yellow

$mongoCheck = Get-Command mongosh -ErrorAction SilentlyContinue
if (-not $mongoCheck) {
    Write-Host "❌ Error: mongosh no está instalado o no está en PATH" -ForegroundColor Red
    Write-Host "   Descarga MongoDB Community: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
    Write-Host "   O instala con: choco install mongodb-community" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ mongosh encontrado: $($mongoCheck.Source)" -ForegroundColor Green

# ============================================================================
# 2. VERIFICAR SERVICIO DE MONGODB
# ============================================================================

Write-Host "`n[2/5] Verificando servicio de MongoDB..." -ForegroundColor Yellow

$mongoService = Get-Service -Name "MongoDB" -ErrorAction SilentlyContinue
if ($mongoService) {
    if ($mongoService.Status -eq "Running") {
        Write-Host "✓ Servicio MongoDB está ejecutándose" -ForegroundColor Green
    }
    else {
        Write-Host "⚠ Servicio MongoDB está detenido. Iniciando..." -ForegroundColor Yellow
        Start-Service -Name "MongoDB" -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
        Write-Host "✓ Servicio MongoDB iniciado" -ForegroundColor Green
    }
}
else {
    Write-Host "⚠ Servicio MongoDB no encontrado como servicio de Windows" -ForegroundColor Yellow
    Write-Host "   Asegúrate de que mongod esté ejecutándose manualmente" -ForegroundColor Yellow
}

# ============================================================================
# 3. PROBAR CONEXIÓN
# ============================================================================

Write-Host "`n[3/5] Probando conexión a MongoDB..." -ForegroundColor Yellow

try {
    $connectionTest = mongosh --eval "db.adminCommand('ping')" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Conexión a MongoDB exitosa" -ForegroundColor Green
    }
    else {
        Write-Host "❌ No se puede conectar a MongoDB" -ForegroundColor Red
        Write-Host "   Verifica que mongod esté ejecutándose en localhost:27017" -ForegroundColor Yellow
        exit 1
    }
}
catch {
    Write-Host "❌ Error al conectar: $_" -ForegroundColor Red
    exit 1
}

# ============================================================================
# 4. CREAR SCRIPT MONGOSH TEMPORAL
# ============================================================================

Write-Host "`n[4/5] Preparando scripts de inicialización..." -ForegroundColor Yellow

$scriptContent = @"
// Seleccionar base de datos
use RealStateDB
console.log("[✓] Base de datos 'RealStateDB' seleccionada");

// Verificar si la colección existe
const collectionExists = db.getCollectionNames().includes("properties");
if (collectionExists) {
    console.log("[!] Colección 'properties' ya existe. Eliminando...");
    db.properties.drop();
}

// Crear colección con validación de esquema
db.createCollection("properties", {
  validator: {
    `$jsonSchema: {
      bsonType: "object",
      required: ["idOwner", "name", "address", "price", "image"],
      properties: {
        _id: { bsonType: "objectId" },
        idOwner: { bsonType: ["objectId", "string"] },
        name: { bsonType: "string", minLength: 3, maxLength: 255 },
        address: { bsonType: "string", minLength: 5, maxLength: 500 },
        price: { bsonType: ["double", "decimal"], minimum: 0 },
        image: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});
console.log("[✓] Colección 'properties' creada");

// Crear índices
console.log("[*] Creando índices...");
db.properties.createIndex({ name: "text" });
db.properties.createIndex({ address: "text" });
db.properties.createIndex({ price: 1 });
db.properties.createIndex({ idOwner: 1 });
db.properties.createIndex({ createdAt: -1 });
db.properties.createIndex({ price: 1, createdAt: -1 });
console.log("[✓] Índices creados exitosamente");

// Insertar datos de prueba
console.log("[*] Insertando datos de prueba...");
const result = db.properties.insertMany([
  {
    idOwner: ObjectId("507f1f77bcf86cd799439010"),
    name: "Casa Moderna en Avenida Principal",
    address: "Avenida Principal 123, Piso 1, Madrid 28001",
    price: 250000,
    image: "https://example.com/properties/casa-moderna.jpg",
    createdAt: new Date("2025-10-01T10:00:00Z"),
    updatedAt: new Date("2025-10-15T10:00:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439011"),
    name: "Apartamento Lujo con Vistas",
    address: "Calle Elegante 456, Piso 15, Barcelona 08002",
    price: 180000,
    image: "https://example.com/properties/apartamento-lujo.jpg",
    createdAt: new Date("2025-10-02T11:30:00Z"),
    updatedAt: new Date("2025-10-16T11:30:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439012"),
    name: "Casa Clásica Renovada",
    address: "Avenida Secundaria 789, Piso 2, Valencia 46001",
    price: 350000,
    image: "https://example.com/properties/casa-clasica.jpg",
    createdAt: new Date("2025-10-03T14:45:00Z"),
    updatedAt: new Date("2025-10-14T14:45:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439013"),
    name: "Departamento Económico",
    address: "Calle Principal 234, Piso 3, Bilbao 48001",
    price: 95000,
    image: "https://example.com/properties/departamento-economico.jpg",
    createdAt: new Date("2025-10-04T09:15:00Z"),
    updatedAt: new Date("2025-10-17T09:15:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439014"),
    name: "Casa Familiar Espaciosa",
    address: "Pasaje Tranquilo 567, Piso 1, Sevilla 41001",
    price: 420000,
    image: "https://example.com/properties/casa-familiar.jpg",
    createdAt: new Date("2025-10-05T16:20:00Z"),
    updatedAt: new Date("2025-10-13T16:20:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439015"),
    name: "Ático Premium con Terraza",
    address: "Gran Vía 999, Piso 20, Madrid 28013",
    price: 580000,
    image: "https://example.com/properties/atico-premium.jpg",
    createdAt: new Date("2025-10-06T12:00:00Z"),
    updatedAt: new Date("2025-10-18T12:00:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439016"),
    name: "Chalet Unifamiliar en Urbanización",
    address: "Calle de los Árboles 321, Piso 1, Alicante 03004",
    price: 280000,
    image: "https://example.com/properties/chalet-unifamiliar.jpg",
    createdAt: new Date("2025-10-07T08:30:00Z"),
    updatedAt: new Date("2025-10-12T08:30:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439017"),
    name: "Estudio Céntrico Amueblado",
    address: "Calle de la Paz 654, Piso 4, Málaga 29001",
    price: 65000,
    image: "https://example.com/properties/estudio-centrico.jpg",
    createdAt: new Date("2025-10-08T13:45:00Z"),
    updatedAt: new Date("2025-10-11T13:45:00Z")
  }
]);
console.log("[✓] " + result.insertedIds.length + " propiedades insertadas");

// Verificación final
console.log("[*] Realizando verificación final...");
const totalProperties = db.properties.countDocuments();
const indexes = db.properties.getIndexes();
console.log("[✓] Total de propiedades: " + totalProperties);
console.log("[✓] Total de índices: " + indexes.length);
console.log("════════════════════════════════════════════════════════════════════");
console.log("[✓] ¡Inicialización completada exitosamente!");
console.log("════════════════════════════════════════════════════════════════════");
"@

# Guardar script temporal
$tempScriptPath = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "mongodb-init-$(Get-Random).js")
$scriptContent | Out-File -FilePath $tempScriptPath -Encoding UTF8

Write-Host "✓ Scripts preparados temporalmente" -ForegroundColor Green

# ============================================================================
# 5. EJECUTAR SCRIPT MONGOSH
# ============================================================================

Write-Host "`n[5/5] Ejecutando inicialización en MongoDB..." -ForegroundColor Yellow

try {
    & mongosh --file $tempScriptPath
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ Base de datos inicializada exitosamente" -ForegroundColor Green
        Write-Host "`n📋 Próximos pasos:" -ForegroundColor Cyan
        Write-Host "   1. Verifica la conexión en C# usando MongoClient" -ForegroundColor White
        Write-Host "   2. Configura la cadena de conexión en appsettings.json" -ForegroundColor White
        Write-Host "   3. Ejecuta consultas de prueba desde tu aplicación" -ForegroundColor White
        Write-Host "`n📚 Documentación:" -ForegroundColor Cyan
        Write-Host "   - Lee: MONGODB_DATABASE_SETUP.md" -ForegroundColor White
        Write-Host "   - Consulta: mongodb-init.js" -ForegroundColor White
    }
    else {
        Write-Host "❌ Error durante la inicialización" -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "❌ Error al ejecutar mongosh: $_" -ForegroundColor Red
    exit 1
}
finally {
    # Limpiar archivo temporal
    if (Test-Path $tempScriptPath) {
        Remove-Item -Path $tempScriptPath -Force
    }
}

Write-Host "`n" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
