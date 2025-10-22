namespace Backend.DTOs
{
    /// <summary>
    /// DTO para transferencia de datos de propiedades
    /// </summary>
    public class PropertyDto
    {
        /// <summary>
        /// Identificador único de la propiedad
        /// </summary>
        public string? Id { get; set; }

        /// <summary>
        /// Identificador del propietario
        /// </summary>
        public string IdOwner { get; set; } = string.Empty;

        /// <summary>
        /// Nombre de la propiedad
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Dirección de la propiedad
        /// </summary>
        public string Address { get; set; } = string.Empty;

        /// <summary>
        /// Precio de la propiedad
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// URL o referencia a una imagen
        /// </summary>
        public string? Image { get; set; }
    }
}
