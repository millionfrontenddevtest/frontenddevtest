using Microsoft.AspNetCore.Mvc;
using Backend.Services;

namespace Backend.Controllers
{
    /// <summary>
    /// Controlador para gestionar la carga y descarga de archivos
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IFileStorageService _fileStorageService;
        private readonly ILogger<FilesController> _logger;

        public FilesController(IFileStorageService fileStorageService, ILogger<FilesController> logger)
        {
            _fileStorageService = fileStorageService;
            _logger = logger;
        }

        /// <summary>
        /// Sube una imagen de propiedad
        /// </summary>
        /// <param name="file">Archivo de imagen</param>
        /// <returns>Ruta relativa del archivo guardado</returns>
        [HttpPost("upload/property")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadPropertyImage([FromForm] IFormFile file)
        {
            try
            {
                var filePath = await _fileStorageService.SaveFileAsync(file, "properties");

                return Ok(new
                {
                    success = true,
                    filePath = filePath,
                    fileName = Path.GetFileName(filePath),
                    message = "Imagen de propiedad subida exitosamente"
                });
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Validación falló al subir imagen de propiedad");
                return BadRequest(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al subir imagen de propiedad");
                return StatusCode(500, new { success = false, message = "Error interno del servidor" });
            }
        }

        /// <summary>
        /// Sube una foto de propietario
        /// </summary>
        /// <param name="file">Archivo de imagen</param>
        /// <returns>Ruta relativa del archivo guardado</returns>
        [HttpPost("upload/owner")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadOwnerPhoto([FromForm] IFormFile file)
        {
            try
            {
                var filePath = await _fileStorageService.SaveFileAsync(file, "owners");

                return Ok(new
                {
                    success = true,
                    filePath = filePath,
                    fileName = Path.GetFileName(filePath),
                    message = "Foto de propietario subida exitosamente"
                });
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Validación falló al subir foto de propietario");
                return BadRequest(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al subir foto de propietario");
                return StatusCode(500, new { success = false, message = "Error interno del servidor" });
            }
        }

        /// <summary>
        /// Sube múltiples imágenes de una propiedad
        /// </summary>
        /// <param name="files">Lista de archivos de imagen</param>
        /// <returns>Lista de rutas relativas de los archivos guardados</returns>
        [HttpPost("upload/property/multiple")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UploadMultiplePropertyImages([FromForm] List<IFormFile> files)
        {
            try
            {
                if (files == null || files.Count == 0)
                {
                    return BadRequest(new { success = false, message = "No se proporcionaron archivos" });
                }

                if (files.Count > 10)
                {
                    return BadRequest(new { success = false, message = "Máximo 10 imágenes por propiedad" });
                }

                var uploadedFiles = new List<object>();
                var errors = new List<string>();

                foreach (var file in files)
                {
                    try
                    {
                        var filePath = await _fileStorageService.SaveFileAsync(file, "properties");
                        uploadedFiles.Add(new
                        {
                            filePath = filePath,
                            fileName = Path.GetFileName(filePath),
                            originalName = file.FileName
                        });
                    }
                    catch (Exception ex)
                    {
                        errors.Add($"{file.FileName}: {ex.Message}");
                        _logger.LogWarning(ex, $"Error al subir archivo: {file.FileName}");
                    }
                }

                return Ok(new
                {
                    success = true,
                    uploadedFiles = uploadedFiles,
                    errors = errors,
                    totalUploaded = uploadedFiles.Count,
                    totalErrors = errors.Count,
                    message = $"{uploadedFiles.Count} imágenes subidas exitosamente"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al subir múltiples imágenes");
                return StatusCode(500, new { success = false, message = "Error interno del servidor" });
            }
        }

        /// <summary>
        /// Elimina un archivo
        /// </summary>
        /// <param name="filePath">Ruta relativa del archivo a eliminar</param>
        /// <returns>Resultado de la operación</returns>
        [HttpDelete("delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteFile([FromQuery] string filePath)
        {
            try
            {
                var deleted = await _fileStorageService.DeleteFileAsync(filePath);

                if (deleted)
                {
                    return Ok(new { success = true, message = "Archivo eliminado exitosamente" });
                }

                return NotFound(new { success = false, message = "Archivo no encontrado" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al eliminar archivo: {filePath}");
                return StatusCode(500, new { success = false, message = "Error interno del servidor" });
            }
        }
    }
}
