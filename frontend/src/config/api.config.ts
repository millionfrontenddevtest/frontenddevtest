/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5298",
  TIMEOUT: 10000,
  ENDPOINTS: {
    PROPERTIES: "/api/properties",
    PROPERTY_BY_ID: (id: string) => `/api/properties/${id}`,
    FILTER_PROPERTIES: "/api/properties/filter",
  },
};
