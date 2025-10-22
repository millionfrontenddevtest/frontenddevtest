namespace Backend.Services
{
    /// <summary>
    /// Implementación del servicio de almacenamiento local de archivos
    /// </summary>
    public class FileStorageService : IFileStorageService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<FileStorageService> _logger;
        private readonly string _uploadsFolder;
        private readonly long _maxFileSize = 5 * 1024 * 1024; // 5 MB
        private readonly string[] _allowedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp" };

        public FileStorageService(IWebHostEnvironment environment, ILogger<FileStorageService> logger)
        {
            _environment = environment;
            _logger = logger;
            _uploadsFolder = Path.Combine(_environment.WebRootPath ?? "wwwroot", "uploads");

            // Crear carpetas si no existen
            EnsureDirectoriesExist();
        }

        /// <summary>
        /// Guarda un archivo en el sistema local
        /// </summary>
        public async Task<string> SaveFileAsync(IFormFile file, string folder)
        {
            try
            {
                // Validaciones
                if (file == null || file.Length == 0)
                {
                    throw new ArgumentException("El archivo está vacío o es nulo");
                }

                if (file.Length > _maxFileSize)
                {
                    throw new ArgumentException($"El archivo excede el tamaño máximo permitido de {_maxFileSize / 1024 / 1024} MB");
                }

                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!_allowedExtensions.Contains(extension))
                {
                    throw new ArgumentException($"Extensión de archivo no permitida. Permitidas: {string.Join(", ", _allowedExtensions)}");
                }

                // Generar nombre único
                var uniqueFileName = $"{Guid.NewGuid()}{extension}";
                var folderPath = Path.Combine(_uploadsFolder, folder);
                var fullPath = Path.Combine(folderPath, uniqueFileName);

                // Asegurar que la carpeta existe
                Directory.CreateDirectory(folderPath);

                // Guardar archivo
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Retornar ruta relativa para guardar en BD
                var relativePath = $"/uploads/{folder}/{uniqueFileName}";
                _logger.LogInformation($"Archivo guardado exitosamente: {relativePath}");

                return relativePath;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al guardar el archivo");
                throw;
            }
        }

        /// <summary>
        /// Elimina un archivo del sistema
        /// </summary>
        public async Task<bool> DeleteFileAsync(string filePath)
        {
            try
            {
                if (string.IsNullOrEmpty(filePath))
                {
                    return false;
                }

                var fullPath = GetFullPath(filePath);

                if (File.Exists(fullPath))
                {
                    await Task.Run(() => File.Delete(fullPath));
                    _logger.LogInformation($"Archivo eliminado: {filePath}");
                    return true;
                }

                _logger.LogWarning($"Archivo no encontrado para eliminar: {filePath}");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al eliminar el archivo: {filePath}");
                return false;
            }
        }

        /// <summary>
        /// Verifica si un archivo existe
        /// </summary>
        public bool FileExists(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
            {
                return false;
            }

            var fullPath = GetFullPath(filePath);
            return File.Exists(fullPath);
        }

        /// <summary>
        /// Obtiene la ruta completa del archivo
        /// </summary>
        public string GetFullPath(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
            {
                return string.Empty;
            }

            // Remover el "/" inicial si existe
            var cleanPath = filePath.TrimStart('/');
            return Path.Combine(_environment.WebRootPath ?? "wwwroot", cleanPath);
        }

        /// <summary>
        /// Asegura que las carpetas de uploads existan
        /// </summary>
        private void EnsureDirectoriesExist()
        {
            var directories = new[]
            {
                Path.Combine(_uploadsFolder, "properties"),
                Path.Combine(_uploadsFolder, "owners")
            };

            foreach (var directory in directories)
            {
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                    _logger.LogInformation($"Carpeta creada: {directory}");
                }
            }
        }
    }
}
