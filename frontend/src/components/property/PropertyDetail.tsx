import React from "react";
import { Modal } from "../common/Modal";
import type { Property } from "../../types/property.types";
import { formatPrice } from "../../utils/formatters";
import {
  formatBase64Image,
  PLACEHOLDER_IMAGE_LARGE,
} from "../../utils/imageHelpers";

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
}

/**
 * PropertyDetail component to display detailed property information
 */
export const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  onClose,
}) => {
  const imageUrl = formatBase64Image(property.image) || PLACEHOLDER_IMAGE_LARGE;

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Property Details"
      size="large"
    >
      <div className="space-y-8">
        {/* Image Section */}
        <div className="relative w-full h-96 bg-gray-100 overflow-hidden">
          {property.image ? (
            <img
              src={imageUrl}
              alt={property.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER_IMAGE_LARGE;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-luxury-champagne to-luxury-pearl">
              <svg
                className="w-32 h-32 text-luxury-gold opacity-40"
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
        </div>

        {/* Property Information */}
        <div className="space-y-6">
          {/* Name and Price */}
          <div className="pb-6 border-b border-gray-100">
            <h3 className="text-3xl font-serif font-semibold text-luxury-charcoal mb-2">
              {property.name}
            </h3>
            <p className="text-xs text-gray-400 tracking-wide uppercase mb-4">
              Property ID: {property.id}
            </p>
            <p className="text-4xl font-serif font-semibold text-luxury-gold">
              {formatPrice(property.price)}
            </p>
          </div>

          {/* Address */}
          <div className="flex items-start p-6 bg-luxury-pearl border border-gray-100">
            <svg
              className="w-5 h-5 text-luxury-gold mr-4 flex-shrink-0 mt-1"
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
            <div>
              <p className="text-xs font-medium text-gray-500 tracking-wide uppercase mb-1">
                Location
              </p>
              <p className="text-base text-luxury-charcoal">
                {property.address}
              </p>
            </div>
          </div>

          {/* Owner Information */}
          <div className="flex items-start p-6 bg-luxury-pearl border border-gray-100">
            <svg
              className="w-5 h-5 text-luxury-gold mr-4 flex-shrink-0 mt-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <div>
              <p className="text-xs font-medium text-gray-500 tracking-wide uppercase mb-1">
                Owner Reference
              </p>
              <p className="text-base text-luxury-charcoal">
                {property.idOwner}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-100">
          <button className="flex-1 px-8 py-4 bg-luxury-charcoal text-white hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-300 font-medium tracking-wide uppercase text-sm border border-luxury-charcoal hover:border-luxury-gold">
            Contact Owner
          </button>
          <button className="flex-1 px-8 py-4 bg-white text-luxury-charcoal hover:bg-luxury-champagne transition-all duration-300 font-medium tracking-wide uppercase text-sm border border-gray-200">
            Save Property
          </button>
        </div>
      </div>
    </Modal>
  );
};
