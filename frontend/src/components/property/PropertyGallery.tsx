import React from "react";
import { formatBase64Image } from "../../utils/imageHelpers";

/**
 * Galería de propiedades con las imágenes locales
 */
const PropertyGallery: React.FC = () => {
  const properties = [
    {
      id: "1",
      name: "Casa Moderna Miami",
      address: "123 Ocean Drive, Miami Beach, FL 33139",
      price: "$850,000",
      image: "/Casa_Moderna_Miami.jpg",
      description:
        "Espectacular casa moderna con vista al océano. Diseño contemporáneo con acabados de lujo y espacios amplios.",
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: "3,200",
    },
    {
      id: "2",
      name: "Chalet Histórico Jacksonville",
      address: "456 Riverside Avenue, Jacksonville, FL 32202",
      price: "$625,000",
      image: "/Chalet_Historico_Jacksonville.jpg",
      description:
        "Encantador chalet histórico completamente renovado. Mantiene su carácter original con todas las comodidades modernas.",
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: "2,800",
    },
    {
      id: "3",
      name: "Loft Industrial Naples",
      address: "789 Fifth Avenue S, Naples, FL 34102",
      price: "$475,000",
      image: "/Loft_Industrial_Naples.jpg",
      description:
        "Loft de estilo industrial en el corazón de Naples. Techos altos, ventanas amplias y diseño abierto.",
      bedrooms: 2,
      bathrooms: 2,
      sqft: "1,800",
    },
    {
      id: "4",
      name: "Villa Moderna Tampa",
      address: "321 Bayshore Boulevard, Tampa, FL 33606",
      price: "$1,250,000",
      image: "/Villa_Moderna_Tampa.jpg",
      description:
        "Lujosa villa moderna frente a la bahía. Arquitectura excepcional con piscina infinity y acabados de primera clase.",
      bedrooms: 5,
      bathrooms: 4.5,
      sqft: "4,500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-luxury-pearl via-white to-luxury-champagne">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-luxury-charcoal mb-4">
            Propiedades Exclusivas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de propiedades de lujo en las mejores
            ubicaciones de Florida
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden group">
                <img
                  src={formatBase64Image(property.image) || property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{property.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-serif font-bold text-luxury-gold">
                    {property.price}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif font-semibold text-luxury-charcoal mb-2">
                  {property.name}
                </h3>

                {/* Address */}
                <div className="flex items-start text-gray-600 mb-4">
                  <svg
                    className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-luxury-gold"
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
                  <span className="text-sm">{property.address}</span>
                </div>

                {/* Features */}
                <div className="flex items-center gap-6 text-sm text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-1 text-luxury-gold"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span>{property.bedrooms} Habitaciones</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-1 text-luxury-gold"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span>{property.bathrooms} Baños</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-1 text-luxury-gold"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                    </svg>
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>

                {/* Button */}
                <button className="mt-6 w-full bg-luxury-gold hover:bg-luxury-charcoal text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-luxury-charcoal mb-4 text-center">
            Imágenes Implementadas
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Las 4 imágenes se encuentran en la carpeta{" "}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              public/
            </code>{" "}
            y están siendo utilizadas en:
          </p>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-luxury-pearl rounded-lg p-4">
              <h3 className="font-semibold text-luxury-charcoal mb-2">
                📁 Archivos de Imágenes
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>✓ Casa_Moderna_Miami.jpg</li>
                <li>✓ Chalet_Historico_Jacksonville.jpg</li>
                <li>✓ Loft_Industrial_Naples.jpg</li>
                <li>✓ Villa_Moderna_Tampa.jpg</li>
              </ul>
            </div>

            <div className="bg-luxury-champagne rounded-lg p-4">
              <h3 className="font-semibold text-luxury-charcoal mb-2">
                🎯 Implementación
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>✓ mockData.ts (datos de propiedades)</li>
                <li>✓ PropertyCard.tsx (componente)</li>
                <li>✓ PropertyGallery.tsx (galería)</li>
                <li>✓ UploadExample.tsx (ejemplos)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 font-semibold mb-2">
              Código de ejemplo:
            </p>
            <code className="block bg-white p-3 rounded text-xs text-gray-800 border border-gray-200">
              {`<img src="/Casa_Moderna_Miami.jpg" alt="Casa Moderna Miami" className="w-full h-64 object-cover" />`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
