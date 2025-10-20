# 🧪 Prueba de Endpoints - Real Estate API

## 📋 Tabla de Contenidos

1. [Inicio Rápido](#inicio-rápido)
2. [Requisitos](#requisitos)
3. [3 Formas de Probar](#3-formas-de-probar)
4. [Ejemplos por Endpoint](#ejemplos-por-endpoint)
5. [Respuestas Esperadas](#respuestas-esperadas)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Inicio Rápido

### Paso 1: Inicia MongoDB

```bash
# Windows
# Services -> MongoDB Community Server -> Start

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Paso 2: Inicia la API

```bash
# Terminal en la carpeta del proyecto
cd c:\Users\jose_\OneDrive\Desktop\realState\RealStateAPI
dotnet run
```

### Paso 3: Abre Swagger

```
http://localhost:5000/swagger/index.html
```

✅ **¡Listo!** Ahora puedes probar los endpoints.

---

## 📦 Requisitos

✅ MongoDB ejecutándose (puerto 27017)  
✅ .NET 8.0 SDK instalado  
✅ Paquete MongoDB.Driver instalado  
✅ Datos de prueba insertados en MongoDB

**Verificar:**

```bash
# Terminal 1: Verificar MongoDB
mongosh
use RealStateDB
db.properties.countDocuments()  # Debe mostrar: 8

# Terminal 2: Ejecutar API
cd RealStateAPI
dotnet run
```

---

## 🧪 3 Formas de Probar

### Opción 1: Swagger UI (MÁS FÁCIL) ⭐

```
http://localhost:5000/swagger/index.html
```

**Ventajas:**

- ✅ Interfaz gráfica
- ✅ No necesita código
- ✅ Documentación automática
- ✅ Prueba en tiempo real

**Cómo usar:**

1. Abre la URL en navegador
2. Haz clic en un endpoint
3. Click "Try it out"
4. Completa los datos
5. Click "Execute"

---

### Opción 2: Postman (RECOMENDADO)

```
https://www.postman.com/downloads/
```

**Ventajas:**

- ✅ Más poderoso que Swagger
- ✅ Guarda colecciones
- ✅ Variables y scripts
- ✅ Historial de solicitudes

**Descargar:**

1. Descarga Postman
2. Instala y abre
3. Crea nueva colección "Real Estate API"
4. Agrega requests (ver ejemplos abajo)

---

### Opción 3: cURL / PowerShell (TERMINAL)

```bash
# Desde terminal
curl -X GET "http://localhost:5000/api/properties" \
  -H "Content-Type: application/json"
```

**Ventajas:**

- ✅ No necesita software adicional
- ✅ Rápido y directo
- ✅ Fácil de automatizar

---

## 📍 Ejemplos por Endpoint

### 1. GET - Obtener Todas las Propiedades

#### **Con Swagger:**

1. Swagger → Properties → GET /api/properties
2. "Try it out"
3. "Execute"

#### **Con Postman:**

```
Method: GET
URL: http://localhost:5000/api/properties
Headers:
  Content-Type: application/json
Body: (vacío)
```

#### **Con cURL:**

```bash
curl -X GET "http://localhost:5000/api/properties" \
  -H "Content-Type: application/json"
```

#### **Con PowerShell:**

```powershell
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/properties" `
  -Method Get `
  -ContentType "application/json"

$response | ConvertTo-Json -Depth 10
```

#### **Respuesta Esperada:**

```json
{
  "success": true,
  "message": "Propiedades obtenidas exitosamente",
  "data": [
    {
      "id": "6708f12b3f1a9e4c8b2d5c01",
      "idOwner": "507f1f77bcf86cd799439010",
      "name": "Casa Moderna en Avenida Principal",
      "address": "Avenida Principal 123, Piso 1, Madrid 28001",
      "price": 250000,
      "image": "https://example.com/properties/casa-moderna.jpg",
      "createdAt": "2025-10-01T10:00:00Z",
      "updatedAt": "2025-10-15T10:00:00Z"
    },
    ...
  ]
}
```

---

### 2. GET - Obtener Propiedad por ID

#### **Con Swagger:**

1. Swagger → Properties → GET /api/properties/{id}
2. "Try it out"
3. Pega un ID (ej: `6708f12b3f1a9e4c8b2d5c01`)
4. "Execute"

#### **Con Postman:**

```
Method: GET
URL: http://localhost:5000/api/properties/6708f12b3f1a9e4c8b2d5c01
Headers:
  Content-Type: application/json
Body: (vacío)
```

#### **Con cURL:**

```bash
curl -X GET "http://localhost:5000/api/properties/6708f12b3f1a9e4c8b2d5c01" \
  -H "Content-Type: application/json"
```

#### **Con PowerShell:**

```powershell
$propertyId = "6708f12b3f1a9e4c8b2d5c01"
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/properties/$propertyId" `
  -Method Get `
  -ContentType "application/json"

$response | ConvertTo-Json -Depth 10
```

#### **Respuesta Esperada:**

```json
{
  "success": true,
  "message": "Propiedad obtenida exitosamente",
  "data": {
    "id": "6708f12b3f1a9e4c8b2d5c01",
    "idOwner": "507f1f77bcf86cd799439010",
    "name": "Casa Moderna en Avenida Principal",
    "address": "Avenida Principal 123, Piso 1, Madrid 28001",
    "price": 250000,
    "image": "https://example.com/properties/casa-moderna.jpg",
    "createdAt": "2025-10-01T10:00:00Z",
    "updatedAt": "2025-10-15T10:00:00Z"
  }
}
```

---

### 3. POST - Crear Nueva Propiedad

#### **Con Swagger:**

1. Swagger → Properties → POST /api/properties
2. "Try it out"
3. En Body (JSON), pega:

```json
{
  "idOwner": "507f1f77bcf86cd799439020",
  "name": "Nueva Casa de Prueba",
  "address": "Calle Nueva 456, Ciudad",
  "price": 180000,
  "image": "https://example.com/new-property.jpg"
}
```

4. "Execute"

#### **Con Postman:**

```
Method: POST
URL: http://localhost:5000/api/properties
Headers:
  Content-Type: application/json
Body (JSON):
{
  "idOwner": "507f1f77bcf86cd799439020",
  "name": "Nueva Casa de Prueba",
  "address": "Calle Nueva 456, Ciudad",
  "price": 180000,
  "image": "https://example.com/new-property.jpg"
}
```

#### **Con cURL:**

```bash
curl -X POST "http://localhost:5000/api/properties" \
  -H "Content-Type: application/json" \
  -d "{
    \"idOwner\": \"507f1f77bcf86cd799439020\",
    \"name\": \"Nueva Casa de Prueba\",
    \"address\": \"Calle Nueva 456, Ciudad\",
    \"price\": 180000,
    \"image\": \"https://example.com/new-property.jpg\"
  }"
```

#### **Con PowerShell:**

```powershell
$body = @{
    idOwner = "507f1f77bcf86cd799439020"
    name = "Nueva Casa de Prueba"
    address = "Calle Nueva 456, Ciudad"
    price = 180000
    image = "https://example.com/new-property.jpg"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/properties" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

$response | ConvertTo-Json -Depth 10
```

#### **Respuesta Esperada:**

```json
{
  "success": true,
  "message": "Propiedad creada exitosamente",
  "data": {
    "id": "6709a45f8f2c3d7e9h4i5j02",
    "idOwner": "507f1f77bcf86cd799439020",
    "name": "Nueva Casa de Prueba",
    "address": "Calle Nueva 456, Ciudad",
    "price": 180000,
    "image": "https://example.com/new-property.jpg",
    "createdAt": "2025-10-18T15:30:45Z",
    "updatedAt": "2025-10-18T15:30:45Z"
  }
}
```

---

### 4. PUT - Actualizar Propiedad

#### **Con Swagger:**

1. Swagger → Properties → PUT /api/properties/{id}
2. "Try it out"
3. En Path: Pega un ID válido
4. En Body (JSON), pega:

```json
{
  "idOwner": "507f1f77bcf86cd799439010",
  "name": "Casa Actualizada",
  "address": "Calle Actualizada 789",
  "price": 260000,
  "image": "https://example.com/updated.jpg"
}
```

5. "Execute"

#### **Con Postman:**

```
Method: PUT
URL: http://localhost:5000/api/properties/6708f12b3f1a9e4c8b2d5c01
Headers:
  Content-Type: application/json
Body (JSON):
{
  "idOwner": "507f1f77bcf86cd799439010",
  "name": "Casa Actualizada",
  "address": "Calle Actualizada 789",
  "price": 260000,
  "image": "https://example.com/updated.jpg"
}
```

#### **Con cURL:**

```bash
curl -X PUT "http://localhost:5000/api/properties/6708f12b3f1a9e4c8b2d5c01" \
  -H "Content-Type: application/json" \
  -d "{
    \"idOwner\": \"507f1f77bcf86cd799439010\",
    \"name\": \"Casa Actualizada\",
    \"address\": \"Calle Actualizada 789\",
    \"price\": 260000,
    \"image\": \"https://example.com/updated.jpg\"
  }"
```

#### **Con PowerShell:**

```powershell
$propertyId = "6708f12b3f1a9e4c8b2d5c01"
$body = @{
    idOwner = "507f1f77bcf86cd799439010"
    name = "Casa Actualizada"
    address = "Calle Actualizada 789"
    price = 260000
    image = "https://example.com/updated.jpg"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/properties/$propertyId" `
  -Method Put `
  -ContentType "application/json" `
  -Body $body

$response | ConvertTo-Json -Depth 10
```

#### **Respuesta Esperada:**

```json
{
  "success": true,
  "message": "Propiedad actualizada exitosamente"
}
```

---

### 5. DELETE - Eliminar Propiedad

#### **Con Swagger:**

1. Swagger → Properties → DELETE /api/properties/{id}
2. "Try it out"
3. Pega un ID válido
4. "Execute"

#### **Con Postman:**

```
Method: DELETE
URL: http://localhost:5000/api/properties/6708f12b3f1a9e4c8b2d5c01
Headers:
  Content-Type: application/json
Body: (vacío)
```

#### **Con cURL:**

```bash
curl -X DELETE "http://localhost:5000/api/properties/6708f12b3f1a9e4c8b2d5c01" \
  -H "Content-Type: application/json"
```

#### **Con PowerShell:**

```powershell
$propertyId = "6708f12b3f1a9e4c8b2d5c01"
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/properties/$propertyId" `
  -Method Delete `
  -ContentType "application/json"

$response | ConvertTo-Json -Depth 10
```

#### **Respuesta Esperada:**

```json
{
  "success": true,
  "message": "Propiedad eliminada exitosamente"
}
```

---

### 6. POST - Filtrar Propiedades

#### **Con Swagger:**

1. Swagger → Properties → POST /api/properties/filter
2. "Try it out"
3. En Body (JSON), pega uno de estos ejemplos:

**Filtro por Rango de Precio:**

```json
{
  "minPrice": 100000,
  "maxPrice": 300000
}
```

**Filtro por Nombre:**

```json
{
  "name": "casa"
}
```

**Filtro por Dirección:**

```json
{
  "address": "madrid"
}
```

4. "Execute"

#### **Con Postman:**

```
Method: POST
URL: http://localhost:5000/api/properties/filter
Headers:
  Content-Type: application/json
Body (JSON - Filtro Precio):
{
  "minPrice": 100000,
  "maxPrice": 300000
}
```

#### **Con cURL - Filtro de Precio:**

```bash
curl -X POST "http://localhost:5000/api/properties/filter" \
  -H "Content-Type: application/json" \
  -d "{
    \"minPrice\": 100000,
    \"maxPrice\": 300000
  }"
```

#### **Con cURL - Filtro de Nombre:**

```bash
curl -X POST "http://localhost:5000/api/properties/filter" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"casa\"
  }"
```

#### **Con PowerShell:**

```powershell
$body = @{
    minPrice = 100000
    maxPrice = 300000
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/properties/filter" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body

$response | ConvertTo-Json -Depth 10
```

#### **Respuesta Esperada:**

```json
{
  "success": true,
  "message": "Propiedades filtradas exitosamente",
  "data": [
    {
      "id": "6708f12b3f1a9e4c8b2d5c01",
      "idOwner": "507f1f77bcf86cd799439010",
      "name": "Casa Moderna en Avenida Principal",
      "address": "Avenida Principal 123, Piso 1, Madrid 28001",
      "price": 250000,
      "image": "https://example.com/properties/casa-moderna.jpg",
      "createdAt": "2025-10-01T10:00:00Z",
      "updatedAt": "2025-10-15T10:00:00Z"
    }
  ]
}
```

---

## ✅ Respuestas Esperadas

### Respuesta Exitosa (200 OK)

```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": {
    /* datos */
  }
}
```

### Respuesta No Encontrada (404)

```json
{
  "success": false,
  "message": "Propiedad no encontrada"
}
```

### Respuesta Datos Inválidos (400)

```json
{
  "success": false,
  "message": "Datos inválidos"
}
```

### Respuesta Error Interno (500)

```json
{
  "success": false,
  "message": "Error interno del servidor: [detalles]"
}
```

---

## 🆘 Troubleshooting

### Error: "No se puede conectar a localhost:5000"

```
❌ CAUSA: API no está ejecutándose

✅ SOLUCIÓN:
Terminal 1: cd RealStateAPI
Terminal 1: dotnet run

Espera a ver:
"Now listening on: http://localhost:5000"
```

---

### Error: "MongoConnectionException"

```
❌ CAUSA: MongoDB no está ejecutándose

✅ SOLUCIÓN:
# Windows
Services → MongoDB Community Server → Start

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

Verifica:
mongosh
use RealStateDB
db.properties.countDocuments()  # Debe mostrar: 8
```

---

### Error: "Propiedad no encontrada" (404)

```
❌ CAUSA: ID de propiedad inválido

✅ SOLUCIÓN:
1. Obtén un ID válido:
   GET http://localhost:5000/api/properties

2. Copia el "id" de una propiedad
   (ej: "6708f12b3f1a9e4c8b2d5c01")

3. Úsalo en tu solicitud:
   GET http://localhost:5000/api/properties/6708f12b3f1a9e4c8b2d5c01
```

---

### Error: "Datos inválidos" (400)

```
❌ CAUSA: JSON incorrecto o falta campo

✅ SOLUCIÓN:
Verifica que tu JSON tenga:
✓ "idOwner": string (requerido)
✓ "name": string 3-255 caracteres (requerido)
✓ "address": string 5-500 caracteres (requerido)
✓ "price": número >= 0 (requerido)
✓ "image": URL válida (requerido)

EJEMPLO VÁLIDO:
{
  "idOwner": "507f1f77bcf86cd799439010",
  "name": "Casa Moderna",
  "address": "Calle Principal 123",
  "price": 250000,
  "image": "https://example.com/casa.jpg"
}
```

---

### Error: "API responde pero sin datos"

```
❌ CAUSA: MongoDB conecta pero sin datos

✅ SOLUCIÓN:
1. Verifica datos en MongoDB:
   mongosh
   use RealStateDB
   db.properties.find().pretty()

2. Si está vacía, ejecuta script:
   mongosh --file mongodb-init.js

3. Verifica nuevamente:
   db.properties.countDocuments()  # Debe mostrar: 8
```

---

### Error: "404 Not Found" en Swagger

```
❌ CAUSA: API no está configurada para Swagger

✅ SOLUCIÓN:
Verifica que en Program.cs haya:

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

...

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

---

## 📊 Tabla de Referencia Rápida

| Método | URL                      | Descripción   |
| ------ | ------------------------ | ------------- |
| GET    | `/api/properties`        | Obtener todas |
| GET    | `/api/properties/{id}`   | Por ID        |
| POST   | `/api/properties`        | Crear         |
| PUT    | `/api/properties/{id}`   | Actualizar    |
| DELETE | `/api/properties/{id}`   | Eliminar      |
| POST   | `/api/properties/filter` | Filtrar       |

---

## 🎯 Flujo de Prueba Recomendado

```
1. VERIFICAR SETUP
   ✓ MongoDB ejecutándose
   ✓ API ejecutándose
   ✓ Swagger accesible

2. PROBAR GET
   ✓ GET /api/properties
   ✓ Deben mostrarse 8 propiedades

3. PROBAR POST
   ✓ POST /api/properties (crear nueva)
   ✓ Cuenta debe aumentar a 9

4. PROBAR GET POR ID
   ✓ Usa el ID de la creada
   ✓ GET /api/properties/{id}

5. PROBAR PUT
   ✓ PUT /api/properties/{id}
   ✓ Actualiza la propiedad

6. PROBAR DELETE
   ✓ DELETE /api/properties/{id}
   ✓ Cuenta vuelve a 8

7. PROBAR FILTROS
   ✓ POST /api/properties/filter
   ✓ Prueba con diferentes filtros

✅ SI TODO FUNCIONA: ¡Tu API está lista!
```

---

## 🚀 Próximos Pasos

1. **Ahora:** Prueba los endpoints
2. **Cuando funcionen:** Agrega autenticación
3. **Luego:** Valida datos más estrictamente
4. **Producción:** Deploy a Azure/AWS

---

**Última actualización:** 18 de octubre de 2025  
**Estado:** ✅ Listo para pruebas  
**Versión API:** 1.0
