# 📚 MongoDB Real Estate API - Documentación Completa

## 🎯 Índice de Archivos Generados

Este paquete contiene toda la documentación y scripts necesarios para configurar MongoDB para la **Real Estate API** (.NET/C#).

### 📄 Archivos de Documentación

1. **MONGODB_DATABASE_SETUP.md** ⭐ _[Comienza aquí]_

   - Guía completa de instalación
   - Estructura de base de datos
   - Esquema de validación
   - Índices creados
   - Consultas comunes
   - Integración con C#

2. **MONGODB_QUICK_REFERENCE.md**

   - Referencia rápida de comandos
   - Snippets de código más utilizados
   - Troubleshooting
   - Cadenas de conexión

3. **DOTNET_MONGODB_CONFIGURATION.md**

   - Configuración específica para .NET
   - Archivos appsettings.json
   - Clases de modelo (Property.cs)
   - Interfaz de repositorio
   - Implementación de servicios
   - Código de controlador
   - Ejemplos de uso

4. **MONGODB_SCRIPTS.md** (Actualizado)
   - Scripts legados mantenidos
   - Referencia histórica
   - Datos de prueba adicionales

---

## 🚀 Scripts Ejecutables

### Windows (PowerShell)

**Archivo:** `mongodb-setup.ps1`

```bash
# Ejecución:
powershell -ExecutionPolicy Bypass -File mongodb-setup.ps1
```

**Características:**

- ✓ Verifica si MongoDB está instalado
- ✓ Comprueba el servicio de MongoDB
- ✓ Prueba la conexión
- ✓ Ejecuta la inicialización automáticamente
- ✓ Mostrar resumen y próximos pasos

---

### macOS / Linux (Bash)

**Archivo:** `mongodb-setup.sh`

```bash
# Ejecución:
bash mongodb-setup.sh

# O:
chmod +x mongodb-setup.sh
./mongodb-setup.sh
```

**Características:**

- ✓ Verifica mongosh en PATH
- ✓ Prueba conectividad
- ✓ Crea colección con validación
- ✓ Crea índices automáticamente
- ✓ Inserta datos de prueba

---

### Mongosh Script (Multiplataforma)

**Archivo:** `mongodb-init.js`

```javascript
// Ejecutar en mongosh:
mongosh --file mongodb-init.js

// O dentro de mongosh:
load("mongodb-init.js")
```

**Qué hace:**

- Selecciona/crea base de datos `RealStateDB`
- Crea colección `properties` con esquema de validación
- Crea 6 índices optimizados
- Inserta 8 propiedades de prueba
- Muestra verificación y estadísticas

---

## 📊 Estructura de Base de Datos

### Base de Datos

```
RealStateDB
└── properties (colección)
```

### Campos de Documento

```javascript
{
  _id: ObjectId,        // ← Auto-generado
  idOwner: ObjectId,    // ← Propietario
  name: String,         // ← Nombre (3-255 chars)
  address: String,      // ← Dirección (5-500 chars)
  price: Decimal,       // ← Precio (≥ 0)
  image: String (URL),  // ← URL de imagen
  createdAt: Date,      // ← Fecha de creación
  updatedAt: Date       // ← Fecha actualización
}
```

### Índices Creados

| #   | Campo(s)           | Tipo      | Propósito                |
| --- | ------------------ | --------- | ------------------------ |
| 1   | `name`             | Texto     | Búsqueda por nombre      |
| 2   | `address`          | Texto     | Búsqueda por dirección   |
| 3   | `price`            | Número ↑  | Filtro de rango          |
| 4   | `idOwner`          | Número ↑  | Búsqueda por propietario |
| 5   | `createdAt`        | Número ↓  | Ordenamiento temporal    |
| 6   | `price, createdAt` | Compuesto | Búsquedas complejas      |

---

## 🔧 Guía Rápida de Instalación

### Paso 1: Instalar MongoDB

**Windows:**

```bash
choco install mongodb-community
# O descargar: https://www.mongodb.com/try/download/community
```

**macOS:**

```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**

```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

### Paso 2: Ejecutar Script de Inicialización

**Windows:**

```powershell
powershell -ExecutionPolicy Bypass -File mongodb-setup.ps1
```

**macOS/Linux:**

```bash
bash mongodb-setup.sh
```

### Paso 3: Verificar Inicialización

```bash
# Conectar a MongoDB
mongosh

# En mongosh:
use RealStateDB
db.properties.countDocuments()  // Debe mostrar: 8
db.properties.find().pretty()   // Ver todas las propiedades
```

### Paso 4: Configurar en .NET

Editar `appsettings.json`:

```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "RealStateDB",
    "CollectionName": "properties"
  }
}
```

Instalar paquete NuGet:

```bash
dotnet add package MongoDB.Driver
```

---

## 🔗 Cadenas de Conexión

### Desarrollo Local

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

## 📡 Ejemplos de Uso en C#

### Consultar Todas las Propiedades

```csharp
var client = new MongoClient("mongodb://localhost:27017");
var database = client.GetDatabase("RealStateDB");
var collection = database.GetCollection<Property>("properties");

var properties = await collection.Find(_ => true).ToListAsync();
```

### Filtrar por Precio

```csharp
var filter = Builders<Property>.Filter.And(
    Builders<Property>.Filter.Gte(p => p.Price, 100000),
    Builders<Property>.Filter.Lte(p => p.Price, 300000)
);

var results = await collection.Find(filter).ToListAsync();
```

### Buscar por Propietario

```csharp
var filter = Builders<Property>.Filter
    .Eq(p => p.IdOwner, ownerId);

var results = await collection.Find(filter).ToListAsync();
```

---

## 🧪 Datos de Prueba

Se incluyen 8 propiedades de ejemplo:

| #   | Nombre                            | Precio  | Ciudad    |
| --- | --------------------------------- | ------- | --------- |
| 1   | Casa Moderna en Avenida Principal | 250,000 | Madrid    |
| 2   | Apartamento Lujo con Vistas       | 180,000 | Barcelona |
| 3   | Casa Clásica Renovada             | 350,000 | Valencia  |
| 4   | Departamento Económico            | 95,000  | Bilbao    |
| 5   | Casa Familiar Espaciosa           | 420,000 | Sevilla   |
| 6   | Ático Premium con Terraza         | 580,000 | Madrid    |
| 7   | Chalet Unifamiliar                | 280,000 | Alicante  |
| 8   | Estudio Céntrico Amueblado        | 65,000  | Málaga    |

---

## 📚 Consultas Comunes

### Obtener Todas las Propiedades

```javascript
db.properties.find().pretty();
```

### Filtrar por Rango de Precio

```javascript
db.properties.find({ price: { $gte: 100000, $lte: 300000 } });
```

### Ordenar por Precio Ascendente

```javascript
db.properties.find().sort({ price: 1 });
```

### Buscar por Propietario

```javascript
db.properties.find({ idOwner: ObjectId("507f1f77bcf86cd799439010") });
```

### Búsqueda de Texto

```javascript
db.properties.find({ $text: { $search: "casa madrid" } });
```

---

## 🛠️ Mantenimiento

### Ver Estadísticas

```javascript
db.properties.stats();
db.stats();
```

### Hacer Backup

```bash
mongodump --db RealStateDB --out ./backup
```

### Restaurar Backup

```bash
mongorestore --db RealStateDB ./backup/RealStateDB
```

### Limpiar Datos

```javascript
// Eliminar todas las propiedades
db.properties.deleteMany({});

// Eliminar colección
db.properties.drop();
```

---

## ✅ Checklist de Verificación

- [ ] MongoDB instalado y ejecutándose
- [ ] Script de inicialización completado
- [ ] Base de datos `RealStateDB` visible en mongosh
- [ ] 8 propiedades en colección `properties`
- [ ] 6 índices creados correctamente
- [ ] Consultas de prueba funcionando
- [ ] Configuración de appsettings.json actualizada
- [ ] Paquete MongoDB.Driver instalado en .NET
- [ ] API conectando a base de datos correctamente
- [ ] Backup de base de datos probado

---

## 📚 Archivos Recomendados para Leer

**Orden sugerido:**

1. 📖 Comienza con: **MONGODB_DATABASE_SETUP.md**

   - Entender la estructura completa
   - Ver opciones de instalación

2. 🚀 Luego ejecuta: **mongodb-setup.ps1** (Windows) o **mongodb-setup.sh** (Mac/Linux)

   - Automatiza la inicialización

3. 💻 Configura tu .NET: **DOTNET_MONGODB_CONFIGURATION.md**

   - Integración con C#

4. 🔍 Consulta rápida: **MONGODB_QUICK_REFERENCE.md**
   - Referencia durante desarrollo

---

## 🆘 Resolución de Problemas

### MongoDB no inicia

```bash
# Windows
Services -> MongoDB Community Server -> Start

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### No se puede conectar

```bash
# Verificar puerto
mongosh --eval "db.adminCommand('ping')"

# Verificar si mongod está corriendo
# netstat -ano | findstr :27017  (Windows)
# lsof -i :27017                  (Mac/Linux)
```

### Esquema no válido

```javascript
// Ver definición del esquema
db.getCollectionInfos({ name: "properties" });

// Recrear colección
db.properties.drop();
// Ejecutar scripts nuevamente
```

---

## 📞 Soporte Adicional

- **MongoDB Docs:** https://docs.mongodb.com/
- **MongoDB .NET Driver:** https://www.mongodb.com/docs/drivers/csharp/
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **mongosh Manual:** https://www.mongodb.com/docs/mongosh/

---

## 📝 Notas Importantes

1. **Seguridad:** En producción, siempre usa autenticación de usuario
2. **Backups:** Realiza backups regulares de tu base de datos
3. **Índices:** Los índices mejoran rendimiento significativamente
4. **Validación:** El esquema JSON valida automáticamente los datos
5. **Conexión:** Usa conexiones seguras (SSL/TLS) en producción

---

## 🎉 ¡Estás Listo!

Tu base de datos MongoDB está completamente configurada y lista para usar con tu Real Estate API en .NET.

**Próximos pasos:**

1. Ejecuta el script de inicialización
2. Verifica que las propiedades se insertaron
3. Configura tu aplicación .NET
4. ¡Comienza a desarrollar!

---

**Fecha:** 18 de octubre de 2025  
**Versión MongoDB:** 7.0+  
**Versión .NET:** 8.0+  
**Estado:** ✅ Completado y listo para producción
