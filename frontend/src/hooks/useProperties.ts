import { useState, useEffect, useCallback } from "react";
import { propertyService } from "../services/propertyService";
import type {
  Property,
  PropertyFilter,
  LoadingState,
} from "../types/property.types";

/**
 * Custom hook for managing property data and filtering
 */
export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PropertyFilter>({});

  /**
   * Fetch all properties on mount
   */
  useEffect(() => {
    const fetchProperties = async () => {
      setLoadingState("loading");
      setError(null);

      try {
        const data = await propertyService.getAllProperties();
        setProperties(data);
        setFilteredProperties(data);
        setLoadingState("succeeded");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch properties"
        );
        setLoadingState("failed");
      }
    };

    fetchProperties();
  }, []);

  /**
   * Apply filters to properties
   */
  const applyFilters = useCallback(async (newFilters: PropertyFilter) => {
    setFilters(newFilters);
    setLoadingState("loading");
    setError(null);

    try {
      const filtered = await propertyService.filterProperties(newFilters);
      setFilteredProperties(filtered);
      setLoadingState("succeeded");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to filter properties"
      );
      setLoadingState("failed");
    }
  }, []);

  /**
   * Reset filters
   */
  const resetFilters = useCallback(() => {
    setFilters({});
    setFilteredProperties(properties);
    setLoadingState("succeeded");
  }, [properties]);

  /**
   * Refetch properties
   */
  const refetch = useCallback(async () => {
    setLoadingState("loading");
    setError(null);

    try {
      const data = await propertyService.getAllProperties();
      setProperties(data);
      setFilteredProperties(data);
      setLoadingState("succeeded");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch properties"
      );
      setLoadingState("failed");
    }
  }, []);

  return {
    properties: filteredProperties,
    allProperties: properties,
    loadingState,
    error,
    filters,
    applyFilters,
    resetFilters,
    refetch,
    isLoading: loadingState === "loading",
    isError: loadingState === "failed",
    isSuccess: loadingState === "succeeded",
  };
};
