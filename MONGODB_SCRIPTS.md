# MongoDB Setup Scripts

Este archivo contiene scripts útiles para configurar MongoDB para el proyecto Real State API.

## 1. Crear Base de Datos e Índices

Ejecuta en mongosh:

```javascript
// Conectar a la base de datos
use RealStateDB

// Crear colección Properties si no existe
db.createCollection("Properties")

// Crear índices para optimizar búsquedas
db.Properties.createIndex({ "name": "text" })
db.Properties.createIndex({ "address": "text" })
db.Properties.createIndex({ "price": 1 })
db.Properties.createIndex({ "idOwner": 1 })
db.Properties.createIndex({ "createdAt": -1 })
```

## 2. Insertar Datos de Prueba

```javascript
use RealStateDB

db.Properties.insertMany([
  {
    idOwner: ObjectId("507f1f77bcf86cd799439010"),
    name: "Casa Moderna en Avenida Principal",
    address: "Avenida Principal 123, Piso 1",
    price: 250000,
    image: "https://example.com/properties/casa-moderna.jpg",
    createdAt: new Date("2024-10-01T10:00:00Z"),
    updatedAt: new Date("2024-10-01T10:00:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439011"),
    name: "Apartamento Lujo con Vistas",
    address: "Calle Elegante 456, Piso 15",
    price: 180000,
    image: "https://example.com/properties/apartamento-lujo.jpg",
    createdAt: new Date("2024-10-02T11:30:00Z"),
    updatedAt: new Date("2024-10-02T11:30:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439012"),
    name: "Casa Clásica Renovada",
    address: "Avenida Secundaria 789, Piso 2",
    price: 350000,
    image: "https://example.com/properties/casa-clasica.jpg",
    createdAt: new Date("2024-10-03T14:45:00Z"),
    updatedAt: new Date("2024-10-03T14:45:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439013"),
    name: "Departamento Económico",
    address: "Calle Principal 234, Piso 3",
    price: 95000,
    image: "https://example.com/properties/departamento-economico.jpg",
    createdAt: new Date("2024-10-04T09:15:00Z"),
    updatedAt: new Date("2024-10-04T09:15:00Z")
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439014"),
    name: "Casa Familiar Espaciosa",
    address: "Pasaje Tranquilo 567, Piso 1",
    price: 420000,
    image: "https://example.com/properties/casa-familiar.jpg",
    createdAt: new Date("2024-10-05T16:20:00Z"),
    updatedAt: new Date("2024-10-05T16:20:00Z")
  }
])

// Verificar que los datos se insertaron
db.Properties.find().pretty()
```

## 3. Consultas Útiles

```javascript
use RealStateDB

// Contar propiedades
db.Properties.countDocuments()

// Ver todas las propiedades
db.Properties.find().pretty()

// Buscar por rango de precio
db.Properties.find({ price: { $gte: 100000, $lte: 300000 } }).pretty()

// Buscar propiedades de un propietario
db.Properties.find({ idOwner: ObjectId("507f1f77bcf86cd799439010") }).pretty()

// Buscar por patrón en el nombre (case-insensitive)
db.Properties.find({ name: /casa/i }).pretty()

// Buscar por patrón en la dirección
db.Properties.find({ address: /Avenida/i }).pretty()

// Ordenar por precio (ascendente)
db.Properties.find().sort({ price: 1 }).pretty()

// Ordenar por precio (descendente)
db.Properties.find().sort({ price: -1 }).pretty()

// Obtener solo nombre y precio
db.Properties.find({}, { name: 1, price: 1, _id: 0 }).pretty()
```

## 4. Limpiar Datos

```javascript
use RealStateDB

// Eliminar una propiedad específica por ID
db.Properties.deleteOne({ _id: ObjectId("507f1f77bcf86cd799439011") })

// Eliminar todas las propiedades
db.Properties.deleteMany({})

// Eliminar la colección
db.Properties.drop()

// Eliminar la base de datos
db.dropDatabase()
```

## 5. Exportar e Importar Datos

### Exportar a JSON

```bash
mongodump --db RealStateDB --out ./backup
```

### Importar desde JSON

```bash
mongorestore --db RealStateDB ./backup/RealStateDB
```

## 6. Crear Usuarios (Para Producción)

```javascript
use admin

db.createUser({
  user: "realstate_user",
  pwd: "secure_password_123",
  roles: [
    { role: "readWrite", db: "RealStateDB" }
  ]
})

// Verificar usuario creado
db.getUser("realstate_user")
```

## 7. Validar Conexión

```bash
# Desde el terminal
mongosh "mongodb://localhost:27017/RealStateDB"

# O con usuario
mongosh "mongodb://realstate_user:secure_password_123@localhost:27017/RealStateDB"
```

## 8. Estadísticas de Base de Datos

```javascript
use RealStateDB

// Estadísticas de la colección
db.Properties.stats()

// Tamaño total de la base de datos
db.stats()
```

## 9. Crear Backups Automáticos

```bash
# Windows - Programador de tareas
# O crear script batch:

@echo off
SET MONGODB_PATH="C:\Program Files\MongoDB\Server\7.0\bin"
SET BACKUP_PATH="C:\backups\mongodb"
SET DATABASE_NAME="RealStateDB"
SET TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%

%MONGODB_PATH%\mongodump --db %DATABASE_NAME% --out %BACKUP_PATH%\%TIMESTAMP%

echo Backup completado en: %BACKUP_PATH%\%TIMESTAMP%
```

## 10. Replicación (Para Alta Disponibilidad)

```javascript
// Iniciar un replica set
rs.initiate();

// Ver estado del replica set
rs.status();

// Agregar nodo secundario
rs.add("secondary-host:27017");
```

---

**Nota:** Estos scripts son ejemplos de desarrollo. Para producción, implementa seguridad adicional y usuarios dedicados.
