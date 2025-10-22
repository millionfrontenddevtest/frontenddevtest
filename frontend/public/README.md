# 🏠 Imágenes de Propiedades

Esta carpeta contiene las imágenes de las propiedades de ejemplo para la aplicación Real Estate.

## 📸 Imágenes Disponibles

### 1. Casa Moderna Miami

**Archivo:** `Casa_Moderna_Miami.jpg`  
**Descripción:** Casa moderna en Miami Beach, Florida  
**Precio:** $850,000  
**Ubicación:** 123 Ocean Drive, Miami Beach, FL 33139

### 2. Chalet Histórico Jacksonville

**Archivo:** `Chalet_Historico_Jacksonville.jpg`  
**Descripción:** Chalet histórico en Jacksonville  
**Precio:** $625,000  
**Ubicación:** 456 Riverside Avenue, Jacksonville, FL 32202

### 3. Loft Industrial Naples

**Archivo:** `Loft_Industrial_Naples.jpg`  
**Descripción:** Loft de estilo industrial en Naples  
**Precio:** $475,000  
**Ubicación:** 789 Fifth Avenue S, Naples, FL 34102

### 4. Villa Moderna Tampa

**Archivo:** `Villa_Moderna_Tampa.jpg`  
**Descripción:** Villa moderna de lujo en Tampa  
**Precio:** $1,250,000  
**Ubicación:** 321 Bayshore Boulevard, Tampa, FL 33606

## 🎨 Cómo Usar

### En Componentes React

```tsx
// Referencia directa desde public/
<img src="/Casa_Moderna_Miami.jpg" alt="Casa Moderna Miami" />;

// Con datos dinámicos
const property = {
  name: "Casa Moderna Miami",
  image: "/Casa_Moderna_Miami.jpg",
};

<img
  src={property.image}
  alt={property.name}
  className="w-full h-64 object-cover"
/>;
```

### En mockData.ts

```typescript
export const mockProperties: Property[] = [
  {
    id: "1",
    name: "Casa Moderna Miami",
    image: "/Casa_Moderna_Miami.jpg",
    // ... otros campos
  },
];
```

## 📁 Estructura

```
public/
├── Casa_Moderna_Miami.jpg
├── Chalet_Historico_Jacksonville.jpg
├── Loft_Industrial_Naples.jpg
├── Villa_Moderna_Tampa.jpg
└── vite.svg
```

## ✨ Características

- ✅ **Optimizadas:** Imágenes listas para web
- ✅ **Alta calidad:** Resolución adecuada para mostrar detalles
- ✅ **Nombres descriptivos:** Fácil identificación
- ✅ **Acceso directo:** Servidas desde la carpeta `public/`

## 🔄 Actualizar Imágenes

Para agregar nuevas imágenes:

1. Copia la imagen a la carpeta `public/`
2. Actualiza `mockData.ts` con la nueva ruta
3. Reinicia el servidor de desarrollo si es necesario

## 🌐 URLs de Acceso

En desarrollo local:

```
http://localhost:5173/Casa_Moderna_Miami.jpg
http://localhost:5173/Chalet_Historico_Jacksonville.jpg
http://localhost:5173/Loft_Industrial_Naples.jpg
http://localhost:5173/Villa_Moderna_Tampa.jpg
```

## 📝 Notas

- Las imágenes en `public/` se sirven directamente sin procesamiento
- No necesitan importarse en los componentes
- Usa rutas absolutas que comienzan con `/`
- Vite las optimiza automáticamente en producción
