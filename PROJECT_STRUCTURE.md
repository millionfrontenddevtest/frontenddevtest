# Estructura del Proyecto - Real State API

Documentación detallada de la estructura y propósito de cada archivo.

## 📂 Directorios Principales

### `Controllers/`

Contiene los controladores que exponen los endpoints REST.

- **PropertiesController.cs**
  - Controlador principal para operaciones de propiedades
  - Endpoints: GET, POST, búsqueda y filtrado
  - Validación de entrada y manejo de errores
  - Respuestas API estandarizadas

### `Services/`

Contiene la lógica de negocio y acceso a datos.

- **IPropertyService.cs**

  - Interfaz que define operaciones de propiedades
  - Contrato para la implementación del servicio

- **PropertyService.cs**

  - Implementación de la lógica de negocio
  - Mapeo de entidades a DTOs
  - Validación de parámetros
  - Orquestación con repositorio

- **MongoDbContext.cs**
  - Contexto para conexión a MongoDB
  - Expone colecciones como propiedades
  - Gestión de la conexión al cliente

### `Repositories/`

Implementa el patrón Repository para acceso a datos.

- **IPropertyRepository.cs**

  - Interfaz del repositorio
  - Define operaciones CRUD
  - Define operaciones de filtrado

- **PropertyRepository.cs**
  - Implementación del acceso a MongoDB
  - Operaciones CRUD completas
  - Filtrado con expresiones lambda
  - Búsqueda con regex (case-insensitive)
  - Gestión de ObjectIds

### `Models/`

Contiene las entidades de dominio mapeadas a MongoDB.

- **Property.cs**
  - Modelo principal de Propiedad
  - Atributos BsonElement para mapeo MongoDB
  - Campos de auditoría (createdAt, updatedAt)
  - Validación con atributos BSON

### `DTOs/`

Data Transfer Objects para comunicación segura.

- **PropertyDto.cs**

  - DTO para transferencia de datos de propiedades
  - Contiene solo campos públicos necesarios
  - No incluye datos sensibles

- **PropertyFilterDto.cs**

  - DTO para parámetros de filtrado
  - Validación de rangos de precio
  - Método `IsValid()` para validación

- **ApiResponse.cs**
  - Respuesta estandarizada genérica
  - Incluye estado de éxito
  - Mensaje descriptivo
  - Datos y lista de errores
  - Constructores de conveniencia

### `Configuration/`

Archivos de configuración.

- **MongoDbSettings.cs**
  - Clase de configuración para MongoDB
  - Connection string
  - Nombre de base de datos
  - Nombre de colecciones

### `Middleware/`

Middleware personalizado.

- **ExceptionHandlingMiddleware.cs**
  - Manejo global de excepciones
  - Retorna respuestas JSON estandarizadas
  - Logging de errores

### `Tests/`

Pruebas unitarias.

- **PropertyFilterDtoTests.cs**

  - 9 pruebas para validación de filtros
  - Casos positivos y negativos
  - Validación de rangos de precio

- **PropertyServiceTests.cs**

  - 11 pruebas del servicio
  - Mocking del repositorio
  - Pruebas de lógica de negocio
  - Validación de errores

- **PropertyRepositoryTests.cs**
  - 8 pruebas de repositorio
  - Validación de ObjectIds
  - Mapeo de entidades
  - Respuestas API

## 📄 Archivos de Configuración

### `Program.cs`

- Configuración de aplicación ASP.NET Core
- Registro de servicios (DI)
- Configuración de middleware
- Swagger/OpenAPI
- CORS
- Rutas

### `appsettings.json`

Configuración por defecto:

```json
{
  "Logging": { ... },
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "RealStateDB",
    "PropertiesCollectionName": "Properties"
  }
}
```

### `appsettings.Development.json`

Configuración para ambiente de desarrollo:

- Logging más detallado
- Base de datos de desarrollo separada

### `RealStateAPI.csproj`

Archivo del proyecto .NET:

- Versión del framework (.NET 8)
- Referencias de paquetes NuGet
- Configuración de compilación

## 📦 Dependencias Instaladas

```xml
<!-- MongoDB -->
<PackageReference Include="MongoDB.Driver" Version="2.24.0" />

<!-- Testing -->
<PackageReference Include="NUnit" Version="4.1.0" />
<PackageReference Include="NUnit3TestAdapter" Version="4.5.0" />
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.9.0" />
<PackageReference Include="Moq" Version="4.20.70" />

<!-- API Documentation -->
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.4.0" />
```

