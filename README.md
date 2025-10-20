# Real State API

API REST completa construida con **.NET 8**, **C#**, y **MongoDB** para gestionar y filtrar propiedades inmobiliarias. Diseñada siguiendo principios de **Clean Architecture** con capas bien definidas (Controllers, Services, Repositories, Models, DTOs).

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints API](#endpoints-api)
- [Pruebas Unitarias](#pruebas-unitarias)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Arquitectura](#arquitectura)
- [Contribución](#contribución)

## ✨ Características

✅ **Arquitectura Limpia**: Controllers → Services → Repositories → Models  
✅ **Inyección de Dependencias**: Configuración completa de DI en Program.cs  
✅ **MongoDB Integration**: Driver oficial de MongoDB.Driver v2.24.0  
✅ **DTOs Tipados**: Validación y mapeo de datos estructurado  
✅ **Filtrado Avanzado**: Búsqueda por nombre, dirección y rango de precios  
✅ **Manejo de Errores**: Middleware global de excepciones  
✅ **API Responses Estandarizadas**: Respuestas JSON consistentes  
✅ **Swagger/OpenAPI**: Documentación interactiva de endpoints  
✅ **Pruebas Unitarias**: Cobertura con NUnit y Moq  
✅ **Logging**: Sistema de logging integrado

## 📦 Requisitos Previos

Asegúrate de tener instalado:

- **.NET 8 SDK** ([Descargar](https://dotnet.microsoft.com/en-us/download/dotnet/8.0))
- **MongoDB** (versión 4.4+) - [Descargar](https://www.mongodb.com/try/download/community)
- **Git** (opcional, para clonar el repositorio)

### Verificar Instalación

```bash
dotnet --version  # Debe ser 8.0+
mongod --version  # Debe estar instalado
```

## 🔧 Instalación

### 1. Clonar o Descargar el Proyecto

```bash
# Usando Git (si lo tienes clonado)
git clone <url-del-repositorio>
cd realState/RealStateAPI

# O navega manualmente a la carpeta del proyecto
cd "c:\Users\<usuario>\OneDrive\Desktop\realState\RealStateAPI"
```

### 2. Restaurar Dependencias

```bash
dotnet restore
```

### 3. Compilar el Proyecto

```bash
dotnet build
```

### 4. Ejecutar Pruebas Unitarias

```bash
dotnet test
```

### 5. Iniciar MongoDB

**En Windows (si está instalado como servicio):**

```bash
mongod  # O usa el shell de mongo si está instalado
```

**En Docker (alternativa):**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 6. Ejecutar la Aplicación

```bash
dotnet run
```

La API estará disponible en: `https://localhost:5001` o `http://localhost:5000`

## ⚙️ Configuración

### appsettings.json

El archivo `appsettings.json` contiene la configuración de MongoDB:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "RealStateDB",
    "PropertiesCollectionName": "Properties"
  }
}
```

### Variables de Entorno

Puedes sobrescribir la configuración usando variables de entorno:

```bash
# Windows (PowerShell)
$env:MongoDbSettings__ConnectionString = "mongodb://user:password@host:27017"
$env:MongoDbSettings__DatabaseName = "RealStateDB"

# Linux/Mac
export MongoDbSettings__ConnectionString="mongodb://user:password@host:27017"
export MongoDbSettings__DatabaseName="RealStateDB"
```

## 📁 Estructura del Proyecto

```
RealStateAPI/
├── Controllers/
│   └── PropertiesController.cs      # Endpoints REST
├── Services/
│   ├── IPropertyService.cs          # Interfaz del servicio
│   ├── PropertyService.cs           # Lógica de negocio
│   └── MongoDbContext.cs            # Contexto de MongoDB
├── Repositories/
│   ├── IPropertyRepository.cs       # Interfaz del repositorio
│   └── PropertyRepository.cs        # Acceso a datos
├── Models/
│   └── Property.cs                  # Modelo de entidad
├── DTOs/
│   ├── PropertyDto.cs               # DTO de transferencia
│   ├── PropertyFilterDto.cs         # DTO de filtros
│   └── ApiResponse.cs               # Respuesta estandarizada
├── Configuration/
│   └── MongoDbSettings.cs           # Configuración de BD
├── Middleware/
│   └── ExceptionHandlingMiddleware.cs # Manejo de excepciones
├── Tests/
│   ├── PropertyFilterDtoTests.cs    # Pruebas de validación
│   ├── PropertyServiceTests.cs      # Pruebas de servicio
│   └── PropertyRepositoryTests.cs   # Pruebas de repositorio
├── Program.cs                        # Configuración de DI
├── appsettings.json                 # Configuración
└── RealStateAPI.csproj              # Archivo del proyecto
```

## 🌐 Endpoints API

### Base URL

```
https://localhost:5001/api/properties
```

### 1. Obtener Todas las Propiedades

```http
GET /api/properties
```

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Propiedades obtenidas exitosamente",
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "idOwner": "507f1f77bcf86cd799439010",
      "name": "Casa Moderna",
      "address": "Avenida Principal 123",
      "price": 250000,
      "image": "https://example.com/image.jpg"
    }
  ],
  "errors": null
}
```

### 2. Obtener Propiedad por ID

```http
GET /api/properties/{id}
```

**Parámetros:**

- `id` (string, requerido): ID de la propiedad (ObjectId de MongoDB)

**Ejemplo:**

```http
GET /api/properties/507f1f77bcf86cd799439011
```

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Propiedad obtenida exitosamente",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "idOwner": "507f1f77bcf86cd799439010",
    "name": "Casa Moderna",
    "address": "Avenida Principal 123",
    "price": 250000,
    "image": "https://example.com/image.jpg"
  },
  "errors": null
}
```

**Respuesta (404 Not Found):**

```json
{
  "success": false,
  "message": "Propiedad con ID 507f1f77bcf86cd799439011 no encontrada",
  "data": null,
  "errors": null
}
```

### 3. Filtrar Propiedades (POST)

```http
POST /api/properties/filter
Content-Type: application/json
```

**Cuerpo de la Solicitud:**

```json
{
  "name": "Casa",
  "address": "Avenida",
  "minPrice": 100000,
  "maxPrice": 500000
}
```

**Todos los campos son opcionales:**

- `name` (string): Búsqueda parcial del nombre
- `address` (string): Búsqueda parcial de la dirección
- `minPrice` (decimal): Precio mínimo
- `maxPrice` (decimal): Precio máximo

**Respuesta (200 OK):**

```json
{
  "success": true,
  "message": "Se encontraron 2 propiedades que coinciden con los criterios",
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "idOwner": "507f1f77bcf86cd799439010",
      "name": "Casa Moderna",
      "address": "Avenida Principal 123",
      "price": 250000,
      "image": "https://example.com/image.jpg"
    },
    {
      "id": "507f1f77bcf86cd799439012",
      "idOwner": "507f1f77bcf86cd799439013",
      "name": "Casa Clásica",
      "address": "Avenida Secundaria 456",
      "price": 180000,
      "image": "https://example.com/image2.jpg"
    }
  ],
  "errors": null
}
```

**Respuesta (400 Bad Request):**

```json
{
  "success": false,
  "message": "Parámetros de filtrado inválidos",
  "data": null,
  "errors": [
    "MinPrice no puede ser mayor que MaxPrice",
    "Precio no puede ser negativo"
  ]
}
```

### 4. Buscar Propiedades (GET con Query Parameters)

```http
GET /api/properties/search?name=Casa&address=Avenida&minPrice=100000&maxPrice=500000
```

**Parámetros de Query (todos opcionales):**

- `name` (string): Búsqueda parcial del nombre
- `address` (string): Búsqueda parcial de la dirección
- `minPrice` (decimal): Precio mínimo
- `maxPrice` (decimal): Precio máximo

**Ejemplo con parámetros:**

```http
GET /api/properties/search?name=Casa&minPrice=100000
```

**Respuesta:** Idéntica al endpoint POST `/filter`

### 5. Endpoint de Salud

```http
GET /health
```

**Respuesta (200 OK):**

```json
{
  "status": "healthy",
  "timestamp": "2024-10-18T12:34:56Z"
}
```

## 🧪 Pruebas Unitarias

### Ejecutar Todas las Pruebas

```bash
dotnet test
```

### Ejecutar Pruebas Específicas

```bash
# Solo pruebas de PropertyFilterDto
dotnet test --filter "PropertyFilterDtoTests"

