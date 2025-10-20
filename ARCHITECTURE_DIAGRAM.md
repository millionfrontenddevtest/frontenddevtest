# 📐 Arquitectura MongoDB - Real Estate API

## 🏗️ Diagrama General de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                     .NET/C# Real Estate API                     │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Controllers Layer                       │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │         PropertiesController                        │ │  │
│  │  │  GET    /api/properties                            │ │  │
│  │  │  GET    /api/properties/{id}                       │ │  │
│  │  │  POST   /api/properties                            │ │  │
│  │  │  PUT    /api/properties/{id}                       │ │  │
│  │  │  DELETE /api/properties/{id}                       │ │  │
│  │  │  POST   /api/properties/filter                     │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Services Layer                         │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  IPropertyService / PropertyService                │ │  │
│  │  │  • GetAllPropertiesAsync()                         │ │  │
│  │  │  • GetPropertyByIdAsync()                          │ │  │
│  │  │  • CreatePropertyAsync()                           │ │  │
│  │  │  • UpdatePropertyAsync()                           │ │  │
│  │  │  • DeletePropertyAsync()                           │ │  │
│  │  │  • FilterPropertiesAsync()                         │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Repository Layer (Data Access)            │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ IPropertyRepository / PropertyRepository            │ │  │
│  │  │ • GetAllAsync()                                     │ │  │
│  │  │ • GetByIdAsync()                                    │ │  │
│  │  │ • GetByOwnerAsync()                                 │ │  │
│  │  │ • GetByPriceRangeAsync()                            │ │  │
│  │  │ • SearchByNameAsync()                               │ │  │
│  │  │ • SearchByAddressAsync()                            │ │  │
│  │  │ • CreateAsync()                                     │ │  │
│  │  │ • UpdateAsync()                                     │ │  │
│  │  │ • DeleteAsync()                                     │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           MongoDB Context / Client Layer                │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │  MongoDbContext                                     │ │  │
│  │  │  • IMongoClient (Singleton)                         │ │  │
│  │  │  • IMongoDatabase (RealStateDB)                     │ │  │
│  │  │  • IMongoCollection<Property>                       │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                      MongoDB Server                             │
│                  (localhost:27017)                              │
│                                                                  │
│  Database: RealStateDB                                          │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Collection: properties                                     ││
│  │                                                             ││
│  │  Document Schema:                                          ││
│  │  ┌──────────────────────────────────────────────────────┐ ││
│  │  │ _id         : ObjectId                               │ ││
│  │  │ idOwner     : ObjectId | String                      │ ││
│  │  │ name        : String (3-255)                         │ ││
│  │  │ address     : String (5-500)                         │ ││
│  │  │ price       : Decimal (≥ 0)                          │ ││
│  │  │ image       : String (URL)                           │ ││
│  │  │ createdAt   : Date                                   │ ││
│  │  │ updatedAt   : Date                                   │ ││
│  │  └──────────────────────────────────────────────────────┘ ││
│  │                                                             ││
│  │  Índices:                                                  ││
│  │  • name (texto)                                           ││
│  │  • address (texto)                                        ││
│  │  • price (1)                                              ││
│  │  • idOwner (1)                                            ││
│  │  • createdAt (-1)                                         ││
│  │  • (price, createdAt) compuesto                           ││
│  │                                                             ││
│  │  Documentos: 8 de prueba                                  ││
│  └────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Solicitud HTTP

```
Cliente HTTP
     │
     │ GET /api/properties?minPrice=100000&maxPrice=300000
     │
     ▼
┌─────────────────────────────────────────┐
│   PropertiesController.FilterProperties │
│   [HttpPost("filter")]                  │
└────────────────┬────────────────────────┘
                 │ PropertyFilterDto
                 ▼
        ┌──────────────────────┐
        │  PropertyService     │
        │  FilterPropertiesAsync()
        └──────────────────────┘
                 │
                 ▼
        ┌──────────────────────────────┐
        │  PropertyRepository          │
        │  GetByPriceRangeAsync()       │
        └──────────────────────────────┘
                 │
                 ▼
        ┌──────────────────────────────┐
        │  MongoDbContext              │
        │  Properties Collection       │
        └──────────────────────────────┘
                 │
                 ▼
        ┌──────────────────────────────┐
        │   MongoDB Query              │
        │ db.properties.find({         │
        │   price: {                   │
        │     $gte: 100000,            │
        │     $lte: 300000             │
        │   }                          │
        │ })                           │
        └──────────────────────────────┘
                 │
                 │ List<Property>
                 ▼
        ┌──────────────────────────────┐
        │  Mapping to DTOs             │
        │  Property → PropertyDto      │
        └──────────────────────────────┘
                 │
                 │ ApiResponse<IEnumerable<PropertyDto>>
                 ▼
        ┌──────────────────────────────┐
        │  JSON Response               │
        │  HTTP 200 OK                 │
        └──────────────────────────────┘
                 │
                 ▼
             Cliente
```

