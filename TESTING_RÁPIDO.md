# 🧪 Guía Rápida - Probar los Endpoints

## ⚡ 3 Pasos para Empezar (5 minutos)

### Paso 1: Inicia MongoDB

```bash
# Windows
Services → MongoDB Community Server → Start

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Paso 2: Inicia la API

```bash
cd c:\Users\jose_\OneDrive\Desktop\realState\RealStateAPI
dotnet run
```

Espera a ver:

```
Now listening on: http://localhost:5000
Now listening on: https://localhost:5001
```

### Paso 3: Abre Swagger

```
http://localhost:5000/swagger/index.html
```

✅ **¡Listo!** Ahora puedes probar los endpoints.

---

## 📚 3 Formas de Probar

### 1️⃣ Swagger UI (MÁS FÁCIL)

```
http://localhost:5000/swagger/index.html
```

- ✅ No necesita instalación
- ✅ Interfaz visual bonita
- ✅ Documentación automática

**Cómo usar:**

1. Haz clic en un endpoint
2. Click "Try it out"
3. Completa los datos
4. Click "Execute"
5. Ver respuesta

---

### 2️⃣ Postman (RECOMENDADO)

```
https://www.postman.com/downloads/
```

**Pasos:**

1. Descarga Postman
2. Abre archivo: `Postman_Collection.json`
3. Click en requests
4. Click "Send"

**Ventajas:**

- ✅ Más poderoso
- ✅ Guarda historial
- ✅ Variables reutilizables

---

### 3️⃣ PowerShell (AUTOMATIZADO)

```bash
powershell -ExecutionPolicy Bypass -File test-api.ps1
```

**Qué hace:**

- ✅ Prueba todos los endpoints
- ✅ Crea propiedades de test
- ✅ Muestra resultados
- ✅ Genera reporte

---

## 🎯 6 Endpoints Disponibles

### 1. GET - Obtener Todas

```bash
# Swagger: GET /api/properties → Try it out
# cURL
curl "http://localhost:5000/api/properties"

# Respuesta
{
  "success": true,
  "message": "Propiedades obtenidas exitosamente",
  "data": [ ... ]  # Array con todas las propiedades
}
```

---

### 2. GET - Por ID

```bash
# cURL (reemplaza {id} con un ID real)
curl "http://localhost:5000/api/properties/{id}"

# Ejemplo con ID real
curl "http://localhost:5000/api/properties/6708f12b3f1a9e4c8b2d5c01"

# Respuesta
{
  "success": true,
  "data": { ... }  # Una propiedad específica
}
```

---

### 3. POST - Crear

```bash
# cURL
curl -X POST "http://localhost:5000/api/properties" \
  -H "Content-Type: application/json" \
  -d '{
    "idOwner": "507f1f77bcf86cd799439020",
    "name": "Nueva Casa",
    "address": "Calle Nueva 123",
    "price": 180000,
    "image": "https://example.com/casa.jpg"
  }'

# Respuesta
{
  "success": true,
  "data": { ... }  # Propiedad creada con ID
}
```

---

### 4. PUT - Actualizar

```bash
# cURL
curl -X PUT "http://localhost:5000/api/properties/{id}" \
  -H "Content-Type: application/json" \
  -d '{
    "idOwner": "507f1f77bcf86cd799439010",
    "name": "Casa Actualizada",
    "address": "Calle Actualizada 456",
    "price": 260000,
    "image": "https://example.com/updated.jpg"
  }'

# Respuesta
{
  "success": true,
  "message": "Propiedad actualizada exitosamente"
}
```

---

### 5. DELETE - Eliminar

```bash
# cURL
curl -X DELETE "http://localhost:5000/api/properties/{id}"

# Respuesta
{
  "success": true,
  "message": "Propiedad eliminada exitosamente"
}
```

---

### 6. POST - Filtrar

**Filtro por Precio:**

```bash
curl -X POST "http://localhost:5000/api/properties/filter" \
  -H "Content-Type: application/json" \
  -d '{
    "minPrice": 100000,
    "maxPrice": 300000
  }'
```

**Filtro por Nombre:**

```bash
curl -X POST "http://localhost:5000/api/properties/filter" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "casa"
  }'
```

**Filtro por Dirección:**

```bash
curl -X POST "http://localhost:5000/api/properties/filter" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "madrid"
  }'