# Solo pruebas de PropertyService
dotnet test --filter "PropertyServiceTests"

# Solo pruebas de PropertyRepository
dotnet test --filter "PropertyRepositoryTests"
```

### Cobertura de Pruebas

Las pruebas incluyen:

✅ **PropertyFilterDtoTests** (9 pruebas)

- Validación de parámetros de filtro
- Rango de precios válidos e inválidos
- Búsqueda por nombre y dirección

✅ **PropertyServiceTests** (11 pruebas)

- Obtención de todas las propiedades
- Búsqueda por ID
- Filtrado de propiedades
- Validación de parámetros
- Manejo de errores

✅ **PropertyRepositoryTests** (8 pruebas)

- Validación de ObjectIds
- Creación de entidades
- Mapeo de DTOs
- Respuestas API estandarizadas

**Total: 28 pruebas exitosas**

## 💡 Ejemplos de Uso

### Usando cURL

```bash
# 1. Obtener todas las propiedades
curl -X GET "https://localhost:5001/api/properties" -H "accept: application/json"

# 2. Obtener propiedad por ID
curl -X GET "https://localhost:5001/api/properties/507f1f77bcf86cd799439011" -H "accept: application/json"

# 3. Filtrar propiedades (POST)
curl -X POST "https://localhost:5001/api/properties/filter" \
  -H "Content-Type: application/json" \
  -d '{"name":"Casa","minPrice":100000,"maxPrice":500000}'

# 4. Buscar propiedades (GET)
curl -X GET "https://localhost:5001/api/properties/search?name=Casa&minPrice=100000" \
  -H "accept: application/json"

