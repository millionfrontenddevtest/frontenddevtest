# MongoDB Database Setup - Real Estate API

## 📋 Resumen Ejecutivo

Este documento proporciona instrucciones completas para configurar la base de datos MongoDB para la **Real Estate API** (C#/.NET).

**Especificaciones de la Colección `properties`:**

| Campo       | Tipo              | Descripción                       |
| ----------- | ----------------- | --------------------------------- |
| `_id`       | ObjectId          | Identificador único autogenerado  |
| `idOwner`   | ObjectId o String | ID del propietario                |
| `name`      | String            | Nombre/título de la propiedad     |
| `address`   | String            | Dirección completa                |
| `price`     | Decimal/Double    | Precio en moneda local            |
| `image`     | String (URL)      | URL de la imagen                  |
| `createdAt` | Date              | Timestamp de creación             |
| `updatedAt` | Date              | Timestamp de última actualización |

---

## 🚀 Guía de Instalación Rápida

### Opción 1: MongoDB Local

**1. Descargar e Instalar MongoDB:**

```bash
# Windows (usando Chocolatey)
choco install mongodb-community

# O descargar desde: https://www.mongodb.com/try/download/community
```

**2. Iniciar el servicio de MongoDB:**

```bash
# Windows - Verificar que MongoDB Community Server esté ejecutándose como servicio
# Services -> MongoDB Server

# O en terminal:
mongod --config "C:\Program Files\MongoDB\Server\7.0\etc\mongod.cfg"
```

**3. Conectar con mongosh:**

```bash
mongosh
```

**4. Ejecutar el script de inicialización:**

```javascript
// En mongosh, ejecuta el contenido del archivo mongodb-init.js
// O importa el archivo:
load("mongodb-init.js");
```

---

### Opción 2: MongoDB Atlas (Nube)

**1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**

**2. Crear un cluster gratuito**

**3. Obtener la cadena de conexión:**

```
mongodb+srv://username:password@cluster.mongodb.net/RealStateDB
```

**4. Conectar con mongosh:**

```bash
mongosh "mongodb+srv://username:password@cluster.mongodb.net/RealStateDB"
```

**5. Ejecutar el script de inicialización**

---

## 📝 Estructura de la Base de Datos

### Colección: `properties`

```javascript
{
  _id: ObjectId("..."),
  idOwner: ObjectId("507f1f77bcf86cd799439010"),
  name: "Casa Moderna en Avenida Principal",
  address: "Avenida Principal 123, Piso 1, Madrid 28001",
  price: 250000.00,
  image: "https://example.com/properties/casa-moderna.jpg",
  createdAt: ISODate("2025-10-01T10:00:00.000Z"),
  updatedAt: ISODate("2025-10-15T10:00:00.000Z")
}
```

---

## 🔧 Esquema de Validación

La colección incluye validación de esquema JSON que garantiza:

- **Campos Requeridos:** `idOwner`, `name`, `address`, `price`, `image`
- **Restricciones de Tipo:** Cada campo tiene su tipo específico
- **Restricciones de Contenido:**
  - `name`: Mínimo 3 caracteres, máximo 255
  - `address`: Mínimo 5 caracteres, máximo 500
  - `price`: Valor mínimo 0
  - `image`: Debe ser una URL válida (http/https)

---

## 📊 Índices Creados

| Índice | Campo(s)           | Propósito                   | Orden       |
| ------ | ------------------ | --------------------------- | ----------- |
| 1      | `name` (texto)     | Búsquedas de texto completo | N/A         |
| 2      | `address` (texto)  | Búsquedas geográficas       | N/A         |
| 3      | `price`            | Filtros por rango de precio | Ascendente  |
| 4      | `idOwner`          | Búsquedas por propietario   | Ascendente  |
| 5      | `createdAt`        | Ordenamiento temporal       | Descendente |
| 6      | `price, createdAt` | Búsquedas complejas         | Mixto       |

---

## 📄 Datos de Prueba

Se incluyen 8 propiedades de ejemplo con rangos de precio variados (65k - 580k) para probar:

- Filtros por precio
- Búsquedas por propietario
- Ordenamientos
- Validaciones de esquema

---

## 🔍 Consultas Comunes

### 1. Obtener Todas las Propiedades

```javascript
db.properties.find().pretty();
```

### 2. Filtrar por Rango de Precio

```javascript
// Propiedades entre 100k y 300k
db.properties
  .find({
    price: { $gte: 100000, $lte: 300000 },
  })
  .pretty();
```

### 3. Buscar por Propietario

```javascript
db.properties
  .find({
    idOwner: ObjectId("507f1f77bcf86cd799439010"),
  })
  .pretty();
```

### 4. Ordenar por Precio (Menor a Mayor)

```javascript
db.properties.find().sort({ price: 1 }).pretty();
```

### 5. Ordenar por Fecha (Más Reciente Primero)

```javascript
db.properties.find().sort({ createdAt: -1 }).pretty();
```

### 6. Buscar por Patrón en el Nombre

```javascript
// Case-insensitive
db.properties.find({ name: /casa/i }).pretty();
```

### 7. Buscar por Patrón en la Dirección

```javascript
db.properties.find({ address: /madrid/i }).pretty();
```

### 8. Búsqueda de Texto Completo

```javascript
db.properties
  .find({
    $text: { $search: "casa madrid" },
  })
  .pretty();
```

### 9. Obtener Solo Ciertos Campos

```javascript
// Obtener solo nombre y precio, sin _id
db.properties.find({}, { name: 1, price: 1, _id: 0 }).pretty();
```

### 10. Contar Documentos

```javascript
db.properties.countDocuments();

// Con filtro
db.properties.countDocuments({ price: { $gt: 200000 } });
```

### 11. Agregaciones Útiles

```javascript
// Precio promedio
db.properties.aggregate([
  { $group: { _id: null, avgPrice: { $avg: "$price" } } },
]);

// Propiedades agrupadas por propietario
db.properties.aggregate([
  {
    $group: {
      _id: "$idOwner",
      totalProperties: { $sum: 1 },
      avgPrice: { $avg: "$price" },
    },
  },
]);

// Top 5 propiedades más caras
db.properties.aggregate([{ $sort: { price: -1 } }, { $limit: 5 }]);
```

---

## 🛠️ Operaciones CRUD Completas

### CREATE (Insertar una propiedad)

```javascript
db.properties.insertOne({
  idOwner: ObjectId("507f1f77bcf86cd799439010"),
  name: "Nueva Propiedad",
  address: "Nueva Calle 123, Ciudad",
  price: 150000,
  image: "https://example.com/new-property.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

### READ (Consultar propiedades)

```javascript
// Una sola propiedad
db.properties.findOne({ name: "Casa Moderna en Avenida Principal" });

// Múltiples propiedades
db.properties.find({ price: { $gt: 200000 } }).pretty();
```

### UPDATE (Actualizar una propiedad)

```javascript
db.properties.updateOne(
  { _id: ObjectId("...") },
  {
    $set: {
      price: 260000,
      updatedAt: new Date(),
    },
  }
);
```

### DELETE (Eliminar propiedades)

```javascript
// Eliminar una propiedad
db.properties.deleteOne({ _id: ObjectId("...") });

// Eliminar múltiples propiedades de un propietario
db.properties.deleteMany({ idOwner: ObjectId("507f1f77bcf86cd799439010") });
```

---

## 🚨 Mantenimiento de Base de Datos

### Ver Estadísticas

```javascript
// Estadísticas de la colección
db.properties.stats();

// Estadísticas de la base de datos
db.stats();

// Ver índices
db.properties.getIndexes();
```

### Limpiar Datos

```javascript
// Eliminar todas las propiedades
db.properties.deleteMany({});

// Eliminar la colección
db.properties.drop();

// Eliminar la base de datos completa
db.dropDatabase();
```

### Backup y Restauración

```bash
# Backup (Windows/Linux/Mac)
mongodump --db RealStateDB --out ./backup

# Restauración
mongorestore --db RealStateDB ./backup/RealStateDB

# Con autenticación
mongodump --username realstate_user --password --db RealStateDB --out ./backup
mongorestore --username realstate_user --password --db RealStateDB ./backup/RealStateDB
```

---

## 🔐 Seguridad para Producción

### Crear Usuario de Base de Datos

```javascript
use admin

db.createUser({
  user: "realstate_user",
  pwd: "secure_password_change_me",
  roles: [
    { role: "readWrite", db: "RealStateDB" },
    { role: "dbAdmin", db: "RealStateDB" }
  ]
})

// Verificar usuario
db.getUser("realstate_user")
```

### Conectar con Usuario

```bash
mongosh "mongodb://realstate_user:secure_password_change_me@localhost:27017/RealStateDB"

# O con MongoDB Atlas
mongosh "mongodb+srv://realstate_user:secure_password_change_me@cluster.mongodb.net/RealStateDB"
```

---

## 🔗 Integración con C#/.NET

### Cadena de Conexión en appsettings.json

**Desarrollo (Local):**

```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "RealStateDB",
    "CollectionName": "properties"
  }
}
```

**Producción (Atlas):**

```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb+srv://realstate_user:password@cluster.mongodb.net/RealStateDB?retryWrites=true&w=majority",
    "DatabaseName": "RealStateDB",
    "CollectionName": "properties"
  }
}
```

### Ejemplo de Uso en C#

```csharp
var client = new MongoClient(mongoSettings.ConnectionString);
var database = client.GetDatabase(mongoSettings.DatabaseName);
var collection = database.GetCollection<Property>(mongoSettings.CollectionName);

