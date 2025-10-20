using MongoDB.Driver;
using RealStateAPI.Configuration;
using RealStateAPI.Models;

namespace RealStateAPI.Services
{
    /// <summary>
    /// Servicio para gestionar la conexión y colecciones de MongoDB
    /// </summary>
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        /// <summary>
        /// Constructor que inicializa la conexión a MongoDB
        /// </summary>
        public MongoDbContext(MongoDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            _database = client.GetDatabase(settings.DatabaseName);
        }

        /// <summary>
        /// Obtiene la colección de propiedades
        /// </summary>
        public IMongoCollection<Property> Properties =>
            _database.GetCollection<Property>("Properties");
    }
}