# 5. Verificar salud de la API
curl -X GET "https://localhost:5001/health" -H "accept: application/json"
```

### Usando Postman

1. **Descargar Postman** desde https://www.postman.com/downloads/
2. **Crear nueva colección** llamada "Real Estate API"
3. **Agregar requests** para cada endpoint usando ejemplos arriba
4. **Guardar colección** para reutilizar

### Usando cliente HTTP de VS Code

Instala la extensión **REST Client** en VS Code y crea archivo `requests.http`:

```http
### Obtener todas las propiedades
GET https://localhost:5001/api/properties
Accept: application/json

### Obtener propiedad por ID
GET https://localhost:5001/api/properties/507f1f77bcf86cd799439011
Accept: application/json

### Filtrar propiedades
POST https://localhost:5001/api/properties/filter
Content-Type: application/json

{
  "name": "Casa",
  "minPrice": 100000,
  "maxPrice": 500000
}

### Buscar propiedades
GET https://localhost:5001/api/properties/search?name=Casa&minPrice=100000
Accept: application/json

### Health check
GET https://localhost:5001/health
Accept: application/json
```

## 🏗️ Arquitectura

### Capas del Proyecto

```
┌─────────────────────────────────────────┐
│        Controllers (REST API)           │
├─────────────────────────────────────────┤
│   Validación de entrada y respuestas    │
├─────────────────────────────────────────┤
│    Services (Lógica de Negocio)         │
├─────────────────────────────────────────┤
│  Repositories (Acceso a Datos)          │
├─────────────────────────────────────────┤
│        MongoDB (Base de Datos)          │
└─────────────────────────────────────────┘
```

### Patrones Implementados

1. **Repository Pattern**: Abstracción del acceso a datos
2. **Service Layer Pattern**: Lógica de negocio centralizada
3. **DTO Pattern**: Transferencia de datos segura y tipada
4. **Dependency Injection**: Inyección de dependencias con contenedor de servicios
5. **Middleware Pattern**: Manejo centralizado de excepciones
6. **Factory Pattern**: Creación de objetos MongoDB

## 📊 Modelo de Datos

### Colección: Properties

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "idOwner": ObjectId("507f1f77bcf86cd799439010"),
  "name": "Casa Moderna",
  "address": "Avenida Principal 123",
  "price": 250000,
  "image": "https://example.com/image.jpg",
  "createdAt": ISODate("2024-10-18T10:00:00Z"),
  "updatedAt": ISODate("2024-10-18T10:00:00Z")
}
```

## 🔐 Seguridad

### Recomendaciones para Producción

1. **HTTPS Obligatorio**: Siempre usar HTTPS en producción
2. **Autenticación**: Implementar JWT o OAuth2
3. **CORS**: Configurar orígenes permitidos específicos
4. **Validación**: Validar todas las entradas del usuario
5. **Rate Limiting**: Implementar límite de solicitudes
6. **MongoDB Authentication**: Usar credenciales en producción

## 🚀 Deployment

### Publicar la Aplicación

```bash
# Release build
dotnet publish -c Release -o publish

# Navegar a la carpeta publicada
cd publish

# Ejecutar desde la carpeta publicada
dotnet RealStateAPI.dll
```

### Usar Docker

Crea un archivo `Dockerfile`:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["RealStateAPI.csproj", "."]
RUN dotnet restore "RealStateAPI.csproj"
COPY . .
RUN dotnet build "RealStateAPI.csproj" -c Release -o /app/build

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT ["dotnet", "RealStateAPI.dll"]
```

Construye e ejecuta:

```bash
docker build -t realstate-api .
docker run -p 5000:80 -e MongoDbSettings__ConnectionString=mongodb://host.docker.internal:27017 realstate-api
```

## 📝 Documentación Swagger

Accede a la documentación interactiva en:

```
https://localhost:5001/
```

O abre:

```
https://localhost:5001/swagger/index.html
```

## 🐛 Troubleshooting

### Error: "Unable to connect to MongoDB"

**Solución:**

- Verifica que MongoDB esté ejecutándose: `mongod --version`
- Revisa la cadena de conexión en `appsettings.json`
- Usa `mongosh` para conectar manualmente: `mongosh "mongodb://localhost:27017"`

### Error: "The certificate is untrusted"

**Solución:**

```bash
dotnet dev-certs https --trust
```

### Pruebas fallan

**Solución:**

```bash
# Limpiar caché de compilación
dotnet clean

# Restaurar dependencias
dotnet restore

# Reejecutar pruebas
dotnet test
```

## 📚 Recursos Útiles

- [Documentación .NET 8](https://learn.microsoft.com/dotnet/)
- [MongoDB .NET Driver](https://www.mongodb.com/docs/drivers/csharp/)
- [NUnit Documentation](https://docs.nunit.org/)
- [Moq Framework](https://github.com/moq/moq4)
- [Swagger/OpenAPI](https://swagger.io/)

## 📄 Licencia

Este proyecto está bajo licencia MIT.

## 👤 Autor

Desarrollado por **José**.

## 📞 Soporte

Para reportar problemas o sugerir mejoras, por favor abre un issue en el repositorio.

---

**Última actualización:** 18 de Octubre de 2024  
**.NET Version:** 8.0  
**C# Version:** 12.0
