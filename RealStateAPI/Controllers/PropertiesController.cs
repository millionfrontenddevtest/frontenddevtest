using Microsoft.AspNetCore.Mvc;
using RealStateAPI.DTOs;
using RealStateAPI.Services;

namespace RealStateAPI.Controllers
{
    /// <summary>
    /// Controlador para gestionar operaciones de propiedades
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _propertyService;
        private readonly ILogger<PropertiesController> _logger;

        /// <summary>
        /// Constructor que recibe la inyección de dependencias
        /// </summary>
        public PropertiesController(IPropertyService propertyService, ILogger<PropertiesController> logger)
        {
            _propertyService = propertyService ?? throw new ArgumentNullException(nameof(propertyService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Obtiene todas las propiedades
        /// </summary>
        /// <returns>Lista de todas las propiedades</returns>
        /// <response code="200">Propiedades obtenidas exitosamente</response>
        /// <response code="500">Error interno del servidor</response>
        [HttpGet]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<PropertyDto>>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllProperties()
        {
            try
            {
                _logger.LogInformation("Obteniendo todas las propiedades");
                var properties = await _propertyService.GetAllPropertiesAsync();

                return Ok(new ApiResponse<IEnumerable<PropertyDto>>(
                    true,
                    "Propiedades obtenidas exitosamente",
                    properties
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener propiedades");
                return StatusCode(500, new ApiResponse<object>(
                    false,
                    "Error interno del servidor",
                    new List<string> { ex.Message }
                ));
            }
        }

        /// <summary>
        /// Obtiene una propiedad específica por su ID
        /// </summary>
        /// <param name="id">ID de la propiedad</param>
        /// <returns>La propiedad solicitada</returns>
        /// <response code="200">Propiedad encontrada</response>
        /// <response code="404">Propiedad no encontrada</response>
        /// <response code="400">ID inválido</response>
        /// <response code="500">Error interno del servidor</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ApiResponse<PropertyDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetPropertyById(string id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                {
                    return BadRequest(new ApiResponse<object>(
                        false,
                        "El ID de la propiedad no puede estar vacío"
                    ));
                }

                _logger.LogInformation($"Obteniendo propiedad con ID: {id}");
                var property = await _propertyService.GetPropertyByIdAsync(id);

                if (property == null)
                {
                    return NotFound(new ApiResponse<object>(
                        false,
                        $"Propiedad con ID {id} no encontrada"
                    ));
                }

                return Ok(new ApiResponse<PropertyDto>(
                    true,
                    "Propiedad obtenida exitosamente",
                    property
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error al obtener propiedad con ID: {id}");
                return StatusCode(500, new ApiResponse<object>(
                    false,
                    "Error interno del servidor",
                    new List<string> { ex.Message }
                ));
            }
        }

        /// <summary>
        /// Crea una nueva propiedad
        /// </summary>
        /// <param name="propertyDto">Datos de la propiedad a crear</param>
        /// <returns>La propiedad creada con su ID</returns>
        /// <response code="201">Propiedad creada exitosamente</response>
        /// <response code="400">Datos inválidos</response>
        /// <response code="500">Error interno del servidor</response>
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse<PropertyDto>), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateProperty([FromBody] PropertyDto propertyDto)
        {
            try
            {
                if (propertyDto == null)
                {
                    return BadRequest(new ApiResponse<object>(
                        false,
                        "Los datos de la propiedad no pueden ser nulos"
                    ));
                }

                if (string.IsNullOrWhiteSpace(propertyDto.Name))
                {
                    return BadRequest(new ApiResponse<object>(
                        false,
                        "El nombre de la propiedad es requerido"
                    ));
                }

                if (propertyDto.Price <= 0)
                {
                    return BadRequest(new ApiResponse<object>(
                        false,
                        "El precio debe ser mayor a 0"
                    ));
                }

                _logger.LogInformation("Creando nueva propiedad: {PropertyName}", propertyDto.Name);
                var createdProperty = await _propertyService.CreatePropertyAsync(propertyDto);

                return CreatedAtAction(nameof(GetPropertyById), new { id = createdProperty.Id },
                    new ApiResponse<PropertyDto>(
                        true,
                        "Propiedad creada exitosamente",
                        createdProperty
                    ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear propiedad");
                return StatusCode(500, new ApiResponse<object>(
                    false,
                    "Error interno del servidor",
                    new List<string> { ex.Message }
                ));
            }
        }

        /// <summary>
        /// Actualiza una propiedad existente
        /// </summary>
        /// <param name="id">ID de la propiedad a actualizar</param>
        /// <param name="propertyDto">Datos actualizados de la propiedad</param>
        /// <returns>Mensaje de éxito</returns>
        /// <response code="200">Propiedad actualizada exitosamente</response>
        /// <response code="400">Datos inválidos</response>
        /// <response code="404">Propiedad no encontrada</response>
        /// <response code="500">Error interno del servidor</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ApiResponse<PropertyDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateProperty(string id, [FromBody] PropertyDto propertyDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                {
                    return BadRequest(new ApiResponse<object>(
                        false,
                        "El ID de la propiedad no puede estar vacío"
                    ));
                }

                if (propertyDto == null)
                {
                    return BadRequest(new ApiResponse<object>(
                        false,
                        "Los datos de la propiedad no pueden ser nulos"
                    ));
                }

                _logger.LogInformation("Actualizando propiedad con ID: {PropertyId}", id);
                var success = await _propertyService.UpdatePropertyAsync(id, propertyDto);

                if (!success)
                {
                    return NotFound(new ApiResponse<object>(
                        false,
                        $"Propiedad con ID {id} no encontrada"
                    ));
                }

                return Ok(new ApiResponse<PropertyDto>(
                    true,
                    "Propiedad actualizada exitosamente",
                    propertyDto
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar propiedad");
                return StatusCode(500, new ApiResponse<object>(
                    false,
                    "Error interno del servidor",
                    new List<string> { ex.Message }
                ));
            }
        }

        /// <summary>
        /// Elimina una propiedad
        /// </summary>
        /// <param name="id">ID de la propiedad a eliminar</param>
        /// <returns>Mensaje de éxito</returns>
        /// <response code="200">Propiedad eliminada exitosamente</response>
        /// <response code="400">ID inválido</response>
        /// <response code="404">Propiedad no encontrada</response>
        /// <response code="500">Error interno del servidor</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteProperty(string id)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(id))
                {
                    return BadRequest(new ApiResponse<object>(
                        false,
                        "El ID de la propiedad no puede estar vacío"
                    ));
                }

                _logger.LogInformation("Eliminando propiedad con ID: {PropertyId}", id);
                var success = await _propertyService.DeletePropertyAsync(id);

                if (!success)
                {
                    return NotFound(new ApiResponse<object>(
                        false,
                        $"Propiedad con ID {id} no encontrada"
                    ));
                }

                return Ok(new ApiResponse<object>(
                    true,
                    "Propiedad eliminada exitosamente"
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al eliminar propiedad");
                return StatusCode(500, new ApiResponse<object>(
                    false,
                    "Error interno del servidor",
                    new List<string> { ex.Message }
                ));
            }
        }

        /// <summary>
        /// Filtra propiedades según los criterios especificados
        /// </summary>
        /// <param name="filter">Criterios de filtrado (nombre, dirección, rango de precio)</param>
        /// <returns>Lista de propiedades que coinciden con los criterios</returns>
        /// <response code="200">Filtrado exitoso</response>
        /// <response code="400">Parámetros de filtrado inválidos</response>
        /// <response code="500">Error interno del servidor</response>
        [HttpPost("filter")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<PropertyDto>>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> FilterProperties([FromBody] PropertyFilterDto filter)
        {
            try
            {
                if (filter == null)
                {
                    return BadRequest(new ApiResponse<object>(
                        false,
                        "El objeto de filtro no puede ser nulo"
                    ));
                }

                if (!filter.IsValid())
                {
                    return BadRequest(new ApiResponse<object>(
                        false,
                        "Parámetros de filtrado inválidos",
                        new List<string>
                        {
                            "MinPrice no puede ser mayor que MaxPrice",
                            "Precio no puede ser negativo"
                        }
                    ));
                }

                _logger.LogInformation("Filtrando propiedades con criterios: {@Filter}", filter);
                var properties = await _propertyService.FilterPropertiesAsync(filter);

                return Ok(new ApiResponse<IEnumerable<PropertyDto>>(
                    true,
                    $"Se encontraron {properties.Count()} propiedades que coinciden con los criterios",
                    properties
                ));
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Parámetros de filtrado inválidos");
                return BadRequest(new ApiResponse<object>(
                    false,
                    "Parámetros de filtrado inválidos",
                    new List<string> { ex.Message }
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al filtrar propiedades");
                return StatusCode(500, new ApiResponse<object>(
                    false,
                    "Error interno del servidor",
                    new List<string> { ex.Message }
                ));
            }
        }

        /// <summary>
        /// Filtro alternativo usando parámetros de query (GET)
        /// </summary>
        /// <param name="name">Nombre o parte del nombre a buscar</param>
        /// <param name="address">Dirección o parte de la dirección a buscar</param>
        /// <param name="minPrice">Precio mínimo</param>
        /// <param name="maxPrice">Precio máximo</param>
        /// <returns>Lista de propiedades filtradas</returns>
        /// <response code="200">Filtrado exitoso</response>
        /// <response code="400">Parámetros inválidos</response>
        /// <response code="500">Error interno del servidor</response>
        [HttpGet("search")]
        [ProducesResponseType(typeof(ApiResponse<IEnumerable<PropertyDto>>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SearchProperties(
            [FromQuery] string? name = null,
            [FromQuery] string? address = null,
            [FromQuery] decimal? minPrice = null,
            [FromQuery] decimal? maxPrice = null)
        {
            try
            {
                var filter = new PropertyFilterDto
                {
                    Name = name,
                    Address = address,
                    MinPrice = minPrice,
                    MaxPrice = maxPrice
                };

                if (!filter.IsValid())
                {
                    return BadRequest(new ApiResponse<object>(
                        false,
                        "Parámetros de búsqueda inválidos",
                        new List<string>
                        {
                            "MinPrice no puede ser mayor que MaxPrice",
                            "Precio no puede ser negativo"
                        }
                    ));
                }

                _logger.LogInformation("Buscando propiedades con criterios: {@Filter}", filter);
                var properties = await _propertyService.FilterPropertiesAsync(filter);

                return Ok(new ApiResponse<IEnumerable<PropertyDto>>(
                    true,
                    $"Se encontraron {properties.Count()} propiedades",
                    properties
                ));
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Parámetros de búsqueda inválidos");
                return BadRequest(new ApiResponse<object>(
                    false,
                    "Parámetros de búsqueda inválidos",
                    new List<string> { ex.Message }
                ));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al buscar propiedades");
                return StatusCode(500, new ApiResponse<object>(
                    false,
                    "Error interno del servidor",
                    new List<string> { ex.Message }
                ));
            }
        }
    }
}
