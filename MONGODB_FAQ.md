# ❓ MongoDB Real Estate API - Preguntas Frecuentes (FAQ)

## 📋 Contenido

1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Consultas](#consultas)
4. [Integración .NET](#integración-net)
5. [Rendimiento](#rendimiento)
6. [Seguridad](#seguridad)
7. [Troubleshooting](#troubleshooting)

---

## 🔧 Instalación

### P1: ¿Cuál es la versión mínima de MongoDB requerida?

**A:** MongoDB 5.0 o superior. Se recomienda 7.0+ para máxima compatibilidad.

```bash
# Verificar versión
mongod --version
mongosh --version
```

---

### P2: ¿MongoDB debe estar ejecutándose como servicio?

**A:** Depende del SO:

- **Windows:** Se instala como servicio de Windows automáticamente
- **macOS:** Se recomienda usar Homebrew para facilitarlo
- **Linux:** Se configura con systemd típicamente

```bash
# Verificar estado
# Windows
Get-Service MongoDB

# macOS
brew services list

# Linux
sudo systemctl status mongod
```

---

### P3: ¿Puedo usar MongoDB Atlas en lugar de local?

**A:** **Sí**, es totalmente compatible. Solo cambia la cadena de conexión:

**Local:**

```
mongodb://localhost:27017/RealStateDB
```

**Atlas:**

```
mongodb+srv://username:password@cluster.mongodb.net/RealStateDB?retryWrites=true
```

No hay cambios en el código de la aplicación.

---

### P4: ¿Cuál es el puerto por defecto de MongoDB?

**A:** **27017**. Es el puerto estándar para todas las instalaciones.

```bash
# Para usar otro puerto en MongoDB Atlas está configurado automáticamente
# Para local, puedes cambiar en mongod.conf
```

---

## ⚙️ Configuración

### P5: ¿Cómo cambio la cadena de conexión para producción?

**A:** En `appsettings.Production.json`:

```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb+srv://user:pass@prod-cluster.mongodb.net/RealStateDB?retryWrites=true&w=majority",
    "DatabaseName": "RealStateDB",
    "CollectionName": "properties"
  }
}
```

O usar variables de entorno:

```csharp
var connString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING");
```

---

### P6: ¿Cómo regulo el tamaño del connection pool?

**A:** Agregando opciones a la cadena de conexión:

```
mongodb://localhost:27017/?maxPoolSize=100&minPoolSize=10
```

Parámetros comunes:

- `maxPoolSize`: Máximo 100-200 conexiones
- `minPoolSize`: Mínimo 10-50 conexiones
- `maxIdleTimeMS`: Tiempo antes de cerrar conexión

---

### P7: ¿Puedo usar el patrón Singleton para MongoClient?

**A:** **Sí, es recomendable**. Una sola instancia por aplicación:

```csharp
// En Program.cs
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    return new MongoClient(connectionString);
});
```

No crear una nueva instancia cada vez.

---

### P8: ¿Cómo manejo las excepciones de conexión?

**A:** Implementar reintentos con Polly:

```csharp
using Polly;
using MongoDB.Driver;

var policy = Policy
    .Handle<MongoConnectionException>()
    .Or<MongoNetworkException>()
    .WaitAndRetry(
        retryCount: 3,
        sleepDurationProvider: attempt =>
            TimeSpan.FromSeconds(Math.Pow(2, attempt))
    );

var result = policy.Execute(() => collection.Find(filter).ToList());
```

---

## 🔍 Consultas

### P9: ¿Cuál es la mejor forma de hacer búsquedas por texto?

**A:** Hay dos opciones:

**1. Búsqueda por Regex (flexible, pero lenta sin índice):**

```csharp
var filter = Builders<Property>.Filter
    .Regex(p => p.Name, new BsonRegularExpression("casa", "i"));
```

**2. Búsqueda de texto completo (más rápida):**

```javascript
// MongoDB
db.properties.createIndex({ name: "text", address: "text" });
db.properties.find({ $text: { $search: "casa" } });
```

```csharp
// C#
var filter = Builders<Property>.Filter
    .Text("casa");
```

---

### P10: ¿Cómo puedo paginar resultados?

**A:** Usar `Skip()` y `Take()`:

```csharp
int pageSize = 10;
int pageNumber = 1;

var properties = await collection
    .Find(filter)
    .Skip((pageNumber - 1) * pageSize)
    .Limit(pageSize)
    .ToListAsync();
```

O implementar un DTO de paginación:

```csharp
public class PagedResult<T>
{
    public IEnumerable<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
}
```

---

### P11: ¿Cómo ordeno por múltiples campos?

**A:** Concatenar `SortBy()` y `ThenBy()`:

```csharp
var properties = await collection
    .Find(filter)
    .SortBy(p => p.Price)
    .ThenByDescending(p => p.CreatedAt)
    .ToListAsync();
```

O usando `SortDefinition`:

```csharp
var sort = Builders<Property>.Sort
    .Ascending(p => p.Price)
    .Descending(p => p.CreatedAt);

var properties = await collection
    .Find(filter)
    .Sort(sort)
    .ToListAsync();
```

---

### P12: ¿Cómo cuento documentos con un filtro?

**A:** Usar `CountDocumentsAsync()`:

```csharp
var count = await collection
    .CountDocumentsAsync(filter);

// O con opciones
var options = new CountOptions { Limit = 100 };
var count = await collection
    .CountDocumentsAsync(filter, options);
```

---

### P13: ¿Cómo hago aggregaciones complejas?

**A:** Usar el pipeline de agregación:

```csharp
var result = await collection
    .Aggregate()
    .Match(filter)
    .Group(new BsonDocument
    {
        { "_id", "$idOwner" },
        { "totalProperties", new BsonDocument("$sum", 1) },
        { "avgPrice", new BsonDocument("$avg", "$price") }
    })
    .Sort(new BsonDocument("avgPrice", -1))
    .Limit(10)
    .ToListAsync();
```

---

## 💻 Integración .NET

### P14: ¿Necesito instalar MongoDB en la máquina para desarrollo?

**A:** **Sí, se recomienda** para:

- Desarrollo local
- Testing
- Debugging

O puedes usar Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

### P15: ¿Cómo mapeo campos BSON a propiedades C#?

**A:** Usando atributos `BsonElement`:

```csharp
public class Property
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("idOwner")]
    public string IdOwner { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    // Sin atributo, MongoDB usa el nombre de propiedad
    public decimal Price { get; set; }
}
```

---

### P16: ¿Cómo manejo nulos en documentos?

**A:** MongoDB permite campos nulos, pero es mejor validar:

```csharp
public class Property
{
    public string? OptionalField { get; set; }  // Puede ser nulo

    [BsonIgnoreIfNull]
    public string? NeverStoredIfNull { get; set; }
}

// O en consultas
var filter = Builders<Property>.Filter
    .Eq(p => p.OptionalField, null);
```

---

### P17: ¿Cómo serializo objetos complejos en MongoDB?

**A:** MongoDB serializa automáticamente objetos anidados:

```csharp
public class Property
{
    public string Id { get; set; }
    public Owner Owner { get; set; }  // Anidado
    public List<Review> Reviews { get; set; }  // Array
}

public class Owner
{
    public string Name { get; set; }
    public string Email { get; set; }
}

// En MongoDB se almacena como:
// {
//   _id: ObjectId(...),
//   owner: { name: "...", email: "..." },
//   reviews: [ { rating: 5 }, { rating: 4 } ]
// }
```

---

### P18: ¿Cómo uso transacciones en MongoDB?

**A:** MongoDB soporta transacciones multi-documento (desde 4.0):

```csharp
using (var session = await client.StartSessionAsync())
{
    session.StartTransaction();
    try
    {
        var options = new InsertOneOptions { };
        await propertiesCollection.InsertOneAsync(session, property1);
        await propertiesCollection.InsertOneAsync(session, property2);

        await session.CommitTransactionAsync();
    }
    catch (Exception)
    {
        await session.AbortTransactionAsync();
        throw;
    }
}
```

---

## ⚡ Rendimiento

### P19: ¿Cuál es el número óptimo de índices?

**A:** No hay un número fijo, pero:

- **Mínimo 1-2:** Por lo menos un índice en campos de búsqueda
- **Óptimo 3-5:** Cobertura de casos comunes
- **Máximo 10-15:** Por colección, cada índice tiene un costo

Cada índice:

- ✓ Acelera lecturas
- ✗ Ralentiza escrituras (debe actualizar índice)
- ✗ Usa más espacio en disco

---

### P20: ¿Cómo identifico consultas lentas?

**A:** Activar el profiler de MongoDB:

```javascript
// Configurar profiler
db.setProfilingLevel(1, { slowms: 100 });

// Ver consultas lentas
db.system.profile.find().pretty();

// O en C# con logging
var loggerFactory = LoggerFactory.Create((builder) => builder.AddConsole());
var settings = MongoClientSettings.FromConnectionString(connectionString);
settings.LoggerFactory = loggerFactory;
var client = new MongoClient(settings);
```

---

### P21: ¿Cómo cacheo resultados?

**A:** Usar MemoryCache o Redis:

```csharp
public async Task<List<Property>> GetPropertiesAsync()
{
    const string cacheKey = "all_properties";

    if (_cache.TryGetValue(cacheKey, out List<Property> cached))
        return cached;

    var properties = await collection.Find(_ => true).ToListAsync();

    _cache.Set(cacheKey, properties, TimeSpan.FromMinutes(15));

    return properties;
}
```

---

### P22: ¿Cuál es el tamaño máximo de documento?

**A:** **16 MB** es el límite de MongoDB. En la práctica:

- Documentos típicos: < 1 MB
- Documentos grandes: < 5 MB
- Nunca acercarse a 16 MB

Para datos grandes, usar GridFS.

---

## 🔐 Seguridad

### P23: ¿Cómo protejo mi conexión a MongoDB?

**A:** Usando TLS/SSL:

```
mongodb+srv://user:password@cluster.mongodb.net/db?tls=true
```

O con MongoDB local:

```javascript
mongosh "mongodb://localhost:27017" --tls
```

---

### P24: ¿Cómo sanitizo entrada de usuario?

**A:** MongoDB es resistente a inyecciones, pero valida siempre:

```csharp
[HttpPost("search")]
public async Task<IActionResult> Search([FromBody] SearchRequest request)
{
    // Validar
    if (string.IsNullOrWhiteSpace(request.SearchTerm))
        return BadRequest("Búsqueda vacía");

    if (request.SearchTerm.Length > 1000)
        return BadRequest("Búsqueda muy larga");

    var filter = Builders<Property>.Filter
        .Regex(p => p.Name, new BsonRegularExpression(
            System.Text.RegularExpressions.Regex.Escape(request.SearchTerm), "i"
        ));

    return Ok(await collection.Find(filter).ToListAsync());
}
```

---

### P25: ¿Cómo configuro roles de usuario en MongoDB?

**A:** Crear usuarios con roles específicos:

```javascript
use admin

// Lectura solo
db.createUser({
  user: "reader",
  pwd: "read_password",
  roles: [{ role: "read", db: "RealStateDB" }]
})

// Lectura/Escritura
db.createUser({
  user: "writer",
  pwd: "write_password",
  roles: [{ role: "readWrite", db: "RealStateDB" }]
})

// Administrador de BD
db.createUser({
  user: "admin",
  pwd: "admin_password",
  roles: [
    { role: "readWrite", db: "RealStateDB" },
    { role: "dbAdmin", db: "RealStateDB" }
  ]
})
```

---

## 🆘 Troubleshooting

### P26: "MongoConnectionException" al iniciar aplicación

**A:** Causas comunes:

```csharp
// 1. MongoDB no está ejecutándose
// Solución: Iniciar el servicio
// Windows: Services -> MongoDB Community Server -> Start
// macOS: brew services start mongodb-community
// Linux: sudo systemctl start mongod

// 2. Cadena de conexión incorrecta
// Solución: Verificar
mongosh "mongodb://localhost:27017"

// 3. Puerto ocupado
// Solución: Cambiar puerto o liberar
// macOS/Linux: lsof -i :27017
// Windows: netstat -ano | findstr :27017
```

---

### P27: "MongoWriteConcernException" durante inserciones

**A:** Problema de permisos o replicación:

```csharp
// Solución: Ajustar WriteConcern
var settings = MongoClientSettings.FromConnectionString(connectionString);
settings.WriteConcern = WriteConcern.Acknowledged;
var client = new MongoClient(settings);
```

---

### P28: Documentos duplicados después de inserciones

**A:** Crear índice único:

```javascript
// Crear índice único en email
db.properties.createIndex({ email: 1 }, { unique: true })

// O en C#
var options = new CreateIndexOptions { Unique = true };
var definition = Builders<Property>.IndexKeys.Ascending(p => p.Email);
await collection.Indexes.CreateOneAsync(definition, options);
```

---

### P29: "MongoTimeoutException" en consultas lentas

**A:** Aumentar timeout:

```csharp
var settings = MongoClientSettings.FromConnectionString(connectionString);
settings.SocketTimeout = TimeSpan.FromSeconds(30);  // Aumentar si es necesario
var client = new MongoClient(settings);
```

---

### P30: Base de datos crece demasiado sin razón

**A:** Investigar:

```javascript
// Ver tamaño de colección
db.properties.stats();

// Ver documentos muy grandes
db.properties.find().size();

// Limpiar documentos antiguos
db.properties.deleteMany({ createdAt: { $lt: new Date("2024-01-01") } });

// Compactar
db.properties.compact();
```

---

## 📚 Recursos Adicionales

- 📖 [MongoDB Official Docs](https://docs.mongodb.com/)
- 🔧 [MongoDB .NET Driver Docs](https://www.mongodb.com/docs/drivers/csharp/)
- 🌐 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- 💬 [MongoDB Community](https://www.mongodb.com/community/forums/)
- 🐳 [MongoDB Docker Image](https://hub.docker.com/_/mongo)

---

## ✅ Checklist de Verificación

- [ ] MongoDB instalado y ejecutándose
- [ ] Cadena de conexión correcta
- [ ] Base de datos `RealStateDB` creada
- [ ] Colección `properties` con datos
- [ ] Índices creados
- [ ] Aplicación .NET conectando
- [ ] Consultas funcionando
- [ ] Manejo de errores implementado
- [ ] Usuarios de base de datos configurados
- [ ] Backups automatizados

---

**Última actualización:** 18 de octubre de 2025  
**Versión MongoDB:** 7.0+  
**Versión .NET:** 8.0+  
**Estado:** ✅ FAQ Completo
