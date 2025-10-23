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
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden group">
        {property.image ? (
          <>
            <img
              src={imageUrl}
              alt={property.name}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER_IMAGE;
              }}
            />
            {/* Multi-layer overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/0 via-luxury-gold/10 to-luxury-darkGold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-luxury-champagne via-luxury-pearl to-luxury-mist">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-luxury-gold/20 animate-pulse"></div>
              <svg
                className="relative w-20 h-20 text-luxury-gold/50 drop-shadow-lg"
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
          </div>
        )}
        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-b from-white to-luxury-mist/30">
        {/* Price */}
        <div className="relative mb-5 pb-4">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent"></div>
          <span className="text-3xl font-serif font-bold text-luxury-darkGold">
            {formatPrice(property.price)}
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-luxury-taupe mb-4 truncate group-hover:text-luxury-darkGold transition-colors duration-300">
          {property.name}
        </h3>

        <div className="flex items-start text-gray-500 mb-6">
          <div className="p-1.5 bg-luxury-gold/10 rounded-md mr-2.5 mt-0.5">
            <svg
              className="w-4 h-4 text-luxury-darkGold"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <span className="text-sm tracking-wide line-clamp-2 leading-relaxed">
            {property.address}
          </span>
        </div>

        <button
          className="relative w-full px-6 py-3.5 bg-gradient-to-r from-luxury-darkGold to-luxury-gold text-white font-semibold tracking-wider uppercase text-xs overflow-hidden group/btn shadow-elevation-1 hover:shadow-luxury-lg transition-all duration-500 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            View Details
            <svg
              className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-gold to-luxury-darkGold transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
        </button>
      </div>
    </Card>
  );
};
