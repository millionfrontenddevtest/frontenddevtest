import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";
import { API_CONFIG } from "../config/api.config";
import type {
  Property,
  ApiResponse,
  PropertyFilter,
} from "../types/property.types";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode?: number;
  errors?: string[];

  constructor(message: string, statusCode?: number, errors?: string[]) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

/**
 * Property Service - Handles all API calls related to properties
 */
class PropertyService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response: any) => response,
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Handle API errors
   */
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      const data = error.response.data as ApiResponse<unknown>;
      return new ApiError(
        data.message || "An error occurred",
        error.response.status,
        data.errors
      );
    } else if (error.request) {
      return new ApiError(
        "No response from server. Please check your connection.",
        0
      );
    } else {
      return new ApiError(error.message || "An unexpected error occurred");
    }
  }

  /**
   * Get all properties
   */
  async getAllProperties(): Promise<Property[]> {
    const response = await this.axiosInstance.get<ApiResponse<Property[]>>(
      API_CONFIG.ENDPOINTS.PROPERTIES
    );
    return response.data.data;
  }

  /**
   * Get a single property by ID
   */
  async getPropertyById(id: string): Promise<Property> {
    const response = await this.axiosInstance.get<ApiResponse<Property>>(
      API_CONFIG.ENDPOINTS.PROPERTY_BY_ID(id)
    );
    return response.data.data;
  }

  /**
   * Filter properties (client-side filtering)
   */
  async filterProperties(filters: PropertyFilter): Promise<Property[]> {
    const allProperties = await this.getAllProperties();

    return allProperties.filter((property) => {
      const matchesName =
        !filters.name ||
        property.name.toLowerCase().includes(filters.name.toLowerCase());

      const matchesAddress =
        !filters.address ||
        property.address.toLowerCase().includes(filters.address.toLowerCase());

      const matchesMinPrice =
        !filters.minPrice || property.price >= filters.minPrice;

      const matchesMaxPrice =
        !filters.maxPrice || property.price <= filters.maxPrice;

      return (
        matchesName && matchesAddress && matchesMinPrice && matchesMaxPrice
      );
    });
  }
}

// Export singleton instance
export const propertyService = new PropertyService();
