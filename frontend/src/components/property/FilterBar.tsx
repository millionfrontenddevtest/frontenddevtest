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
    <div className="relative bg-white/90 backdrop-blur-md p-8 shadow-elevation-2 mb-10 border border-luxury-gold/20 rounded-xl overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-mist via-transparent to-luxury-champagne/20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-luxury-taupe via-luxury-darkGold to-luxury-gold bg-clip-text text-transparent mb-2">
            Refine Your Search
          </h2>
          <div className="flex items-center gap-2">
            <span className="inline-block w-8 h-px bg-gradient-to-r from-luxury-gold to-transparent"></span>
            <p className="text-xs text-gray-500 tracking-wider uppercase font-medium">
              Filter by your preferences
            </p>
          </div>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-luxury-gold to-luxury-darkGold rounded-lg flex items-center justify-center shadow-luxury">
          <svg
            className="w-6 h-6 text-white"
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
        <div className="relative flex gap-4 pt-6">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>
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