```

---

## ✅ Checklist de Verificación

```
Antes de probar:
  ☐ MongoDB ejecutándose
  ☐ API ejecutándose (dotnet run)
  ☐ Swagger abierto en navegador

Pruebas básicas:
  ☐ GET /api/properties → Muestra 8 propiedades
  ☐ GET /api/properties/{id} → Muestra 1 propiedad
  ☐ POST /api/properties → Crea nueva
  ☐ PUT /api/properties/{id} → Actualiza
  ☐ DELETE /api/properties/{id} → Elimina
  ☐ POST /api/properties/filter → Filtra por precio

Si todo funciona:
  ☐ API completamente funcional
  ☐ Base de datos conectada
  ☐ CRUD completo trabajando
```

---

## 🆘 Troubleshooting Rápido

| Problema                   | Solución                                                |
| -------------------------- | ------------------------------------------------------- |
| "Connection refused"       | Inicia API: `dotnet run`                                |
| "MongoDB not found"        | Inicia MongoDB: `brew services start mongodb-community` |
| "404 Not Found" en Swagger | Espera a que API termine de iniciar                     |
| "Propiedad no encontrada"  | Usa un ID válido de GET /api/properties                 |
| "Datos inválidos" (400)    | Verifica JSON tenga todos los campos requeridos         |

---

## 📊 Resumen de Endpoints

| Método     | Endpoint                 | Descripción | Body |
| ---------- | ------------------------ | ----------- | ---- |
| **GET**    | `/api/properties`        | Todas       | ❌   |
| **GET**    | `/api/properties/{id}`   | Una         | ❌   |
| **POST**   | `/api/properties`        | Crear       | ✅   |
| **PUT**    | `/api/properties/{id}`   | Actualizar  | ✅   |
| **DELETE** | `/api/properties/{id}`   | Eliminar    | ❌   |
| **POST**   | `/api/properties/filter` | Filtrar     | ✅   |

---

## 🚀 Orden Recomendado de Pruebas

```
1. GET /api/properties
   ↓ Deben aparecer 8 propiedades

2. GET /api/properties/{id}
   ↓ Copia un ID del paso anterior

3. POST /api/properties (crear)
   ↓ Crea una nueva (total: 9)

4. GET /api/properties
   ↓ Verifica que ahora hay 9

5. PUT /api/properties/{id}
   ↓ Actualiza la que acabas de crear

6. POST /api/properties/filter
   ↓ Prueba filtros (precio, nombre, dirección)

7. DELETE /api/properties/{id}
   ↓ Elimina la que creaste (vuelve a 8)

✅ ¡TODO FUNCIONA!
```

---

## 📁 Archivos Incluidos para Pruebas

| Archivo                   | Uso                                  |
| ------------------------- | ------------------------------------ |
| `TESTING_ENDPOINTS.md`    | Guía completa con todos los ejemplos |
| `Postman_Collection.json` | Importar en Postman                  |
| `test-api.ps1`            | Script automático (PowerShell)       |
| `TESTING_RÁPIDO.md`       | Este archivo                         |

---

## 💡 Tips Útiles

### Tip 1: Consigue IDs Válidos

```bash
# GET todas las propiedades
curl "http://localhost:5000/api/properties"

# Copia el "id" de la respuesta
# Úsalo en GET por ID, PUT, DELETE
```

### Tip 2: Valida JSON

```bash
# Antes de hacer POST/PUT, valida JSON en:
# https://jsonlint.com/

# O usa un formateador:
# echo '{"key":"value"}' | jq
```

### Tip 3: Ver Headers

```bash
# Agrega -v a curl para ver headers
curl -v "http://localhost:5000/api/properties"
```

### Tip 4: Guarda Requests

```bash
# En Postman: Save request
# En cURL: Guarda en archivo .sh
# En PowerShell: Guarda scripts en .ps1
```

---

## 🎯 Próximos Pasos

1. ✅ Prueba todos los endpoints
2. ✅ Verifica que funcionan correctamente
3. ✅ Agrega autenticación (si lo necesitas)
4. ✅ Agrega validaciones más estrictas
5. ✅ Deploy a producción

---

**Última actualización:** 18 de octubre de 2025  
**Versión API:** 1.0  
**Estado:** ✅ Listo para probar

---

**¿Listo?** 👇

→ Abre Swagger: `http://localhost:5000/swagger/index.html`  
→ O usa Postman: Importa `Postman_Collection.json`  
→ O automatizado: `powershell -ExecutionPolicy Bypass -File test-api.ps1`
