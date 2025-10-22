using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    /// <summary>
    /// Representa una propiedad en la base de datos MongoDB
    /// </summary>
    [BsonIgnoreExtraElements]
    public class Property
    {
        /// <summary>
        /// Identificador único de la propiedad en MongoDB
        /// </summary>
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        /// <summary>
        /// Identificador del propietario
        /// </summary>
        [BsonElement("idOwner")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string IdOwner { get; set; } = string.Empty;

        /// <summary>
        /// Nombre de la propiedad
        /// </summary>
        [BsonElement("name")]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Dirección de la propiedad
        /// </summary>
        [BsonElement("address")]
        public string Address { get; set; } = string.Empty;

        /// <summary>
        /// Precio de la propiedad
        /// </summary>
        [BsonElement("price")]
        public decimal Price { get; set; }

        /// <summary>
        /// URL o referencia a una imagen de la propiedad
        /// </summary>
        [BsonElement("image")]
        public string? Image { get; set; }

        /// <summary>
        /// Fecha de creación del registro
        /// </summary>
        [BsonElement("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Fecha de última modificación
        /// </summary>
        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
