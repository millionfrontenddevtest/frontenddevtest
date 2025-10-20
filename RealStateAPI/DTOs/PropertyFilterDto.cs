namespace RealStateAPI.DTOs
{
    /// <summary>
    /// DTO para parámetros de filtrado de propiedades
    /// </summary>
    public class PropertyFilterDto
    {
        /// <summary>
        /// Nombre o parte del nombre de la propiedad (búsqueda parcial)
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Dirección o parte de la dirección (búsqueda parcial)
        /// </summary>
        public string? Address { get; set; }

        /// <summary>
        /// Precio mínimo para filtrar
        /// </summary>
        public decimal? MinPrice { get; set; }

        /// <summary>
        /// Precio máximo para filtrar
        /// </summary>
        public decimal? MaxPrice { get; set; }

        /// <summary>
        /// Validar que los parámetros del filtro sean correctos
        /// </summary>
        public bool IsValid()
        {
            // MinPrice no puede ser negativo
            if (MinPrice.HasValue && MinPrice < 0)
                return false;

            // MaxPrice no puede ser negativo
            if (MaxPrice.HasValue && MaxPrice < 0)
                return false;

            // MinPrice no puede ser mayor que MaxPrice
            if (MinPrice.HasValue && MaxPrice.HasValue && MinPrice > MaxPrice)
                return false;

            return true;
        }
    }
}
