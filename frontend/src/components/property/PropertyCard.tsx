import React from "react";
import { Card } from "../common/Card";
import type { Property } from "../../types/property.types";
import { formatPrice } from "../../utils/formatters";
import { formatBase64Image, PLACEHOLDER_IMAGE } from "../../utils/imageHelpers";

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

/**
 * PropertyCard component to display individual property
 */
export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onClick,
}) => {
  const handleClick = () => {
    onClick(property);
  };

  const imageUrl = formatBase64Image(property.image) || PLACEHOLDER_IMAGE;

  return (
    <Card hoverable onClick={handleClick}>
      {/* Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {property.image ? (
          <img
            src={imageUrl}
            alt={property.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER_IMAGE;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-luxury-champagne to-luxury-pearl">
            <svg
              className="w-16 h-16 text-luxury-gold opacity-40"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-4 pb-4 border-b border-gray-100">
          <span className="text-2xl font-serif font-semibold text-luxury-charcoal">
            {formatPrice(property.price)}
          </span>
        </div>

        <h3 className="text-xl font-serif font-semibold text-luxury-charcoal mb-3 truncate">
          {property.name}
        </h3>

        <div className="flex items-start text-gray-500 mb-6">
          <svg
            className="w-4 h-4 mr-2 mt-1 flex-shrink-0"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span className="text-xs tracking-wide line-clamp-2">
            {property.address}
          </span>
        </div>

        <button
          className="w-full px-6 py-3 bg-luxury-charcoal text-white hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-300 font-medium tracking-wide uppercase text-xs border border-luxury-charcoal hover:border-luxury-gold"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          View Details
        </button>
      </div>
    </Card>
  );
};
