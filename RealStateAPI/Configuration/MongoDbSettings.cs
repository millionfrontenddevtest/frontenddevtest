namespace RealStateAPI.Configuration
{
    /// <summary>
    /// Configuración de conexión a MongoDB
    /// </summary>
    public class MongoDbSettings
    {
        /// <summary>
        /// Cadena de conexión a MongoDB
        /// </summary>
        public string ConnectionString { get; set; } = string.Empty;

        /// <summary>
        /// Nombre de la base de datos
        /// </summary>
        public string DatabaseName { get; set; } = string.Empty;

        /// <summary>
        /// Nombre de la colección de propiedades
        /// </summary>
        public string PropertiesCollectionName { get; set; } = string.Empty;
    }
}
