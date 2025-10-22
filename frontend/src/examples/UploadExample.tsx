import React from "react";
import ImageUpload from "../components/common/ImageUpload";

/**
 * Ejemplo de uso del componente ImageUpload
 */
const UploadExample: React.FC = () => {
  const handlePropertyImageSuccess = (filePath: string) => {
    console.log("Imagen de propiedad subida:", filePath);
    // Aquí puedes guardar la ruta en tu estado o enviarla a tu API
    // Por ejemplo: setPropertyData(prev => ({ ...prev, images: [...prev.images, filePath] }))
  };

  const handleOwnerPhotoSuccess = (filePath: string) => {
    console.log("Foto de propietario subida:", filePath);
    // Aquí puedes guardar la ruta en tu estado
    // Por ejemplo: setOwnerData(prev => ({ ...prev, photo: filePath }))
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Ejemplos de Carga de Imágenes</h1>

      {/* Subir múltiples imágenes de propiedad */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Imágenes de Propiedad (Múltiples)
        </h2>
        <ImageUpload
          type="property"
          multiple={true}
          maxFiles={10}
          onUploadSuccess={handlePropertyImageSuccess}
        />
      </section>

      {/* Subir foto de propietario */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Foto de Propietario (Una sola)
        </h2>
        <ImageUpload
          type="owner"
          multiple={false}
          onUploadSuccess={handleOwnerPhotoSuccess}
        />
      </section>

      {/* Galería de propiedades de ejemplo */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Galería de Propiedades de Ejemplo
        </h2>
        <div className="border rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-4">
            Estas son las imágenes locales disponibles en la carpeta{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">public/</code>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Casa Moderna Miami */}
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/Casa_Moderna_Miami.jpg"
                alt="Casa Moderna Miami"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-2">Casa Moderna Miami</h3>
                <p className="text-gray-600 text-sm mb-2">
                  123 Ocean Drive, Miami Beach, FL
                </p>
                <p className="text-luxury-gold font-semibold text-lg">
                  $850,000
                </p>
              </div>
            </div>

            {/* Chalet Histórico Jacksonville */}
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/Chalet_Historico_Jacksonville.jpg"
                alt="Chalet Histórico Jacksonville"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-2">
                  Chalet Histórico Jacksonville
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  456 Riverside Avenue, Jacksonville, FL
                </p>
                <p className="text-luxury-gold font-semibold text-lg">
                  $625,000
                </p>
              </div>
            </div>

            {/* Loft Industrial Naples */}
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/Loft_Industrial_Naples.jpg"
                alt="Loft Industrial Naples"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-2">
                  Loft Industrial Naples
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  789 Fifth Avenue S, Naples, FL
                </p>
                <p className="text-luxury-gold font-semibold text-lg">
                  $475,000
                </p>
              </div>
            </div>

            {/* Villa Moderna Tampa */}
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/Villa_Moderna_Tampa.jpg"
                alt="Villa Moderna Tampa"
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg mb-2">Villa Moderna Tampa</h3>
                <p className="text-gray-600 text-sm mb-2">
                  321 Bayshore Boulevard, Tampa, FL
                </p>
                <p className="text-luxury-gold font-semibold text-lg">
                  $1,250,000
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <p className="text-xs text-gray-600 mb-2 font-semibold">
              Código de ejemplo:
            </p>
            <code className="block bg-gray-100 p-3 rounded text-xs">
              {`<img src="/Casa_Moderna_Miami.jpg" alt="Casa Moderna Miami" />`}
            </code>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UploadExample;
