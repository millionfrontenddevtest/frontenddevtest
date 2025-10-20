# 🚀 Quick Start Guide - Real State API

Guía rápida para comenzar a usar la API de Real State.

## Paso 1: Requisitos Previos

✅ .NET 8 SDK instalado  
✅ MongoDB en ejecución  
✅ Git (opcional)

## Paso 2: Preparar MongoDB

### Opción A: MongoDB Local (Windows)

```bash
# Inicia MongoDB (si está instalado como servicio)
mongod

# O en otra terminal, conecta con:
mongosh
```

### Opción B: Docker

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Paso 3: Clonar/Descargar Proyecto

```bash
cd "c:\Users\<tu-usuario>\OneDrive\Desktop\realState\RealStateAPI"
```

## Paso 4: Instalar Dependencias

```bash
dotnet restore
```

## Paso 5: Compilar

```bash
dotnet build
```

## Paso 6: Ejecutar Pruebas (Opcional)

```bash
dotnet test
```

Deberías ver: ✅ **Todas las 29 pruebas pasadas**

## Paso 7: Iniciar la API

```bash
dotnet run
```

**Salida esperada:**

```
info: Microsoft.AspNetCore.Hosting.Diagnostics
      Listening on http://localhost:5000 and https://localhost:5001
```

## Paso 8: Acceder a la API

### Swagger UI (Interfaz Gráfica)

```
https://localhost:5001/
```

### Health Check

```
https://localhost:5001/health
```

### Endpoints Principales

```
GET    https://localhost:5001/api/properties
GET    https://localhost:5001/api/properties/{id}
POST   https://localhost:5001/api/properties/filter
GET    https://localhost:5001/api/properties/search
```

## 📝 Ejemplo: Crear Datos de Prueba

Abre MongoDB Compass o mongosh y ejecuta:

```javascript
use RealStateDB

db.Properties.insertMany([
  {
    idOwner: ObjectId("507f1f77bcf86cd799439010"),
    name: "Casa Moderna",
    address: "Avenida Principal 123",
    price: 250000,
    image: "https://example.com/image1.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439011"),
    name: "Apartamento Lujo",
    address: "Calle Elegante 456",
    price: 180000,
    image: "https://example.com/image2.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    idOwner: ObjectId("507f1f77bcf86cd799439012"),
    name: "Casa Clásica",
    address: "Avenida Secundaria 789",
    price: 350000,
    image: "https://example.com/image3.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

## 🧪 Probar Endpoints Rápidamente

### Usando cURL

```bash
# Obtener todas las propiedades
curl -X GET "https://localhost:5001/api/properties" -k

# Filtrar por precio
curl -X POST "https://localhost:5001/api/properties/filter" \
  -H "Content-Type: application/json" \
  -d '{"minPrice":100000,"maxPrice":300000}' -k

# Buscar por nombre
curl -X GET "https://localhost:5001/api/properties/search?name=Casa" -k
```

### Usando Postman

1. Abre **Postman**
2. Crea nueva solicitud GET a `https://localhost:5001/api/properties`
3. Desactiva verificación SSL (en Settings > General)
4. Haz clic en **Send**

## 📊 Estructura Básica

```
RealStateAPI/
├── Controllers/    → Endpoints HTTP
├── Services/       → Lógica de negocio
├── Repositories/   → Acceso a datos
├── Models/         → Entidades
├── DTOs/           → Transferencia de datos
└── Tests/          → Pruebas unitarias
```

## 🔧 Configuración

Edita `appsettings.json` para cambiar:

```json
{
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "RealStateDB",
    "PropertiesCollectionName": "Properties"
  }
}
```

## 📚 Documentación Completa

Ver `README.md` para documentación detallada.

## ❌ Solución de Problemas

### "Unable to connect to MongoDB"

```bash
# Verifica que MongoDB esté en ejecución
mongod --version
```

### "Certificate is untrusted"

```bash
dotnet dev-certs https --trust
```

### "Pruebas fallan"

```bash
dotnet clean
dotnet restore
dotnet test
```

## ✨ ¡Listo!

Ya tienes la API ejecutándose. Accede a **Swagger** en:

```
https://localhost:5001/
```

¿Preguntas? Revisa el archivo `README.md` completo.

---

**Última actualización:** 18 de Octubre de 2024
