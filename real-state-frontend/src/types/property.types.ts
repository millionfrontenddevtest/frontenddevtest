/**
 * Property interface matching the backend API response
 */
export interface Property {
  id?: string;
  idOwner: string;
  name: string;
  address: string;
  price: number;
  image?: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

/**
 * Filter criteria for properties
 */
export interface PropertyFilter {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * Loading state type
 */
export type LoadingState = "idle" | "loading" | "succeeded" | "failed";