// Insertar
var property = new Property { /* datos */ };
await collection.InsertOneAsync(property);

// Consultar
var properties = await collection.Find(x => x.Price > 100000).ToListAsync();

// Actualizar
var update = Builders<Property>.Update.Set(x => x.UpdatedAt, DateTime.Now);
await collection.UpdateOneAsync(x => x.Id == id, update);

// Eliminar
await collection.DeleteOneAsync(x => x.Id == id);
```

---

## 📚 Recursos Útiles

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB Aggregation Framework](https://docs.mongodb.com/manual/aggregation/)
- [MongoDB .NET Driver](https://www.mongodb.com/docs/drivers/csharp/)
- [mongosh Reference](https://www.mongodb.com/docs/mongosh/)

---

## ✅ Checklist de Verificación

- [ ] MongoDB instalado y ejecutándose
- [ ] Base de datos `RealStateDB` creada
- [ ] Colección `properties` con esquema de validación
- [ ] 6 índices creados correctamente
- [ ] Datos de prueba insertados (8 propiedades)
- [ ] Conexión desde mongosh verificada
- [ ] Cadena de conexión configurada en appsettings.json
- [ ] Consultas de prueba ejecutadas exitosamente
- [ ] Backup testado
- [ ] Usuario de producción creado (si aplica)

---

**Fecha de Creación:** 18 de octubre de 2025  
**Versión de MongoDB:** 7.0+  
**Estado:** ✅ Completado y listo para producción
