#!/bin/bash

################################################################################
#  MongoDB Database Setup Script for Real Estate API
#  Unix/Linux/macOS Bash Script
#  Execute: bash mongodb-setup.sh
################################################################################

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ============================================================================
# Funciones de utilidad
# ============================================================================

print_header() {
    echo -e "\n${CYAN}╔════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║   MongoDB Real Estate API - Database Setup Script                  ║${NC}"
    echo -e "${CYAN}║   Platform: Linux/macOS | Date: 18 Oct 2025                         ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════════════╝${NC}"
}

print_step() {
    local step=$1
    local message=$2
    echo -e "\n${YELLOW}[$step] $message${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# ============================================================================
# 1. VERIFICAR SI MONGODB ESTÁ INSTALADO
# ============================================================================

print_header
print_step "1/5" "Verificando MongoDB..."

if ! command -v mongosh &> /dev/null; then
    print_error "mongosh no está instalado o no está en PATH"
    echo -e "${YELLOW}Instala MongoDB Community:${NC}"
    echo "  macOS: brew install mongodb-community"
    echo "  Linux: https://docs.mongodb.com/manual/installation/"
    exit 1
fi

MONGOSH_PATH=$(which mongosh)
print_success "mongosh encontrado: $MONGOSH_PATH"

# ============================================================================
# 2. VERIFICAR CONECTIVIDAD
# ============================================================================

print_step "2/5" "Verificando conectividad con MongoDB..."

if mongosh --eval "db.adminCommand('ping')" &>/dev/null; then
    print_success "Conexión a MongoDB exitosa"
else
    print_error "No se puede conectar a MongoDB"
    echo -e "${YELLOW}Asegúrate de que mongod esté ejecutándose${NC}"
    echo "  macOS: brew services start mongodb-community"
    echo "  Linux: sudo systemctl start mongod"
    exit 1
fi

# ============================================================================
# 3. CREAR SCRIPT MONGOSH
# ============================================================================

print_step "3/5" "Preparando scripts de inicialización..."

# Crear archivo temporal para el script
TEMP_SCRIPT=$(mktemp)
trap "rm -f $TEMP_SCRIPT" EXIT

cat > "$TEMP_SCRIPT" << 'EOF'
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
    $jsonSchema: {
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
EOF

print_success "Scripts preparados temporalmente"

# ============================================================================
# 4. EJECUTAR SCRIPT MONGOSH
# ============================================================================

print_step "4/5" "Ejecutando inicialización en MongoDB..."

if mongosh --file "$TEMP_SCRIPT"; then
    print_step "5/5" "Verificación final..."
    print_success "Base de datos inicializada exitosamente"
    
    echo -e "\n${CYAN}📋 Próximos pasos:${NC}"
    echo "   1. Verifica la conexión en C# usando MongoClient"
    echo "   2. Configura la cadena de conexión en appsettings.json"
    echo "   3. Ejecuta consultas de prueba desde tu aplicación"
    
    echo -e "\n${CYAN}📚 Documentación:${NC}"
    echo "   - Lee: MONGODB_DATABASE_SETUP.md"
    echo "   - Consulta: mongodb-init.js"
    
    echo -e "\n${CYAN}🔗 Comandos útiles:${NC}"
    echo "   mongosh                          # Conectar a MongoDB"
    echo "   mongosh -f mongodb-init.js       # Ejecutar script de inicialización"
    echo "   db.properties.find()             # Ver todas las propiedades"
    
else
    print_error "Error durante la inicialización"
    exit 1
fi

echo -e "\n${CYAN}╚════════════════════════════════════════════════════════════════════╝${NC}\n"
