using Backend.DTOs;

namespace Backend.Services
{
    /// <summary>
    /// Interfaz del servicio de propiedades
    /// </summary>
    public interface IPropertyService
    {
        /// <summary>
        /// Obtiene todas las propiedades convertidas a DTOs
        /// </summary>
        Task<IEnumerable<PropertyDto>> GetAllPropertiesAsync();

        /// <summary>
        /// Obtiene una propiedad por su ID
        /// </summary>
        Task<PropertyDto?> GetPropertyByIdAsync(string id);

        /// <summary>
        /// Filtra propiedades según los criterios especificados
        /// </summary>
        Task<IEnumerable<PropertyDto>> FilterPropertiesAsync(PropertyFilterDto filter);

        /// <summary>
        /// Crea una nueva propiedad
        /// </summary>
        Task<PropertyDto> CreatePropertyAsync(PropertyDto propertyDto);

        /// <summary>
        /// Actualiza una propiedad existente
        /// </summary>
        Task<bool> UpdatePropertyAsync(string id, PropertyDto propertyDto);

        /// <summary>
        /// Elimina una propiedad
        /// </summary>
        Task<bool> DeletePropertyAsync(string id);
    }
}
