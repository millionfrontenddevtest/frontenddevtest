# Real Estate API

Sistema completo para gestión de propiedades inmobiliarias con **Backend .NET 8 + MongoDB Atlas** y **Frontend React + TypeScript**. API REST con arquitectura limpia, filtrado avanzado, sistema de archivos y documentación Swagger.

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **.NET 8 SDK** - [Descargar aquí](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- **Node.js 18+** y **npm** - [Descargar aquí](https://nodejs.org/)
- **Git** - [Descargar aquí](https://git-scm.com/downloads)

> **Nota**: No necesitas instalar MongoDB ni crear una cuenta. El proyecto ya está configurado con MongoDB Atlas en la nube.

### Verificar Instalación

```bash
dotnet --version  # Debe mostrar 8.0 o superior
node --version    # Debe mostrar v18 o superior
npm --version
```

## 🚀 Instalación desde GitHub

### 1. Clonar el Repositorio

```bash
git clone https://github.com/millionfrontenddevtest/frontenddevtest.git
cd frontenddevtest
```

### 2. Configuración de MongoDB Atlas

✅ **La base de datos ya está configurada y lista para usar**. El proyecto incluye una conexión preconfigurada a MongoDB Atlas, por lo que no necesitas crear ninguna cuenta ni realizar configuraciones adicionales.

La configuración se encuentra en `backend/appsettings.Development.json` y ya está lista para funcionar.

### 3. Instalar y Ejecutar el Backend

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

El backend estará disponible en: `http://localhost:5298`

Accede a la documentación Swagger: `http://localhost:5298/swagger`

### 4. Instalar y Ejecutar el Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

### 5. (Opcional) Insertar Datos de Prueba

Si la base de datos está vacía, puedes insertar propiedades de prueba usando el script proporcionado:

```bash
cd backend
powershell -ExecutionPolicy Bypass -File insert-properties.ps1
```

## 🧪 Ejecutar Pruebas

### Backend (.NET)

````bash
cd backend
dotnet test
```

### Frontend (React + Jest)

```bash
cd frontend
npm test
```

## 📚 Documentación API

Una vez que el backend esté ejecutándose, puedes acceder a la documentación interactiva de Swagger en:

```
http://localhost:5298/swagger
```

Desde ahí podrás:
- Ver todos los endpoints disponibles
- Probar las peticiones directamente
- Ver los modelos de datos y respuestas

### 📸 Formato de Imágenes

**Importante**: Las imágenes de las propiedades se almacenan en formato **Base64** en la base de datos, no como URLs o rutas de archivo.

Cuando crees o actualices una propiedad, el campo `image` debe contener una cadena base64:

```json
{
  "idOwner": "507f1f77bcf86cd799439010",
  "name": "Casa Moderna",
  "address": "Calle Principal 123",
  "price": 350000,
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCE..."
}
```

El formato debe ser: `data:image/[tipo];base64,[datos-base64]` donde `[tipo]` puede ser `jpeg`, `png`, `gif`, etc.

## 🏗️ Estructura del Proyecto

```
realState/
├── backend/                        # API REST .NET 8
│   ├── Controllers/                # Endpoints REST
│   ├── Services/                   # Lógica de negocio
│   ├── Repositories/               # Acceso a datos MongoDB
│   ├── Models/                     # Entidades de dominio
│   ├── DTOs/                       # Data Transfer Objects
│   ├── Configuration/              # Configuración
│   ├── Middleware/                 # Middleware personalizado
│   ├── Tests/                      # Pruebas unitarias
│   └── appsettings.json           # Configuración de la aplicación
│
└── frontend/                       # Aplicación React + TypeScript
    ├── src/
    │   ├── components/             # Componentes React
    │   ├── services/               # Servicios API
    │   ├── hooks/                  # Custom Hooks
    │   ├── types/                  # Tipos TypeScript
    │   └── utils/                  # Utilidades
    └── package.json

```

## 🛠️ Tecnologías Utilizadas

### Backend
- .NET 8
- ASP.NET Core Web API
- MongoDB Driver
- Swagger/OpenAPI
- NUnit + Moq (Testing)

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Jest (Testing)

## 📝 Scripts Útiles

### Backend

```bash
dotnet run                  # Ejecutar en modo desarrollo
dotnet build               # Compilar el proyecto
dotnet test                # Ejecutar pruebas
dotnet watch run           # Ejecutar con hot-reload
```

### Frontend

```bash
npm run dev                # Servidor de desarrollo
npm run build              # Compilar para producción
npm run test               # Ejecutar pruebas
npm run lint               # Verificar código
```

## 🔧 Solución de Problemas

### El backend no se conecta a MongoDB Atlas

1. **Verifica tu connection string**: Asegúrate de que el usuario, contraseña y nombre del cluster sean correctos en `appsettings.Development.json`
2. **Verifica el acceso de red**: En MongoDB Atlas → Network Access, verifica que tu IP esté en la lista blanca
3. **Verifica las credenciales**: En MongoDB Atlas → Database Access, asegúrate de que el usuario tenga permisos de lectura/escritura
4. **Revisa el nombre de la base de datos**: Debe ser exactamente `RealStateDB` con la colección `Properties`

### Error de puertos ocupados

Si los puertos están en uso, puedes cambiarlos:

**Backend**: Edita `backend/Properties/launchSettings.json`
**Frontend**: Edita `frontend/vite.config.ts`

### Dependencias no instaladas

```bash
# Backend
cd backend
dotnet restore

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```
````
