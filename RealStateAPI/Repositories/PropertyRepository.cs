using MongoDB.Bson;
using MongoDB.Driver;
using RealStateAPI.DTOs;
using RealStateAPI.Models;
using RealStateAPI.Services;

namespace RealStateAPI.Repositories
{
    /// <summary>
    /// Implementación del repositorio de propiedades para MongoDB
    /// </summary>
    public class PropertyRepository : IPropertyRepository
    {
        private readonly IMongoCollection<Property> _propertiesCollection;

        /// <summary>
        /// Constructor que recibe el contexto de MongoDB
        /// </summary>
        public PropertyRepository(MongoDbContext context)
        {
            _propertiesCollection = context.Properties;
        }

        /// <summary>
        /// Obtiene todas las propiedades de la colección
        /// </summary>
        public async Task<IEnumerable<Property>> GetAllPropertiesAsync()
        {
            return await _propertiesCollection.Find(_ => true).ToListAsync();
        }

        /// <summary>
        /// Obtiene una propiedad específica por su ID
        /// </summary>
        public async Task<Property?> GetPropertyByIdAsync(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                return await _propertiesCollection.Find(p => p.Id == objectId.ToString()).FirstOrDefaultAsync();
            }
            catch (FormatException)
            {
                return null;
            }
        }

        /// <summary>
        /// Filtra propiedades según los criterios del DTO
        /// Soporta búsqueda parcial por nombre y dirección, y rango de precios
        /// </summary>
        public async Task<IEnumerable<Property>> FilterPropertiesAsync(PropertyFilterDto filter)
        {
            var filterBuilder = Builders<Property>.Filter;
            var filters = new List<FilterDefinition<Property>>();

            // Filtro por nombre (búsqueda parcial e insensible a mayúsculas)
            if (!string.IsNullOrWhiteSpace(filter.Name))
            {
                filters.Add(filterBuilder.Regex(p => p.Name, new BsonRegularExpression(filter.Name, "i")));
            }

            // Filtro por dirección (búsqueda parcial e insensible a mayúsculas)
            if (!string.IsNullOrWhiteSpace(filter.Address))
            {
                filters.Add(filterBuilder.Regex(p => p.Address, new BsonRegularExpression(filter.Address, "i")));
            }

            // Filtro por precio mínimo
            if (filter.MinPrice.HasValue)
            {
                filters.Add(filterBuilder.Gte(p => p.Price, filter.MinPrice.Value));
            }

            // Filtro por precio máximo
            if (filter.MaxPrice.HasValue)
            {
                filters.Add(filterBuilder.Lte(p => p.Price, filter.MaxPrice.Value));
            }

            // Combinar todos los filtros con AND
            var combinedFilter = filters.Count > 0
                ? filterBuilder.And(filters)
                : filterBuilder.Empty;

            return await _propertiesCollection.Find(combinedFilter).ToListAsync();
        }

        /// <summary>
        /// Crea una nueva propiedad en la colección
        /// </summary>
        public async Task<Property> CreatePropertyAsync(Property property)
        {
            property.CreatedAt = DateTime.UtcNow;
            property.UpdatedAt = DateTime.UtcNow;
            await _propertiesCollection.InsertOneAsync(property);
            return property;
        }

        /// <summary>
        /// Actualiza una propiedad existente
        /// </summary>
        public async Task<bool> UpdatePropertyAsync(string id, Property property)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                property.UpdatedAt = DateTime.UtcNow;
                property.Id = objectId.ToString();

                var result = await _propertiesCollection.ReplaceOneAsync(
                    p => p.Id == objectId.ToString(),
                    property
                );

                return result.ModifiedCount > 0;
            }
            catch (FormatException)
            {
                return false;
            }
        }

        /// <summary>
        /// Elimina una propiedad de la colección
        /// </summary>
        public async Task<bool> DeletePropertyAsync(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var result = await _propertiesCollection.DeleteOneAsync(p => p.Id == objectId.ToString());
                return result.DeletedCount > 0;
            }
            catch (FormatException)
            {
                return false;
            }
        }
    }
}
