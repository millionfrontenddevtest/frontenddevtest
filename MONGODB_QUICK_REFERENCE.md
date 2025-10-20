# MongoDB Quick Reference - Real Estate API

## 🚀 Inicio Rápido

### 1. Instalar MongoDB

```bash
# Windows (Chocolatey)
choco install mongodb-community

# macOS (Homebrew)
brew install mongodb-community

# Linux (Ubuntu/Debian)
curl https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb http://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt-get update && apt-get install -y mongodb-org
```

### 2. Iniciar MongoDB

```bash
# Windows - Asegúrate que el servicio esté corriendo
# Services -> MongoDB Community Server -> Start

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 3. Conectar con mongosh

```bash
mongosh
```

### 4. Ejecutar Setup

```bash
# Windows
powershell -ExecutionPolicy Bypass -File mongodb-setup.ps1

# macOS/Linux
bash mongodb-setup.sh

# O manualmente
mongosh --file mongodb-init.js
```

---

## 📊 Estructura de Colección

```javascript
{
  _id: ObjectId("..."),           // ← Auto-generado por MongoDB
  idOwner: ObjectId("..."),        // ← ID del propietario
  name: "Casa Moderna",            // ← Nombre de la propiedad
  address: "Calle 123, Madrid",   // ← Dirección completa
  price: 250000,                   // ← Precio en moneda local
  image: "https://...",            // ← URL de la imagen
  createdAt: ISODate("..."),       // ← Timestamp de creación
  updatedAt: ISODate("...")        // ← Timestamp de actualización
}
```

---

## 🔍 Consultas Comunes

### Ver todas las propiedades

```javascript
db.properties.find().pretty();
```

### Filtrar por precio

```javascript
// Entre 100k y 300k
db.properties.find({ price: { $gte: 100000, $lte: 300000 } });

// Mayor a 200k
db.properties.find({ price: { $gt: 200000 } });

// Menor a 150k
db.properties.find({ price: { $lt: 150000 } });
```

### Búsqueda por propietario

```javascript
db.properties.find({ idOwner: ObjectId("507f1f77bcf86cd799439010") });
```

### Búsqueda por patrón

```javascript
// Case-insensitive
db.properties.find({ name: /casa/i });
db.properties.find({ address: /madrid/i });
```

### Búsqueda de texto completo

```javascript
db.properties.find({ $text: { $search: "casa madrid" } });
```

### Ordenar resultados

```javascript
// Por precio (menor a mayor)
db.properties.find().sort({ price: 1 });

// Por precio (mayor a menor)
db.properties.find().sort({ price: -1 });

// Por fecha (más reciente primero)
db.properties.find().sort({ createdAt: -1 });
```

### Limitar resultados

```javascript
// Primeros 5 resultados
db.properties.find().limit(5);

// Saltar 10 y tomar 5
db.properties.find().skip(10).limit(5);

// Top 3 más caras
db.properties.find().sort({ price: -1 }).limit(3);
```

### Seleccionar campos específicos

```javascript
// Solo nombre y precio, sin _id
db.properties.find({}, { name: 1, price: 1, _id: 0 });

// Excluir ciertos campos
db.properties.find({}, { image: 0 });
```

### Contar documentos

```javascript
// Total de propiedades
db.properties.countDocuments();

