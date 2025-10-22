import React, { useState } from "react";

interface UploadedFile {
  filePath: string;
  fileName: string;
  originalName?: string;
}

interface ImageUploadProps {
  type: "property" | "owner";
  onUploadSuccess?: (filePath: string) => void;
  multiple?: boolean;
  maxFiles?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  type,
  onUploadSuccess,
  multiple = false,
  maxFiles = 10,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string>("");
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const API_URL = "http://localhost:5000";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Validar número de archivos
    if (multiple && files.length > maxFiles) {
      setError(`Máximo ${maxFiles} imágenes permitidas`);
      return;
    }

    // Crear previsualizaciones
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }
    setPreviewUrls(urls);
    setError("");
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    setError("");

    const fileInput = event.currentTarget.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const files = fileInput?.files;

    if (!files || files.length === 0) {
      setError("Por favor selecciona al menos un archivo");
      setUploading(false);
      return;
    }

    try {
      if (multiple && files.length > 1) {
        // Subir múltiples archivos
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }

        const response = await fetch(
          `${API_URL}/api/files/upload/${type}/multiple`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (result.success) {
          setUploadedFiles(result.uploadedFiles);
          if (result.uploadedFiles.length > 0 && onUploadSuccess) {
            result.uploadedFiles.forEach((file: UploadedFile) => {
              onUploadSuccess(file.filePath);
            });
          }
          if (result.errors.length > 0) {
            setError(`Algunos archivos fallaron: ${result.errors.join(", ")}`);
          }
        } else {
          setError(result.message || "Error al subir archivos");
        }
      } else {
        // Subir un solo archivo
        const formData = new FormData();
        formData.append("file", files[0]);

        const response = await fetch(`${API_URL}/api/files/upload/${type}`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          setUploadedFiles([result]);
          if (onUploadSuccess) {
            onUploadSuccess(result.filePath);
          }
        } else {
          setError(result.message || "Error al subir archivo");
        }
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filePath: string) => {
    try {
      const response = await fetch(
        `${API_URL}/api/files/delete?filePath=${encodeURIComponent(filePath)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        setUploadedFiles((prev) => prev.filter((f) => f.filePath !== filePath));
      } else {
        setError(result.message || "Error al eliminar archivo");
      }
    } catch (err) {
      setError("Error al eliminar archivo");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="image-upload-container p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">
        {type === "property"
          ? "Subir Imágenes de Propiedad"
          : "Subir Foto de Propietario"}
      </h3>

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Seleccionar {multiple ? "Imágenes" : "Imagen"}
          </label>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            multiple={multiple}
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={uploading}
          />
          <p className="mt-1 text-xs text-gray-500">
            Formatos: JPG, PNG, GIF, WEBP (Máx. 5MB)
            {multiple && ` | Máximo ${maxFiles} archivos`}
          </p>
        </div>

        {/* Previsualizaciones */}
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={uploading || previewUrls.length === 0}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {uploading ? "Subiendo..." : "Subir"}
        </button>
      </form>

      {/* Errores */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Archivos subidos */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Archivos Subidos:</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={`${API_URL}${file.filePath}`}
                    alt={file.fileName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">{file.fileName}</p>
                    <p className="text-xs text-gray-500">{file.filePath}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(file.filePath)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
