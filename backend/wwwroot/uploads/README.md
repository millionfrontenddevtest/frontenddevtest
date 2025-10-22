# Carpeta de Uploads

Esta carpeta contiene las imágenes subidas por los usuarios.

## Estructura

```
uploads/
├── properties/     # Imágenes de propiedades
└── owners/         # Fotos de propietarios
```

## Notas

- Los archivos subidos NO se incluyen en el control de versiones (Git)
- Extensiones permitidas: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Tamaño máximo por archivo: 5 MB
- Las carpetas se crean automáticamente al iniciar la aplicación

## Acceso a las imágenes

Las imágenes son accesibles públicamente a través de:

```
http://localhost:5000/uploads/properties/{nombre-archivo}.jpg
http://localhost:5000/uploads/owners/{nombre-archivo}.jpg
```

## API Endpoints

- **POST** `/api/files/upload/property` - Subir imagen de propiedad
- **POST** `/api/files/upload/owner` - Subir foto de propietario
- **POST** `/api/files/upload/property/multiple` - Subir múltiples imágenes
- **DELETE** `/api/files/delete?filePath=/uploads/...` - Eliminar archivo
