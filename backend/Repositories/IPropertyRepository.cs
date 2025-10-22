using Backend.DTOs;
using Backend.Models;

namespace Backend.Repositories
{
    /// <summary>
    /// Interfaz del repositorio para operaciones de propiedades
    /// </summary>
    public interface IPropertyRepository
    {
        /// <summary>
        /// Obtiene todas las propiedades
        /// </summary>
        Task<IEnumerable<Property>> GetAllPropertiesAsync();

        /// <summary>
        /// Obtiene una propiedad por su ID
        /// </summary>
        Task<Property?> GetPropertyByIdAsync(string id);

        /// <summary>
        /// Filtra propiedades según los criterios especificados
        /// </summary>
        Task<IEnumerable<Property>> FilterPropertiesAsync(PropertyFilterDto filter);

        /// <summary>
        /// Crea una nueva propiedad
        /// </summary>
        Task<Property> CreatePropertyAsync(Property property);

        /// <summary>
        /// Actualiza una propiedad existente
        /// </summary>
        Task<bool> UpdatePropertyAsync(string id, Property property);

        /// <summary>
        /// Elimina una propiedad
        /// </summary>
        Task<bool> DeletePropertyAsync(string id);
    }
}