---

## 📊 Ciclo de Vida de una Propiedad

```
┌──────────────────────────────────────────────────────┐
│        1. CREACIÓN (POST /api/properties)            │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Request Body:                                       │
│  {                                                   │
│    "idOwner": "507f1f77bcf86cd799439010",           │
│    "name": "Nueva Casa",                            │
│    "address": "Calle Nueva 100",                    │
│    "price": 250000,                                 │
│    "image": "https://..."                           │
│  }                                                   │
│                                                       │
│  MongoDB:                                            │
│  ✓ Genera _id automáticamente                        │
│  ✓ Valida esquema JSON                              │
│  ✓ Establece createdAt = ahora                       │
│  ✓ Establece updatedAt = ahora                       │
│  ✓ Inserta documento                                 │
│                                                       │
│  Response: HTTP 201 Created + PropertyDto            │
│                                                       │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│    2. LECTURA (GET /api/properties/{id})            │
├──────────────────────────────────────────────────────┤
│                                                       │
│  MongoDB:                                            │
│  ✓ Busca por _id                                     │
│  ✓ Índice acelera búsqueda                          │
│  ✓ Retorna documento                                 │
│                                                       │
│  Response: HTTP 200 OK + PropertyDto                │
│                                                       │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│    3. ACTUALIZACIÓN (PUT /api/properties/{id})      │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Request Body:                                       │
│  {                                                   │
│    "name": "Casa Renovada",                         │
│    "price": 260000,                                 │
│    ...                                               │
│  }                                                   │
│                                                       │
│  MongoDB:                                            │
│  ✓ Encuentra documento por _id                       │
│  ✓ Actualiza campos                                  │
│  ✓ Valida esquema JSON nuevamente                   │
│  ✓ Establece updatedAt = ahora                       │
│  ✓ Guarda cambios                                    │
│                                                       │
│  Response: HTTP 200 OK                              │
│                                                       │
└──────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────┐
│    4. ELIMINACIÓN (DELETE /api/properties/{id})     │
├──────────────────────────────────────────────────────┤
│                                                       │
│  MongoDB:                                            │
│  ✓ Encuentra documento por _id                       │
│  ✓ Elimina documento                                 │
│  ✓ No hay recuperación (cuidado!)                    │
│                                                       │
│  Response: HTTP 200 OK                              │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## 🗂️ Estructura de Carpetas

```
RealStateAPI/
├── Controllers/
│   └── PropertiesController.cs
│       ├── GET /api/properties
│       ├── GET /api/properties/{id}
│       ├── POST /api/properties
│       ├── PUT /api/properties/{id}
│       ├── DELETE /api/properties/{id}
│       └── POST /api/properties/filter
│
├── Models/
│   └── Property.cs
│       └── [MapBson] ↔ MongoDB Document
│
├── DTOs/
│   ├── PropertyDto.cs
│   ├── PropertyFilterDto.cs
│   └── ApiResponse.cs
│
├── Services/
│   ├── IPropertyService.cs
│   ├── PropertyService.cs
│   └── MongoDbContext.cs
│
├── Repositories/
│   ├── IPropertyRepository.cs
│   └── PropertyRepository.cs
│
├── Configuration/
│   └── MongoDbSettings.cs
│
├── Middleware/
│   └── ExceptionHandlingMiddleware.cs
│
├── Properties/
│   └── launchSettings.json
│
├── Program.cs
│   ├── DI Container
│   ├── Middleware
│   └── Servicios registrados
│
├── appsettings.json
│   └── ConnectionString: mongodb://localhost:27017
│
└── RealStateAPI.csproj
    ├── MongoDB.Driver
    ├── MongoDB.Bson
    └── Framework: .NET 8.0
```

---

## 🔗 Flujos de Integración de Datos

### Patrón: Repositorio → Servicio → Controlador

```
┌────────────────────────────────────────┐
│      PropertyDto (Entrada HTTP)       │
│  {                                     │
│    idOwner: "...",                     │
│    name: "...",                        │
│    address: "...",                     │
│    price: 250000,                      │
│    image: "..."                        │
│  }                                     │
└────────────────┬───────────────────────┘
                 │ Mapeo
                 ▼
┌────────────────────────────────────────┐
│      Property (Modelo de Dominio)     │
│  {                                     │
│    Id: null,                           │
│    IdOwner: "...",                     │
│    Name: "...",                        │
│    Address: "...",                     │
│    Price: 250000,                      │
│    Image: "...",                       │
│    CreatedAt: DateTime.UtcNow,         │
│    UpdatedAt: DateTime.UtcNow          │
│  }                                     │
└────────────────┬───────────────────────┘
                 │ Persistencia
                 ▼
