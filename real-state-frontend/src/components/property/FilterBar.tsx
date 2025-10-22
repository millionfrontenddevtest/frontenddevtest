import React, { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import type { PropertyFilter } from "../../types/property.types";

interface FilterBarProps {
  onFilterChange: (filters: PropertyFilter) => void;
  onReset: () => void;
}

/**
 * FilterBar component for filtering properties
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  onReset,
}) => {
  const [filters, setFilters] = useState<PropertyFilter>({
    name: "",
    address: "",
    minPrice: undefined,
    maxPrice: undefined,
  });

  const handleInputChange = (field: keyof PropertyFilter, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePriceChange = (field: "minPrice" | "maxPrice", value: string) => {
    const numValue = value === "" ? undefined : Number(value);
    setFilters((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean up empty string values
    const cleanedFilters: PropertyFilter = {
      name: filters.name || undefined,
      address: filters.address || undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    };

    onFilterChange(cleanedFilters);
  };

  const handleReset = () => {
    setFilters({
      name: "",
      address: "",
      minPrice: undefined,
      maxPrice: undefined,
    });
    onReset();
  };

  return (
    <div className="bg-white p-8 shadow-subtle mb-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-luxury-charcoal mb-1">
            Refine Your Search
          </h2>
          <p className="text-xs text-gray-400 tracking-wide uppercase">
            Filter by your preferences
          </p>
        </div>
        <div className="w-10 h-10 bg-luxury-champagne flex items-center justify-center">
          <svg
            className="w-5 h-5 text-luxury-gold"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Name and Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Property Name"
            type="text"
            placeholder="Search by name..."
            value={filters.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <Input
            label="Address"
            type="text"
            placeholder="Search by address..."
            value={filters.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>

        {/* Row 2: Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Min Price"
            type="number"
            placeholder="0"
            min="0"
            value={filters.minPrice?.toString() || ""}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
          />
          <Input
            label="Max Price"
            type="number"
            placeholder="1000000"
            min="0"
            value={filters.maxPrice?.toString() || ""}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-gray-100">
          <Button type="submit" variant="primary" className="flex-1">
            Apply Filters
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="min-w-[120px]"
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};