// Con filtro
db.properties.countDocuments({ price: { $gt: 200000 } });
```

---

## ✏️ Operaciones CRUD

### CREATE - Insertar una propiedad

```javascript
db.properties.insertOne({
  idOwner: ObjectId("507f1f77bcf86cd799439010"),
  name: "Nueva Casa",
  address: "Calle Nueva 100, Ciudad",
  price: 150000,
  image: "https://example.com/house.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

### READ - Consultar

```javascript
// Una propiedad
db.properties.findOne({ name: "Casa Moderna" });

// Múltiples
db.properties.find({ price: { $gt: 200000 } });
```

### UPDATE - Actualizar

```javascript
// Actualizar un campo
db.properties.updateOne(
  { _id: ObjectId("...") },
  { $set: { price: 260000, updatedAt: new Date() } }
);

// Actualizar múltiples
db.properties.updateMany(
  { idOwner: ObjectId("507f1f77bcf86cd799439010") },
  { $set: { updatedAt: new Date() } }
);
```

### DELETE - Eliminar

```javascript
// Eliminar una propiedad
db.properties.deleteOne({ _id: ObjectId("...") });

// Eliminar múltiples
db.properties.deleteMany({ idOwner: ObjectId("507f1f77bcf86cd799439010") });
```

---

## 📈 Agregaciones Comunes

### Precio promedio

```javascript
db.properties.aggregate([
  { $group: { _id: null, avgPrice: { $avg: "$price" } } },
]);
```

### Propiedades agrupadas por propietario

```javascript
db.properties.aggregate([
  {
    $group: {
      _id: "$idOwner",
      totalProperties: { $sum: 1 },
      avgPrice: { $avg: "$price" },
      minPrice: { $min: "$price" },
      maxPrice: { $max: "$price" },
    },
  },
]);
```

### Top 5 propiedades más caras

```javascript
db.properties.aggregate([
  { $sort: { price: -1 } },
  { $limit: 5 },
  { $project: { name: 1, price: 1, address: 1 } },
]);
```

### Propiedades por rango de precio

```javascript
db.properties.aggregate([
  {
    $group: {
      _id: {
        $cond: [
          { $lt: ["$price", 100000] },
          "Económico",
          { $cond: [{ $lt: ["$price", 300000] }, "Medio", "Lujo"] },
        ],
      },
      count: { $sum: 1 },
    },
  },
]);
```

---

## 🛠️ Mantenimiento

### Ver información de la colección

```javascript
db.properties.stats();
db.stats();
db.properties.getIndexes();
```

### Limpiar datos

```javascript
// Eliminar todas las propiedades
db.properties.deleteMany({});

// Eliminar la colección
db.properties.drop();

// Eliminar la base de datos
db.dropDatabase();
```

### Backup y Restauración

```bash
# Backup
mongodump --db RealStateDB --out ./backup

# Restauración
mongorestore --db RealStateDB ./backup/RealStateDB

# Con compresión
mongodump --db RealStateDB --archive=backup.archive --gzip
mongorestore --archive=backup.archive --gzip --db RealStateDB
```

---

## 🔐 Seguridad

### Crear usuario de base de datos

```javascript
use admin

db.createUser({
  user: "realstate_user",
  pwd: "securePassword123",
  roles: [
    { role: "readWrite", db: "RealStateDB" },
    { role: "dbAdmin", db: "RealStateDB" }
  ]
})
```

### Conectar con usuario

```bash
mongosh "mongodb://realstate_user:securePassword123@localhost:27017/RealStateDB"
```

### Listar usuarios

```javascript
use admin
db.getUsers()
```

---

## 📡 Integración con C#/.NET

### Configuración en appsettings.json

```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "RealStateDB",
    "CollectionName": "properties"
  }
}
```

### Código C# Básico

```csharp
using MongoDB.Driver;
using MongoDB.Bson;

// Crear cliente y obtener colección
var client = new MongoClient("mongodb://localhost:27017");
var database = client.GetDatabase("RealStateDB");
var collection = database.GetCollection<Property>("properties");

// Insertar
var property = new Property { /* datos */ };
await collection.InsertOneAsync(property);

// Consultar
var properties = await collection.Find(x => x.Price > 100000).ToListAsync();

// Actualizar
var update = Builders<Property>.Update.Set(x => x.UpdatedAt, DateTime.UtcNow);
await collection.UpdateOneAsync(x => x.Id == id, update);

// Eliminar
await collection.DeleteOneAsync(x => x.Id == id);
```

---

## 🔗 Cadenas de Conexión

### Local Development

```
mongodb://localhost:27017/RealStateDB
```

### Con Autenticación

```
mongodb://username:password@localhost:27017/RealStateDB
```

### MongoDB Atlas (Nube)

```
mongodb+srv://username:password@cluster.mongodb.net/RealStateDB?retryWrites=true&w=majority
```

---

## 📚 Índices Creados

| Índice | Campo(s)           | Tipo      | Propósito                 |
| ------ | ------------------ | --------- | ------------------------- |
| 1      | `name`             | Texto     | Búsquedas por nombre      |
| 2      | `address`          | Texto     | Búsquedas por dirección   |
| 3      | `price`            | Número    | Filtros de rango          |
| 4      | `idOwner`          | Número    | Búsquedas por propietario |
| 5      | `createdAt`        | Número    | Ordenamiento temporal     |
| 6      | `price, createdAt` | Compuesto | Búsquedas complejas       |

---

## ⚙️ Comandos Útiles

```bash
# Ver estado del servicio (macOS)
brew services list

# Ver logs (macOS)
log stream --predicate 'process == "mongod"'

# Ver logs (Linux)
sudo journalctl -u mongod -f

# Ver puertos abiertos
lsof -i :27017  # macOS/Linux
netstat -ano | findstr :27017  # Windows

# Exportar a JSON
mongoexport --db RealStateDB --collection properties --out properties.json

# Importar desde JSON
mongoimport --db RealStateDB --collection properties --file properties.json
```

---

## 🆘 Troubleshooting

### No se conecta a MongoDB

```bash
# Verificar si mongod está corriendo
# Windows: Services -> MongoDB Community Server
# macOS: brew services list
# Linux: sudo systemctl status mongod

# Probar conexión
mongosh --eval "db.adminCommand('ping')"
```

### Error de puerto en uso

```bash
# Matar proceso en puerto 27017
# macOS/Linux: kill -9 $(lsof -t -i :27017)
# Windows: netstat -ano | findstr :27017 && taskkill /PID <PID> /F
```

### Validación de esquema falla

```javascript
// Ver detalles del error
db.properties.insertOne({
  /* datos */
});

// Verificar esquema
db.getCollectionInfos({ name: "properties" });
```

---

**Última actualización:** 18 de octubre de 2025  
**Versión de MongoDB:** 7.0+  
**Driver .NET:** MongoDB.Driver 2.20+