┌────────────────────────────────────────┐
│      MongoDB BSON Document            │
│  {                                     │
│    _id: ObjectId("..."),               │
│    idOwner: ObjectId("..."),           │
│    name: "...",                        │
│    address: "...",                     │
│    price: 250000.0,                    │
│    image: "...",                       │
│    createdAt: ISODate("..."),          │
│    updatedAt: ISODate("...")           │
│  }                                     │
└────────────────────────────────────────┘
```

---

## 🚀 Rendimiento de Índices

### Búsqueda sin Índice

```
┌─────────────────────────────────────┐
│  db.properties.find({price: 250000})│
│                                      │
│  MongoDB debe:                       │
│  1. Escanear TODA la colección      │
│  2. Comparar cada documento          │
│  3. Retornar resultado               │
│                                      │
│  ⚠️ Lento para colecciones grandes  │
└─────────────────────────────────────┘
        Tiempo: O(n) → Lineal
```

### Búsqueda CON Índice

```
┌─────────────────────────────────────┐
│  db.properties.find({price: 250000})│
│                                      │
│  MongoDB:                            │
│  1. Usa índice B-tree                │
│  2. Búsqueda directa                 │
│  3. Retorna resultado (instantáneo)  │
│                                      │
│  ✓ Muy rápido incluso con millones  │
└─────────────────────────────────────┘
        Tiempo: O(log n) → Logarítmico
```

---

## 🔐 Flujo de Seguridad

```
┌────────────────────────────────────────┐
│      Cliente HTTP (Request)           │
│  Authorization: Bearer {token}         │
│  Content-Type: application/json        │
└────────────────┬───────────────────────┘
                 │
                 ▼
        ┌──────────────────────┐
        │  Middleware:         │
        │  - Auth Validation   │
        │  - CORS              │
        │  - Exception Handler │
        └──────────────────────┘
                 │
                 ▼
        ┌──────────────────────┐
        │  Controller          │
        │  - Validación Input  │
        │  - ModelState Check  │
        └──────────────────────┘
                 │
                 ▼
        ┌──────────────────────┐
        │  Repository          │
        │  - MongoDB Connection│
        │  - Query Execution   │
        └──────────────────────┘
                 │
                 ▼
        ┌──────────────────────┐
        │  MongoDB            │
        │  - Schema Validation │
        │  - Access Control    │
        └──────────────────────┘
                 │
                 ▼
        ┌──────────────────────┐
        │  Response            │
        │  - Data Filtering    │
        │  - JSON Encoding     │
        └──────────────────────┘
```

---

## 📈 Escalabilidad

### Horizontalmente (Múltiples Servidores)

```
                    ┌─────────────────────┐
                    │  Load Balancer      │
                    │  (Nginx/IIS)        │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
            ┌────────┐    ┌────────┐    ┌────────┐
            │ API #1 │    │ API #2 │    │ API #3 │
            └────────┘    └────────┘    └────────┘
                 │             │             │
                 └─────────────┼─────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  MongoDB Replica Set│
                    │  - Primary          │
                    │  - Secondary        │
                    │  - Secondary        │
                    └─────────────────────┘
```

### Verticalmente (Mayor Poder)

```
┌─────────────────────────────────────┐
│     API Server (escala vertical)    │
│                                      │
│  - Más CPU cores                     │
│  - Más RAM                           │
│  - SSD más rápido                    │
│  - Conexiones simultáneas            │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  MongoDB Server (escala vertical)   │
│                                      │
│  - Más CPU cores                     │
│  - Mayor buffer pool                 │
│  - RAID 10 SSD                       │
│  - Cache más grande                  │
└─────────────────────────────────────┘
```

---

## 🎯 Optimización de Consultas

### Consulta Original (Sin Optimizar)

```javascript
// ❌ Lento - Sin índices
db.properties
  .find({
    idOwner: ownerId,
    price: { $gte: 100000, $lte: 300000 },
  })
  .sort({ createdAt: -1 })
  .limit(10);
```

### Consulta Optimizada

```javascript
// ✓ Rápido - Con índices
// Índice: { price: 1, createdAt: -1 }
db.properties
  .find({
    idOwner: ownerId,
    price: { $gte: 100000, $lte: 300000 },
  })
  .sort({ createdAt: -1 })
  .limit(10);
```

---

## 📞 Referencias Técnicas

- **BSON:** Binary JSON (formato almacenamiento MongoDB)
- **ObjectId:** Identificador único de 12 bytes
- **Índice B-tree:** Estructura para búsqueda rápida
- **Replica Set:** Redundancia de datos
- **Sharding:** Particionamiento horizontal

---

**Última actualización:** 18 de octubre de 2025  
**Arquitectura:** Clean Architecture  
**Patrón CRUD:** Completo  
**Escalabilidad:** Horizontal y Vertical ✓
