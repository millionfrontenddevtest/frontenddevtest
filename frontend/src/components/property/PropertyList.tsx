import React, { useState } from "react";
import { PropertyCard } from "./PropertyCard";
import { PropertyDetail } from "./PropertyDetail";
import { Loader } from "../common/Loader";
import type { Property } from "../../types/property.types";

interface PropertyListProps {
  properties: Property[];
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

/**
 * PropertyList component to display all properties
 */
export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  isLoading,
  isError,
  error,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  if (isLoading) {
    return <Loader size="large" text="Loading properties..." />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white border border-gray-100">
        <svg
          className="w-16 h-16 text-red-400 mb-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 className="text-2xl font-serif font-semibold text-luxury-charcoal mb-2">
          Unable to Load Properties
        </h3>
        <p className="text-gray-500 text-center text-sm">{error}</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white border border-gray-100">
        <svg
          className="w-20 h-20 text-gray-300 mb-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 className="text-2xl font-serif font-semibold text-luxury-charcoal mb-2">
          No Properties Available
        </h3>
        <p className="text-gray-400 text-center text-sm tracking-wide uppercase">
          Please refine your search criteria
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={handlePropertyClick}
          />
        ))}
      </div>

      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
