# Sistema de Almacenamiento Local de Imágenes

## 📁 Estructura implementada

```
backend/
└── wwwroot/
    └── uploads/
        ├── properties/      # Imágenes de propiedades
        └── owners/          # Fotos de propietarios
```

## 🚀 Cómo usar

### 1. Subir una imagen de propiedad

**Endpoint:** `POST /api/files/upload/property`

**Ejemplo con cURL:**

```bash
curl -X POST http://localhost:5000/api/files/upload/property \
  -F "file=@/ruta/a/imagen.jpg"
```

**Ejemplo con JavaScript/Fetch:**

```javascript
const formData = new FormData();
formData.append("file", fileInput.files[0]);

const response = await fetch(
  "http://localhost:5000/api/files/upload/property",
  {
    method: "POST",
    body: formData,
  }
);

const result = await response.json();
console.log(result.filePath); // "/uploads/properties/abc123.jpg"
```

**Respuesta:**

```json
{
  "success": true,
  "filePath": "/uploads/properties/550e8400-e29b-41d4-a716-446655440000.jpg",
  "fileName": "550e8400-e29b-41d4-a716-446655440000.jpg",
  "message": "Imagen de propiedad subida exitosamente"
}
```

### 2. Subir múltiples imágenes

**Endpoint:** `POST /api/files/upload/property/multiple`

```javascript
const formData = new FormData();
for (let file of fileInput.files) {
  formData.append("files", file);
}

const response = await fetch(
  "http://localhost:5000/api/files/upload/property/multiple",
  {
    method: "POST",
    body: formData,
  }
);
```

### 3. Subir foto de propietario

**Endpoint:** `POST /api/files/upload/owner`

```bash
curl -X POST http://localhost:5000/api/files/upload/owner \
  -F "file=@/ruta/a/foto.jpg"
```

### 4. Eliminar un archivo

**Endpoint:** `DELETE /api/files/delete?filePath=/uploads/properties/abc123.jpg`

```javascript
const response = await fetch(
  "http://localhost:5000/api/files/delete?filePath=/uploads/properties/abc123.jpg",
  { method: "DELETE" }
);
```

## 🖼️ Acceder a las imágenes

Las imágenes se sirven como archivos estáticos:

```
http://localhost:5000/uploads/properties/550e8400-e29b-41d4-a716-446655440000.jpg
http://localhost:5000/uploads/owners/660e8400-e29b-41d4-a716-446655440001.jpg
```

En tu frontend (React):

```jsx
<img src={`http://localhost:5000${property.imagePath}`} alt={property.name} />
```

## 📋 Validaciones implementadas

✅ **Tamaño máximo:** 5 MB por archivo  
✅ **Extensiones permitidas:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`  
✅ **Nombres únicos:** Se genera un GUID para evitar colisiones  
✅ **Carpetas automáticas:** Se crean al iniciar la aplicación

## 🔧 Configuración

El servicio está configurado en `Program.cs`:

```csharp
// Servicio de almacenamiento
builder.Services.AddScoped<IFileStorageService, FileStorageService>();

// Archivos estáticos
app.UseStaticFiles();
```

## 📝 Modelo de datos recomendado

En tu modelo `Property`, guarda solo la **ruta relativa**:

```csharp
public class Property
{
    // ... otros campos

    [BsonElement("images")]
    public List<string> Images { get; set; } = new();
    // Ejemplo: ["/uploads/properties/abc123.jpg", "/uploads/properties/def456.jpg"]
}
```

Para `Owner`:

```csharp
public class Owner
{
    // ... otros campos

    [BsonElement("photo")]
    public string? Photo { get; set; }
    // Ejemplo: "/uploads/owners/xyz789.jpg"
}
```

## 🛡️ Seguridad

- ✅ Validación de tipos de archivo
- ✅ Validación de tamaño
- ✅ Nombres aleatorios (previene ataques de path traversal)
- ✅ Logging de todas las operaciones

## 🧪 Probar con Postman

1. Crea una nueva request `POST`
2. URL: `http://localhost:5000/api/files/upload/property`
3. Body → form-data
4. Key: `file` (tipo: File)
5. Value: Selecciona una imagen
6. Send

## 📦 Producción

Para producción, considera migrar a:

- **AWS S3**
- **Azure Blob Storage**
- **Cloudinary**
- **Google Cloud Storage**

El código está preparado para esta migración - solo cambia la implementación de `IFileStorageService`.