## 🔄 Flujo de Datos

```
Cliente HTTP
    ↓
PropertiesController (Validación)
    ↓
PropertyService (Lógica de Negocio)
    ↓
PropertyRepository (Acceso a Datos)
    ↓
MongoDB
```

## 📊 Diagramas de Clase

### PropertyDto

```
PropertyDto
├── Id (string)
├── IdOwner (string)
├── Name (string)
├── Address (string)
├── Price (decimal)
└── Image (string)
```

### Property (Entidad)

```
Property
├── Id (string)
├── IdOwner (string)
├── Name (string)
├── Address (string)
├── Price (decimal)
├── Image (string)
├── CreatedAt (DateTime)
└── UpdatedAt (DateTime)
```

### PropertyFilterDto

```
PropertyFilterDto
├── Name (string?)
├── Address (string?)
├── MinPrice (decimal?)
├── MaxPrice (decimal?)
└── IsValid() : bool
```

### ApiResponse<T>

```
ApiResponse<T>
├── Success (bool)
├── Message (string)
├── Data (T?)
└── Errors (List<string>?)
```

## 🧩 Patrones de Diseño

### 1. Repository Pattern

Abstrae el acceso a datos permitiendo cambiar la implementación sin afectar el negocio.

### 2. Service Layer Pattern

Centraliza la lógica de negocio entre controladores y repositorio.

### 3. DTO Pattern

Asegura que solo se transfieran datos necesarios y públicos.

### 4. Dependency Injection

Inversión de control usando contenedor de servicios.

### 5. Factory Pattern

MongoDB.Driver usa patrones factory para crear contextos y colecciones.

## 🔐 Seguridad de Capas

```
Controllers
  ↓
  └─→ Validación de entrada
      ├─ Verificación de nulos
      ├─ Validación de formato
      └─ Manejo de excepciones
  ↓
Services
  ↓
  └─→ Lógica de negocio
      ├─ Validación de reglas
      ├─ Transformación de datos
      └─ Manejo de errores
  ↓
Repositories
  ↓
  └─→ Acceso a datos
      ├─ Consultas paramétrizadas
      ├─ Validación de IDs
      └─ Manejo de excepciones
  ↓
MongoDB
```

## 📈 Escalabilidad

La arquitectura permite:

1. **Agregar nuevos servicios**: Crear nuevos `IService` e implementaciones
2. **Cambiar almacenamiento**: Reemplazar `IRepository` con otra BD
3. **Agregar autenticación**: Middleware adicional
4. **Rate limiting**: Middleware de rate limiting
5. **Caching**: Decorador del servicio

## 🧪 Estrategia de Testing

```
Nivel 1: Unit Tests (DTOs, Validación)
Nivel 2: Service Tests (Lógica, Mocking)
Nivel 3: Repository Tests (Acceso a datos)
Nivel 4: Integration Tests (BD real)
Nivel 5: E2E Tests (Endpoints)
```

## 📝 Convenciones de Nombres

- **Interfaces**: `IPropertyService`
- **Implementaciones**: `PropertyService`
- **DTOs**: `PropertyDto`
- **Controllers**: `PropertiesController`
- **Variables privadas**: `_propertyService`
- **Métodos async**: `GetPropertiesAsync`

## 🔗 Dependencias Entre Módulos

```
Controllers
    ↓
    ├─→ IPropertyService (inyectado)
    └─→ ILogger (inyectado)

Services
    ↓
    └─→ IPropertyRepository (inyectado)

Repositories
    ↓
    └─→ MongoDbContext (inyectado)

Program.cs
    ↓
    ├─→ Registra MongoDbContext
    ├─→ Registra IPropertyRepository
    ├─→ Registra IPropertyService
    ├─→ Registra Controllers
    ├─→ Configura Swagger
    └─→ Configura CORS
```

## 📊 Estándares de Código

- **Language**: C# 12.0
- **Framework**: .NET 8.0
- **Testing**: NUnit 4.1.0
- **Documentation**: XML Comments
- **Code Style**: Microsoft C# Coding Conventions

## 🎯 Líneas de Código

```
Controllers: ~150 líneas
Services: ~100 líneas
Repositories: ~100 líneas
Models: ~50 líneas
DTOs: ~100 líneas
Tests: ~350 líneas
Total: ~850 líneas (sin comments)
```

---

**Última actualización:** 18 de Octubre de 2024
