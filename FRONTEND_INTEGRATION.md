# Integración con React/Next.js

Guía para integrar esta API REST con un frontend en React o Next.js.

## 📌 Configuración Preliminar

### CORS (Cross-Origin Resource Sharing)

La API ya tiene CORS configurado para aceptar solicitudes desde cualquier origen (AllowAll). Para producción, edita `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:3000", "https://miapp.com")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

## 🔌 Cliente HTTP para React

### Opción 1: Fetch API (Nativo)

```typescript
// src/services/propertyService.ts

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://localhost:5001/api/properties";

export interface PropertyDto {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

// Obtener todas las propiedades
export const getAllProperties = async (): Promise<PropertyDto[]> => {
  const response = await fetch(`${API_BASE_URL}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) throw new Error("Error al obtener propiedades");

  const result: ApiResponse<PropertyDto[]> = await response.json();
  return result.data || [];
};

// Obtener propiedad por ID
export const getPropertyById = async (
  id: string
): Promise<PropertyDto | null> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) return null;

  const result: ApiResponse<PropertyDto> = await response.json();
  return result.data || null;
};

// Filtrar propiedades
export const filterProperties = async (
  name?: string,
  address?: string,
  minPrice?: number,
  maxPrice?: number
): Promise<PropertyDto[]> => {
  const params = new URLSearchParams();
  if (name) params.append("name", name);
  if (address) params.append("address", address);
  if (minPrice) params.append("minPrice", minPrice.toString());
  if (maxPrice) params.append("maxPrice", maxPrice.toString());

  const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) throw new Error("Error al filtrar propiedades");

  const result: ApiResponse<PropertyDto[]> = await response.json();
  return result.data || [];
};
```

### Opción 2: Axios

```typescript
// src/services/propertyService.ts

import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "https://localhost:5001/api/properties",
  headers: { "Content-Type": "application/json" },
});

export interface PropertyDto {
  id: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image?: string;
}

// Obtener todas las propiedades
export const getAllProperties = async (): Promise<PropertyDto[]> => {
  const { data } = await API.get("");
  return data.data || [];
};

// Filtrar propiedades
export const filterProperties = async (
  name?: string,
  address?: string,
  minPrice?: number,
  maxPrice?: number
): Promise<PropertyDto[]> => {
  const { data } = await API.get("/search", {
    params: { name, address, minPrice, maxPrice },
  });
  return data.data || [];
};

// Obtener por ID
export const getPropertyById = async (
  id: string
): Promise<PropertyDto | null> => {
  try {
    const { data } = await API.get(`/${id}`);
    return data.data || null;
  } catch (error) {
    return null;
  }
};
```

## ⚛️ Componentes React

### Componente de Lista de Propiedades

```typescript
// src/components/PropertyList.tsx

import React, { useEffect, useState } from "react";
import { getAllProperties, PropertyDto } from "../services/propertyService";

export const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<PropertyDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (err) {
        setError("Error al cargar propiedades");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="properties-grid">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          {property.image && <img src={property.image} alt={property.name} />}
          <h3>{property.name}</h3>
          <p>{property.address}</p>
          <p className="price">${property.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};
```

### Componente de Búsqueda/Filtro

```typescript
// src/components/PropertyFilter.tsx

import React, { useState } from "react";
import { filterProperties, PropertyDto } from "../services/propertyService";

interface PropertyFilterProps {
  onResults: (properties: PropertyDto[]) => void;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  onResults,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const results = await filterProperties(
        name || undefined,
        address || undefined,
        minPrice ? Number(minPrice) : undefined,
        maxPrice ? Number(maxPrice) : undefined
      );
      onResults(results);
    } catch (error) {
      console.error("Error al filtrar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="filter-form">
      <input
        type="text"
        placeholder="Nombre de la propiedad"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Dirección"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio mínimo"
        value={minPrice}
        onChange={(e) =>
          setMinPrice(e.target.value ? Number(e.target.value) : "")
        }
      />

      <input
        type="number"
        placeholder="Precio máximo"
        value={maxPrice}
        onChange={(e) =>
          setMaxPrice(e.target.value ? Number(e.target.value) : "")
        }
      />

      <button type="submit" disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
};
```

### Página Principal

```typescript
// src/pages/PropertiesPage.tsx

import React, { useState } from "react";
import { PropertyFilter } from "../components/PropertyFilter";
import { PropertyList } from "../components/PropertyList";
import { PropertyDto } from "../services/propertyService";

export const PropertiesPage: React.FC = () => {
  const [filteredProperties, setFilteredProperties] = useState<
    PropertyDto[] | null
  >(null);

  return (
    <div className="properties-page">
      <h1>Propiedades Inmobiliarias</h1>

      <PropertyFilter onResults={setFilteredProperties} />

      {filteredProperties !== null ? (
        <div className="filtered-results">
          <h2>Resultados ({filteredProperties.length})</h2>
          {/* Mostrar propiedades filtradas */}
          {filteredProperties.map((property) => (
            <div key={property.id} className="property-item">
              <h3>{property.name}</h3>
              <p>{property.address}</p>
              <p>${property.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <PropertyList />
      )}
    </div>
  );
};
```

## 🎯 Next.js Server Side

### API Routes en Next.js

```typescript
// pages/api/properties.ts

import { NextApiRequest, NextApiResponse } from "next";

const API_BASE = "https://localhost:5001/api/properties";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search, minPrice, maxPrice } = req.query;

  try {
    let url = `${API_BASE}`;

    if (search || minPrice || maxPrice) {
      const params = new URLSearchParams();
      if (search) params.append("name", String(search));
      if (minPrice) params.append("minPrice", String(minPrice));
      if (maxPrice) params.append("maxPrice", String(maxPrice));
      url = `${API_BASE}/search?${params.toString()}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
}
```

## 🔐 Manejo de Certificados SSL

Para desarrollo local con HTTPS:

### React

```typescript
// Desabilitar verificación SSL (solo desarrollo)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
```

### Next.js

```bash
# Agregar a .env.local
NEXT_PUBLIC_API_URL=https://localhost:5001
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## 📦 Instalación de Dependencias

```bash
# React con Fetch API (sin dependencias adicionales)
npm create react-app real-state-frontend

# Con Axios
npm install axios

# Con TypeScript
npm install typescript @types/react @types/node
```

## 🧪 Pruebas

### Test con Jest + React Testing Library

```typescript
// src/__tests__/PropertyFilter.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyFilter } from "../components/PropertyFilter";

describe("PropertyFilter", () => {
  it("renders input fields", () => {
    render(<PropertyFilter onResults={jest.fn()} />);

    expect(
      screen.getByPlaceholderText("Nombre de la propiedad")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Dirección")).toBeInTheDocument();
  });

  it("calls onResults with filtered data", async () => {
    const mockOnResults = jest.fn();
    render(<PropertyFilter onResults={mockOnResults} />);

    const button = screen.getByText("Buscar");
    fireEvent.click(button);

    // Esperar llamada a API y verificar que se llamó onResults
    await screen.findByText(/buscando/i);
  });
});
```

## 📊 Variables de Entorno

### `.env` para React

```env
REACT_APP_API_URL=https://localhost:5001/api/properties
REACT_APP_ENVIRONMENT=development
```

### `.env.local` para Next.js

```env
NEXT_PUBLIC_API_URL=https://localhost:5001/api/properties
API_SECRET_KEY=your_secret_key
```

## 🚀 Deploy

### Frontend en Vercel (Next.js)

```bash
vercel deploy
```

### Frontend en Netlify (React)

```bash
npm run build
netlify deploy --prod --dir=build
```

## 🔄 Manejo de Estados Avanzado

### Usando Redux

```typescript
// slices/propertiesSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PropertyDto } from "../services/propertyService";

export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async () => {
    const response = await fetch("https://localhost:5001/api/properties");
    const result = await response.json();
    return result.data as PropertyDto[];
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    items: [] as PropertyDto[],
    loading: false,
    error: null as string | null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export default propertiesSlice.reducer;
```

## 📚 Recursos Útiles

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript in React](https://www.typescriptlang.org/docs/handbook/react.html)
- [Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [Axios Documentation](https://axios-http.com/)

---

**Última actualización:** 18 de Octubre de 2024
