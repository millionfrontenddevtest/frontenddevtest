# Real Estate API - Backend .NET + MongoDB Atlas# Real State API



Sistema de API REST completo para gestión de propiedades inmobiliarias. Backend desarrollado en **.NET 8** con base de datos **MongoDB Atlas** en la nube.API REST completa construida con **.NET 8**, **C#**, y **MongoDB** para gestionar y filtrar propiedades inmobiliarias. Diseñada siguiendo principios de **Clean Architecture** con capas bien definidas (Controllers, Services, Repositories, Models, DTOs).



## 🎯 Estado del Proyecto## 📋 Tabla de Contenidos



✅ **Backend API 100% Funcional**- [Características](#características)

- ✅ Conexión MongoDB Atlas establecida- [Requisitos Previos](#requisitos-previos)

- ✅ CRUD completo (Create, Read, Update, Delete)- [Instalación](#instalación)

- ✅ Filtrado de propiedades- [Configuración](#configuración)

- ✅ Autenticación preparada- [Estructura del Proyecto](#estructura-del-proyecto)

- ✅ Swagger/OpenAPI documentación- [Endpoints API](#endpoints-api)

- ✅ Tests de integración listos- [Pruebas Unitarias](#pruebas-unitarias)

- ✅ 8 propiedades de prueba insertadas- [Ejemplos de Uso](#ejemplos-de-uso)

- [Arquitectura](#arquitectura)

---- [Contribución](#contribución)



## 📋 Tabla de Contenidos## ✨ Características



1. [Requisitos](#requisitos)✅ **Arquitectura Limpia**: Controllers → Services → Repositories → Models  

2. [Configuración Rápida](#configuración-rápida)✅ **Inyección de Dependencias**: Configuración completa de DI en Program.cs  

3. [API Endpoints](#api-endpoints)✅ **MongoDB Integration**: Driver oficial de MongoDB.Driver v2.24.0  

4. [Estructura del Proyecto](#estructura-del-proyecto)✅ **DTOs Tipados**: Validación y mapeo de datos estructurado  

5. [MongoDB Atlas](#mongodb-atlas)✅ **Filtrado Avanzado**: Búsqueda por nombre, dirección y rango de precios  

6. [Testing](#testing)✅ **Manejo de Errores**: Middleware global de excepciones  

7. [Deployment](#deployment)✅ **API Responses Estandarizadas**: Respuestas JSON consistentes  

✅ **Swagger/OpenAPI**: Documentación interactiva de endpoints  

---✅ **Pruebas Unitarias**: Cobertura con NUnit y Moq  

✅ **Logging**: Sistema de logging integrado

## 🔧 Requisitos

## 📦 Requisitos Previos

- **.NET 8.0+** - [Descargar](https://dotnet.microsoft.com/download)

- **Git** - Control de versionesAsegúrate de tener instalado:

- **MongoDB Atlas Account** - Base de datos cloud (gratis)

- **Visual Studio Code o Visual Studio** - Editor- **.NET 8 SDK** ([Descargar](https://dotnet.microsoft.com/en-us/download/dotnet/8.0))

- **MongoDB** (versión 4.4+) - [Descargar](https://www.mongodb.com/try/download/community)

---- **Git** (opcional, para clonar el repositorio)



## ⚡ Configuración Rápida### Verificar Instalación



### 1. Clonar el Repositorio```bash

dotnet --version  # Debe ser 8.0+

```bashmongod --version  # Debe estar instalado

git clone https://github.com/millionfrontenddevtest/frontenddevtest.git```

cd frontenddevtest

```## 🔧 Instalación



### 2. Configurar MongoDB Atlas### 1. Clonar o Descargar el Proyecto



1. Ve a https://cloud.mongodb.com```bash

2. Crea una cuenta (gratis)# Usando Git (si lo tienes clonado)

3. Crea un clustergit clone <url-del-repositorio>

4. En Database → Browse Collections, crea:cd realState/RealStateAPI

   - Database: `RealStateDB_Dev`

   - Collection: `Properties`# O navega manualmente a la carpeta del proyecto

cd "c:\Users\<usuario>\OneDrive\Desktop\realState\RealStateAPI"

5. Copia tu connection string (formato: `mongodb+srv://user:password@cluster.mongodb.net/...`)```



### 3. Configurar Credentials en el API### 2. Restaurar Dependencias



Edita `RealStateAPI/appsettings.Development.json`:```bash

dotnet restore

```json```

{

  "MongoDbSettings": {### 3. Compilar el Proyecto

    "ConnectionString": "mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?retryWrites=true&w=majority",

    "DatabaseName": "RealStateDB_Dev",```bash

    "PropertiesCollectionName": "Properties"dotnet build

  }```

}

```### 4. Ejecutar Pruebas Unitarias



### 4. Ejecutar el API```bash

dotnet test

```bash```

cd RealStateAPI

dotnet restore### 5. Iniciar MongoDB

dotnet build

dotnet run**En Windows (si está instalado como servicio):**

```

```bash

**Verifica que aparezca:**mongod  # O usa el shell de mongo si está instalado

``````

Now listening on: http://localhost:5298

```**En Docker (alternativa):**



### 5. Acceder a Swagger```bash

docker run -d -p 27017:27017 --name mongodb mongo:latest

Abre en el navegador:```

```

http://localhost:5298/swagger/index.html### 6. Ejecutar la Aplicación

```

```bash

---dotnet run

```

## 🔌 API Endpoints

La API estará disponible en: `https://localhost:5001` o `http://localhost:5000`

### GET - Obtener Todas las Propiedades

```## ⚙️ Configuración

GET /api/Properties

```### appsettings.json



**Respuesta:**El archivo `appsettings.json` contiene la configuración de MongoDB:

```json

{```json

  "success": true,{

  "message": "Propiedades obtenidas exitosamente",  "Logging": {

  "data": [    "LogLevel": {

    {      "Default": "Information",

      "id": "6708f12b3f1a9e4c8b2d5c01",      "Microsoft.AspNetCore": "Warning"

      "idOwner": "507f1f77bcf86cd799439010",    }

      "name": "Casa Moderna en Miami",  },

      "address": "Ocean Drive 123, Miami, Florida",  "AllowedHosts": "*",

      "price": 385000,  "MongoDbSettings": {

      "image": "https://via.placeholder.com/400x300"    "ConnectionString": "mongodb://localhost:27017",

    }    "DatabaseName": "RealStateDB",

  ]    "PropertiesCollectionName": "Properties"

}  }

```}

```

### GET - Obtener por ID

```### Variables de Entorno

GET /api/Properties/{id}

```Puedes sobrescribir la configuración usando variables de entorno:



### POST - Crear Propiedad```bash

```# Windows (PowerShell)

POST /api/Properties$env:MongoDbSettings__ConnectionString = "mongodb://user:password@host:27017"

Content-Type: application/json$env:MongoDbSettings__DatabaseName = "RealStateDB"



{# Linux/Mac

  "idOwner": "507f1f77bcf86cd799439010",export MongoDbSettings__ConnectionString="mongodb://user:password@host:27017"

  "name": "Nueva Casa",export MongoDbSettings__DatabaseName="RealStateDB"

  "address": "Calle Principal 123, Miami, Florida",```

  "price": 350000,

  "image": "https://via.placeholder.com/400x300"## 📁 Estructura del Proyecto

}

``````

RealStateAPI/

### PUT - Actualizar Propiedad├── Controllers/

```│   └── PropertiesController.cs      # Endpoints REST

PUT /api/Properties/{id}├── Services/

Content-Type: application/json│   ├── IPropertyService.cs          # Interfaz del servicio

│   ├── PropertyService.cs           # Lógica de negocio

{│   └── MongoDbContext.cs            # Contexto de MongoDB

  "idOwner": "507f1f77bcf86cd799439010",├── Repositories/

  "name": "Casa Actualizada",│   ├── IPropertyRepository.cs       # Interfaz del repositorio

  "address": "Nueva Dirección",│   └── PropertyRepository.cs        # Acceso a datos

  "price": 400000,├── Models/

  "image": "https://via.placeholder.com/400x300"│   └── Property.cs                  # Modelo de entidad

}├── DTOs/

```│   ├── PropertyDto.cs               # DTO de transferencia

│   ├── PropertyFilterDto.cs         # DTO de filtros

### DELETE - Eliminar Propiedad│   └── ApiResponse.cs               # Respuesta estandarizada

```├── Configuration/

DELETE /api/Properties/{id}│   └── MongoDbSettings.cs           # Configuración de BD

```├── Middleware/

│   └── ExceptionHandlingMiddleware.cs # Manejo de excepciones

### POST - Filtrar Propiedades├── Tests/

```│   ├── PropertyFilterDtoTests.cs    # Pruebas de validación

POST /api/Properties/filter│   ├── PropertyServiceTests.cs      # Pruebas de servicio

Content-Type: application/json│   └── PropertyRepositoryTests.cs   # Pruebas de repositorio

├── Program.cs                        # Configuración de DI

{├── appsettings.json                 # Configuración

  "minPrice": 100000,└── RealStateAPI.csproj              # Archivo del proyecto

  "maxPrice": 500000,```

  "name": "Casa",

  "address": "Miami"## 🌐 Endpoints API

}

```### Base URL



---```

https://localhost:5001/api/properties

## 📁 Estructura del Proyecto```



```### 1. Obtener Todas las Propiedades

realState/

├── RealStateAPI/                    # Proyecto principal .NET```http

│   ├── Controllers/GET /api/properties

│   │   └── PropertiesController.cs  # Endpoints REST```

│   ├── Services/

│   │   ├── IPropertyService.cs      # Interfaz de servicios**Respuesta (200 OK):**

│   │   ├── PropertyService.cs       # Lógica de negocio

│   │   └── MongoDbContext.cs        # Contexto MongoDB```json

│   ├── Repositories/{

│   │   ├── IPropertyRepository.cs   # Interfaz repositorio  "success": true,

│   │   └── PropertyRepository.cs    # Acceso a datos  "message": "Propiedades obtenidas exitosamente",

│   ├── Models/  "data": [

│   │   └── Property.cs              # Modelo de dominio    {

│   ├── DTOs/      "id": "507f1f77bcf86cd799439011",

│   │   ├── PropertyDto.cs           # DTO propiedades      "idOwner": "507f1f77bcf86cd799439010",

│   │   ├── PropertyFilterDto.cs     # DTO filtros      "name": "Casa Moderna",

│   │   └── ApiResponse.cs           # DTO respuestas      "address": "Avenida Principal 123",

│   ├── Configuration/      "price": 250000,

│   │   └── MongoDbSettings.cs       # Configuración      "image": "https://example.com/image.jpg"

│   ├── Tests/                       # Pruebas unitarias    }

│   ├── appsettings.Development.json # Config desarrollo  ],

│   ├── appsettings.json             # Config producción  "errors": null

│   └── Program.cs                   # Startup principal}

│```

├── Scripts/                         # Scripts útiles

│   ├── insert-properties.ps1        # Insertar datos### 2. Obtener Propiedad por ID

│   ├── clean-properties.ps1         # Limpiar BD

│   ├── full-test.ps1                # Pruebas completas```http

│   ├── verify-atlas-connection.ps1  # Verificar conexiónGET /api/properties/{id}

│   └── mongodb-init.js              # Script MongoDB```

│

└── README.md                        # Este archivo**Parámetros:**

```

- `id` (string, requerido): ID de la propiedad (ObjectId de MongoDB)

---

**Ejemplo:**

## 🗄️ MongoDB Atlas

```http

### Colección: PropertiesGET /api/properties/507f1f77bcf86cd799439011

```

**Campos:**

```javascript**Respuesta (200 OK):**

{

  "_id": ObjectId,```json

  "idOwner": String,{

  "name": String,  "success": true,

  "address": String,  "message": "Propiedad obtenida exitosamente",

  "price": Number,  "data": {

  "image": String,    "id": "507f1f77bcf86cd799439011",

  "createdAt": Date,    "idOwner": "507f1f77bcf86cd799439010",

  "updatedAt": Date    "name": "Casa Moderna",

}    "address": "Avenida Principal 123",

```    "price": 250000,

    "image": "https://example.com/image.jpg"

**Índices Creados:**  },

- Text Index: name, address (búsqueda por texto)  "errors": null

- Regular Index: price (filtrado por precio)}

- Regular Index: idOwner (propiedades por propietario)```

- Compound Index: price + idOwner (queries complejas)

**Respuesta (404 Not Found):**

---

```json

## 🧪 Testing{

  "success": false,

### Opción 1: Swagger UI (Recomendado)  "message": "Propiedad con ID 507f1f77bcf86cd799439011 no encontrada",

  "data": null,

1. Abre http://localhost:5298/swagger/index.html  "errors": null

2. Click en endpoint}

3. Click "Try it out"```

4. Ejecuta

### 3. Filtrar Propiedades (POST)

### Opción 2: PowerShell

```http

```powershellPOST /api/properties/filter

cd RealStateAPIContent-Type: application/json

powershell -ExecutionPolicy Bypass -File full-test.ps1```

```

**Cuerpo de la Solicitud:**

### Opción 3: cURL

```json

```bash{

# GET todas las propiedades  "name": "Casa",

curl http://localhost:5298/api/Properties  "address": "Avenida",

  "minPrice": 100000,

# POST crear  "maxPrice": 500000

curl -X POST http://localhost:5298/api/Properties \}

  -H "Content-Type: application/json" \```

  -d '{"idOwner":"507f1f77bcf86cd799439010","name":"Casa","address":"Miami","price":350000,"image":"https://example.com/image.jpg"}'

**Todos los campos son opcionales:**

# Filtrar

curl -X POST http://localhost:5298/api/Properties/filter \- `name` (string): Búsqueda parcial del nombre

  -H "Content-Type: application/json" \- `address` (string): Búsqueda parcial de la dirección

  -d '{"minPrice":100000,"maxPrice":500000}'- `minPrice` (decimal): Precio mínimo

```- `maxPrice` (decimal): Precio máximo



### Scripts de Testing**Respuesta (200 OK):**



```bash```json

# Verificar conexión a MongoDB Atlas{

powershell -ExecutionPolicy Bypass -File verify-atlas-connection.ps1  "success": true,

  "message": "Se encontraron 2 propiedades que coinciden con los criterios",

# Insertar datos de prueba  "data": [

powershell -ExecutionPolicy Bypass -File insert-properties.ps1    {

      "id": "507f1f77bcf86cd799439011",

# Limpiar base de datos      "idOwner": "507f1f77bcf86cd799439010",

powershell -ExecutionPolicy Bypass -File clean-properties.ps1      "name": "Casa Moderna",

```      "address": "Avenida Principal 123",

      "price": 250000,

---      "image": "https://example.com/image.jpg"

    },

## 🏗️ Arquitectura    {

      "id": "507f1f77bcf86cd799439012",

### Patrón: Clean Architecture + Repository Pattern      "idOwner": "507f1f77bcf86cd799439013",

      "name": "Casa Clásica",

```      "address": "Avenida Secundaria 456",

Controllers → Services → Repositories → MongoDB      "price": 180000,

   (REST)      (Lógica)   (Datos)       (BD)      "image": "https://example.com/image2.jpg"

    ↓            ↓           ↓            ↓    }

  HTTP        Negocio      CRUD        Almacen  ],

```  "errors": null

}

### Layers:```



1. **Controllers** - Maneja solicitudes HTTP**Respuesta (400 Bad Request):**

2. **Services** - Lógica de negocio y validaciones

3. **Repositories** - Acceso a datos```json

4. **Models** - Entidades de dominio{

5. **DTOs** - Transferencia de datos  "success": false,

  "message": "Parámetros de filtrado inválidos",

### Dependency Injection  "data": null,

  "errors": [

Configurado en `Program.cs`:    "MinPrice no puede ser mayor que MaxPrice",

    "Precio no puede ser negativo"

```csharp  ]

builder.Services.AddSingleton<MongoDbContext>();}

builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();```

builder.Services.AddScoped<IPropertyService, PropertyService>();

```### 4. Buscar Propiedades (GET con Query Parameters)



---```http

GET /api/properties/search?name=Casa&address=Avenida&minPrice=100000&maxPrice=500000

## 📊 Propiedades de Prueba```



8 propiedades precargadas en MongoDB Atlas:**Parámetros de Query (todos opcionales):**



| # | Nombre | Ubicación | Precio USD |- `name` (string): Búsqueda parcial del nombre

|---|--------|-----------|-----------|- `address` (string): Búsqueda parcial de la dirección

| 1 | Casa Moderna en Miami | Ocean Drive 123, Miami | $385,000 |- `minPrice` (decimal): Precio mínimo

| 2 | Apartamento Lujo Fort Lauderdale | Las Olas Boulevard 456 | $495,000 |- `maxPrice` (decimal): Precio máximo

| 3 | Villa Moderna Tampa | Bayshore Boulevard 789 | $320,000 |

| 4 | Piso Centro Orlando | International Drive 101 | $295,000 |**Ejemplo con parámetros:**

| 5 | Chalet Historico Jacksonville | Riverside Avenue 202 | $410,000 |

| 6 | Penthouse Miami Beach | Collins Avenue 259 | $720,000 |```http

| 7 | Casa Playa Clearwater | Gulf to Bay Boulevard 55 | $475,000 |GET /api/properties/search?name=Casa&minPrice=100000

| 8 | Loft Industrial Naples | Central Avenue 78 | $385,000 |```



---**Respuesta:** Idéntica al endpoint POST `/filter`



## 🚀 Deployment### 5. Endpoint de Salud



### Azure App Service```http

GET /health

1. **Crear App Service:**```

```bash

az webapp create --name RealStateAPI --resource-group myGroup --plan myPlan**Respuesta (200 OK):**

```

```json

2. **Publicar:**{

```bash  "status": "healthy",

dotnet publish -c Release  "timestamp": "2024-10-18T12:34:56Z"

```}

```

3. **Deploy:**

```bash## 🧪 Pruebas Unitarias

az webapp deployment source config-zip --resource-group myGroup --name RealStateAPI --src bin/Release/net8.0/publish/app.zip

```### Ejecutar Todas las Pruebas



### Heroku```bash

dotnet test

1. **Crear app:**```

```bash

heroku create realstate-api### Ejecutar Pruebas Específicas

```

```bash

2. **Deploy:**# Solo pruebas de PropertyFilterDto

```bashdotnet test --filter "PropertyFilterDtoTests"

git push heroku main

```# Solo pruebas de PropertyService

dotnet test --filter "PropertyServiceTests"

### AWS EC2

# Solo pruebas de PropertyRepository

1. Crear instancia Ubuntudotnet test --filter "PropertyRepositoryTests"

2. Instalar .NET Runtime```

3. Copiar archivos publicados

4. Ejecutar: `dotnet RealStateAPI.dll`### Cobertura de Pruebas



---Las pruebas incluyen:



## ⚙️ Configuración por Entorno✅ **PropertyFilterDtoTests** (9 pruebas)



### Development (appsettings.Development.json)- Validación de parámetros de filtro

- Logging: Debug- Rango de precios válidos e inválidos

- CORS: Permitido desde localhost- Búsqueda por nombre y dirección

- MongoDB: Base de datos de prueba

✅ **PropertyServiceTests** (11 pruebas)

### Production (appsettings.json)

- Logging: Information- Obtención de todas las propiedades

- CORS: Restringido a dominios específicos- Búsqueda por ID

- MongoDB: Base de datos principal- Filtrado de propiedades

- Validación de parámetros

---- Manejo de errores



## 🔐 Seguridad✅ **PropertyRepositoryTests** (8 pruebas)



### Implementado:- Validación de ObjectIds

- Creación de entidades

✅ Validación de entrada- Mapeo de DTOs

✅ Manejo de excepciones- Respuestas API estandarizadas

✅ CORS configurado

✅ Middleware de errores**Total: 28 pruebas exitosas**



### Pendiente:## 💡 Ejemplos de Uso



- [ ] JWT Authentication### Usando cURL

- [ ] Rate Limiting

- [ ] API Key Management```bash

- [ ] HTTPS Enforcement# 1. Obtener todas las propiedades

curl -X GET "https://localhost:5001/api/properties" -H "accept: application/json"

---

# 2. Obtener propiedad por ID

## 📝 Variables de Entornocurl -X GET "https://localhost:5001/api/properties/507f1f77bcf86cd799439011" -H "accept: application/json"



Crear archivo `.env` en `RealStateAPI/`:# 3. Filtrar propiedades (POST)

curl -X POST "https://localhost:5001/api/properties/filter" \

```  -H "Content-Type: application/json" \

MONGODB_CONNECTION_STRING=mongodb+srv://user:password@cluster.mongodb.net/  -d '{"name":"Casa","minPrice":100000,"maxPrice":500000}'

DATABASE_NAME=RealStateDB_Dev

COLLECTION_NAME=Properties# 4. Buscar propiedades (GET)

API_PORT=5298curl -X GET "https://localhost:5001/api/properties/search?name=Casa&minPrice=100000" \

ENVIRONMENT=Development  -H "accept: application/json"

```

# 5. Verificar salud de la API

---curl -X GET "https://localhost:5001/health" -H "accept: application/json"

```

## 🐛 Troubleshooting

### Usando Postman

### Error: "Connection refused"

```1. **Descargar Postman** desde https://www.postman.com/downloads/

Solución: Asegúrate que dotnet run está ejecutando2. **Crear nueva colección** llamada "Real Estate API"

```3. **Agregar requests** para cada endpoint usando ejemplos arriba

4. **Guardar colección** para reutilizar

### Error: "MongoDB not found"

```### Usando cliente HTTP de VS Code

Solución: Verifica la connection string en appsettings.Development.json

```Instala la extensión **REST Client** en VS Code y crea archivo `requests.http`:



### Error: "Port 5298 already in use"```http

```### Obtener todas las propiedades

dotnet run --urls "http://localhost:5299"GET https://localhost:5001/api/properties

```Accept: application/json



### Error: "404 Property not found"### Obtener propiedad por ID

```GET https://localhost:5001/api/properties/507f1f77bcf86cd799439011

Solución: Verifica que el ID es válidoAccept: application/json

```

### Filtrar propiedades

---POST https://localhost:5001/api/properties/filter

Content-Type: application/json

## 📚 Tecnologías Utilizadas

{

- **Backend:** .NET 8.0  "name": "Casa",

- **Lenguaje:** C#  "minPrice": 100000,

- **Base de Datos:** MongoDB 7.0+  "maxPrice": 500000

- **ORM/Driver:** MongoDB.Driver 2.24.0}

- **API Documentation:** Swagger/OpenAPI

- **Testing:** NUnit, Moq### Buscar propiedades

- **Logging:** Microsoft.Extensions.LoggingGET https://localhost:5001/api/properties/search?name=Casa&minPrice=100000

Accept: application/json

---

### Health check

## 🤝 ContribuyendoGET https://localhost:5001/health

Accept: application/json

1. Fork el repositorio```

2. Crea rama: `git checkout -b feature/nueva-funcionalidad`

3. Commit: `git commit -m "Agrega nueva funcionalidad"`## 🏗️ Arquitectura

4. Push: `git push origin feature/nueva-funcionalidad`

5. Pull Request### Capas del Proyecto



---```

┌─────────────────────────────────────────┐

## 📞 Soporte│        Controllers (REST API)           │

├─────────────────────────────────────────┤

Para reportar bugs o solicitar features, abre un issue en GitHub.│   Validación de entrada y respuestas    │

├─────────────────────────────────────────┤

---│    Services (Lógica de Negocio)         │

├─────────────────────────────────────────┤

## 📄 Licencia│  Repositories (Acceso a Datos)          │

├─────────────────────────────────────────┤

MIT License - Ver LICENSE.md│        MongoDB (Base de Datos)          │

└─────────────────────────────────────────┘

---```



## ✅ Checklist Implementado### Patrones Implementados



- [x] API REST con 6 endpoints1. **Repository Pattern**: Abstracción del acceso a datos

- [x] MongoDB Atlas conectado2. **Service Layer Pattern**: Lógica de negocio centralizada

- [x] CRUD completo funcional3. **DTO Pattern**: Transferencia de datos segura y tipada

- [x] Filtrado de propiedades4. **Dependency Injection**: Inyección de dependencias con contenedor de servicios

- [x] Swagger/OpenAPI documentación5. **Middleware Pattern**: Manejo centralizado de excepciones

- [x] Validación de datos6. **Factory Pattern**: Creación de objetos MongoDB

- [x] Manejo de errores

- [x] Tests unitarios## 📊 Modelo de Datos

- [x] Scripts de testing

- [x] Propiedades de prueba insertadas### Colección: Properties

- [x] Repositorio GitHub inicializado

- [x] README completo```json

{

---  "_id": ObjectId("507f1f77bcf86cd799439011"),

  "idOwner": ObjectId("507f1f77bcf86cd799439010"),

## 🎯 Próximas Fases  "name": "Casa Moderna",

  "address": "Avenida Principal 123",

### Fase 2: Frontend  "price": 250000,

- React/Vue.js para interfaz  "image": "https://example.com/image.jpg",

- Conexión con backend API  "createdAt": ISODate("2024-10-18T10:00:00Z"),

- Autenticación de usuarios  "updatedAt": ISODate("2024-10-18T10:00:00Z")

}

### Fase 3: Autenticación```

- JWT tokens

- Rol-based access control## 🔐 Seguridad

- OAuth2/Google Sign-in

### Recomendaciones para Producción

### Fase 4: Deployment

- CI/CD pipeline1. **HTTPS Obligatorio**: Siempre usar HTTPS en producción

- Docker containerization2. **Autenticación**: Implementar JWT o OAuth2

- Production deployment3. **CORS**: Configurar orígenes permitidos específicos

4. **Validación**: Validar todas las entradas del usuario

---5. **Rate Limiting**: Implementar límite de solicitudes

6. **MongoDB Authentication**: Usar credenciales en producción

**Última actualización:** 19 de octubre de 2025

## 🚀 Deployment

**Versión:** 1.0.0

### Publicar la Aplicación

**Estado:** ✅ Producción - API 100% Funcional

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
