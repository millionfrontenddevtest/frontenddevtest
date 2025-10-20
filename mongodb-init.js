/**
 * MongoDB Database Initialization Script
 * Real Estate API - Database Setup
 * 
 * Este script configura completamente la base de datos MongoDB para la API de Real Estate.
 * Ejecuta todos los pasos necesarios: creación de DB, colecciones, índices e inserciones de prueba.
 */

// ============================================================================
// 1. CONEXIÓN Y SELECCIÓN DE BASE DE DATOS
// ============================================================================

console.log("=".repeat(80));
console.log("MongoDB Database Initialization - Real Estate API");
console.log("=".repeat(80));

// Seleccionar o crear la base de datos
use RealStateDB
console.log("✓ Base de datos 'RealStateDB' seleccionada");

// ============================================================================
// 2. CREAR COLECCIÓN
// ============================================================================

// Crear colección con esquema de validación
db.createCollection("properties", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["idOwner", "name", "address", "price", "image"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Identificador único de la propiedad"
        },
        idOwner: {
          bsonType: ["objectId", "string"],
          description: "ID del propietario"
        },
        name: {
          bsonType: "string",
          minLength: 3,
          maxLength: 255,
          description: "Nombre o título de la propiedad"
        },
        address: {
          bsonType: "string",
          minLength: 5,
          maxLength: 500,
          description: "Dirección completa de la propiedad"
        },
        price: {
          bsonType: ["double", "decimal"],
          minimum: 0,
          description: "Precio de la propiedad"
        },
        image: {
          bsonType: "string",
          pattern: "^https?://",
          description: "URL de la imagen de la propiedad"
        },
        createdAt: {
          bsonType: "date",
          description: "Fecha de creación del registro"
        },
        updatedAt: {
          bsonType: "date",
          description: "Fecha de la última actualización"
        }
      }
    }
  }
});

console.log("✓ Colección 'properties' creada con validación de esquema");

// ============================================================================
// 3. CREAR ÍNDICES PARA OPTIMIZAR BÚSQUEDAS
// ============================================================================

console.log("\nCreando índices...");

// Índice de texto para búsquedas por nombre
db.properties.createIndex({ name: "text" });
console.log("  ✓ Índice de texto en 'name'");

// Índice de texto para búsquedas por dirección
db.properties.createIndex({ address: "text" });
console.log("  ✓ Índice de texto en 'address'");

// Índice en precio para filtros de rango
db.properties.createIndex({ price: 1 });
console.log("  ✓ Índice en 'price' (ascendente)");

// Índice en idOwner para búsquedas por propietario
db.properties.createIndex({ idOwner: 1 });
console.log("  ✓ Índice en 'idOwner'");

// Índice en createdAt para ordenamientos temporales
db.properties.createIndex({ createdAt: -1 });
console.log("  ✓ Índice en 'createdAt' (descendente)");

// Índice compuesto para búsquedas complejas
db.properties.createIndex({ price: 1, createdAt: -1 });
console.log("  ✓ Índice compuesto en 'price' y 'createdAt'");

// ============================================================================
// 4. INSERTAR DATOS DE PRUEBA
// ============================================================================

console.log("\nInsertando datos de prueba...");

const now = new Date("2025-10-18T00:00:00Z");

const sampleProperties = [
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
];

const result = db.properties.insertMany(sampleProperties);
console.log(`✓ ${result.insertedIds.length} propiedades insertadas exitosamente`);

// ============================================================================
// 5. VERIFICACIÓN DE DATOS
// ============================================================================

console.log("\n" + "=".repeat(80));
console.log("RESUMEN DE LA INICIALIZACIÓN");
console.log("=".repeat(80));

const totalProperties = db.properties.countDocuments();
console.log(`Total de propiedades en la base de datos: ${totalProperties}`);

const indexes = db.properties.getIndexes();
console.log(`Total de índices creados: ${indexes.length}`);

const stats = db.properties.stats();
console.log(`Tamaño de la colección: ${(stats.size / 1024).toFixed(2)} KB`);
console.log(`Promedio de documentos por página: ${stats.avgObjSize} bytes`);

console.log("\n" + "=".repeat(80));
console.log("✓ Inicialización completada exitosamente");
console.log("=".repeat(80));

// ============================================================================
// 6. INFORMACIÓN ÚTIL PARA EL DESARROLLO
// ============================================================================

console.log("\nCOMANDOS ÚTILES PARA CONSULTAS:");
console.log("-".repeat(80));
console.log("Ver todas las propiedades:");
console.log("  db.properties.find().pretty()");
console.log("\nBuscar por rango de precio (entre 100k y 300k):");
console.log("  db.properties.find({ price: { $gte: 100000, $lte: 300000 } }).pretty()");
console.log("\nBuscar por propietario:");
console.log("  db.properties.find({ idOwner: ObjectId('507f1f77bcf86cd799439010') }).pretty()");
console.log("\nOrdenar por precio ascendente:");
console.log("  db.properties.find().sort({ price: 1 }).pretty()");
console.log("\nBuscar por patrón en nombre (case-insensitive):");
console.log("  db.properties.find({ name: /casa/i }).pretty()");
console.log("\n" + "=".repeat(80) + "\n");
