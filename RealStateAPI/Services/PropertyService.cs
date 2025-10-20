using RealStateAPI.DTOs;
using RealStateAPI.Models;
using RealStateAPI.Repositories;

namespace RealStateAPI.Services
{
    /// <summary>
    /// Implementación del servicio de propiedades
    /// Contiene la lógica de negocio para operaciones de propiedades
    /// </summary>
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _propertyRepository;

        /// <summary>
        /// Constructor que recibe la inyección del repositorio
        /// </summary>
        public PropertyService(IPropertyRepository propertyRepository)
        {
            _propertyRepository = propertyRepository ?? throw new ArgumentNullException(nameof(propertyRepository));
        }

        /// <summary>
        /// Obtiene todas las propiedades y las convierte a DTOs
        /// </summary>
        public async Task<IEnumerable<PropertyDto>> GetAllPropertiesAsync()
        {
            var properties = await _propertyRepository.GetAllPropertiesAsync();
            return properties.Select(MapToDto);
        }

        /// <summary>
        /// Obtiene una propiedad específica por su ID
        /// </summary>
        public async Task<PropertyDto?> GetPropertyByIdAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentException("El ID de la propiedad no puede estar vacío", nameof(id));
            }

            var property = await _propertyRepository.GetPropertyByIdAsync(id);
            return property != null ? MapToDto(property) : null;
        }

        /// <summary>
        /// Filtra propiedades según los criterios especificados
        /// Valida los parámetros antes de procesar
        /// </summary>
        public async Task<IEnumerable<PropertyDto>> FilterPropertiesAsync(PropertyFilterDto filter)
        {
            if (filter == null)
            {
                throw new ArgumentNullException(nameof(filter));
            }

            if (!filter.IsValid())
            {
                throw new ArgumentException("Los parámetros del filtro no son válidos. Verifique que MinPrice no sea mayor que MaxPrice.");
            }

            var properties = await _propertyRepository.FilterPropertiesAsync(filter);
            return properties.Select(MapToDto);
        }

        /// <summary>
        /// Crea una nueva propiedad
        /// </summary>
        public async Task<PropertyDto> CreatePropertyAsync(PropertyDto propertyDto)
        {
            if (propertyDto == null)
            {
                throw new ArgumentNullException(nameof(propertyDto));
            }

            if (string.IsNullOrWhiteSpace(propertyDto.Name))
            {
                throw new ArgumentException("El nombre de la propiedad es requerido", nameof(propertyDto.Name));
            }

            if (propertyDto.Price <= 0)
            {
                throw new ArgumentException("El precio debe ser mayor a 0", nameof(propertyDto.Price));
            }

            var property = new Property
            {
                IdOwner = propertyDto.IdOwner,
                Name = propertyDto.Name,
                Address = propertyDto.Address,
                Price = propertyDto.Price,
                Image = propertyDto.Image,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var createdProperty = await _propertyRepository.CreatePropertyAsync(property);
            return MapToDto(createdProperty);
        }

        /// <summary>
        /// Actualiza una propiedad existente
        /// </summary>
        public async Task<bool> UpdatePropertyAsync(string id, PropertyDto propertyDto)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentException("El ID de la propiedad no puede estar vacío", nameof(id));
            }

            if (propertyDto == null)
            {
                throw new ArgumentNullException(nameof(propertyDto));
            }

            if (propertyDto.Price <= 0)
            {
                throw new ArgumentException("El precio debe ser mayor a 0", nameof(propertyDto.Price));
            }

            var property = new Property
            {
                IdOwner = propertyDto.IdOwner,
                Name = propertyDto.Name,
                Address = propertyDto.Address,
                Price = propertyDto.Price,
                Image = propertyDto.Image,
                UpdatedAt = DateTime.UtcNow
            };

            return await _propertyRepository.UpdatePropertyAsync(id, property);
        }

        /// <summary>
        /// Elimina una propiedad
        /// </summary>
        public async Task<bool> DeletePropertyAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentException("El ID de la propiedad no puede estar vacío", nameof(id));
            }

            return await _propertyRepository.DeletePropertyAsync(id);
        }

        /// <summary>
        /// Mapea una entidad Property a un DTO PropertyDto
        /// </summary>
        private static PropertyDto MapToDto(Property property)
        {
            return new PropertyDto
            {
                Id = property.Id,
                IdOwner = property.IdOwner,
                Name = property.Name,
                Address = property.Address,
                Price = property.Price,
                Image = property.Image
            };
        }
    }
}
