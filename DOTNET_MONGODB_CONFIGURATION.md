# MongoDB Configuration for .NET/C# Real Estate API

## 📝 Archivos de Configuración

### 1. appsettings.json (Desarrollo)

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "AllowedHosts": "*",
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "RealStateDB",
    "CollectionName": "properties"
  },
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      }
    }
  }
}
```

### 2. appsettings.Development.json (Desarrollo Local)

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft": "Information"
    }
  },
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017",
    "DatabaseName": "RealStateDB",
    "CollectionName": "properties"
  }
}
```

### 3. appsettings.Production.json (Producción - MongoDB Atlas)

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "MongoDbSettings": {
    "ConnectionString": "mongodb+srv://realstate_user:secure_password@cluster.mongodb.net/RealStateDB?retryWrites=true&w=majority",
    "DatabaseName": "RealStateDB",
    "CollectionName": "properties"
  }
}
```

---

## 🔧 Configuración en Program.cs

### Registro del Servicio MongoDB

```csharp
using MongoDB.Driver;
using RealStateAPI.Configuration;
using RealStateAPI.Services;
using RealStateAPI.Repositories;

var builder = WebApplicationBuilder.CreateBuilder(args);

// Leer configuración de MongoDB
var mongoDbSettings = builder.Configuration.GetSection("MongoDbSettings");

// Registrar configuración de MongoDB
builder.Services.Configure<MongoDbSettings>(mongoDbSettings);

// Registrar MongoClient como Singleton
builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>();
    return new MongoClient(settings.Value.ConnectionString);
});

// Registrar contexto de MongoDB
builder.Services.AddScoped<MongoDbContext>();

// Registrar repositorio
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();

// Registrar servicio
builder.Services.AddScoped<IPropertyService, PropertyService>();

// Agregar controladores
builder.Services.AddControllers();

// Agregar CORS si es necesario
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Build
var app = builder.Build();

// Middleware
app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.MapControllers();

app.Run();
```

---

## 📦 Clases de Configuración

### MongoDbSettings.cs

```csharp
namespace RealStateAPI.Configuration
{
    public class MongoDbSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string CollectionName { get; set; } = null!;
    }
}
```

### MongoDbContext.cs

```csharp
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using RealStateAPI.Configuration;
using RealStateAPI.Models;

namespace RealStateAPI.Services
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(
            IMongoClient mongoClient,
            IOptions<MongoDbSettings> mongoDbSettings)
        {
            var settings = mongoDbSettings.Value;
            _database = mongoClient.GetDatabase(settings.DatabaseName);
        }

        public IMongoCollection<Property> Properties =>
            _database.GetCollection<Property>("properties");
    }
}
```

---

## 🗂️ Modelo de Datos

### Property.cs (Modelo)

```csharp
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RealStateAPI.Models
{
    public class Property
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("idOwner")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string IdOwner { get; set; } = null!;

        [BsonElement("name")]
        public string Name { get; set; } = null!;

        [BsonElement("address")]
        public string Address { get; set; } = null!;

        [BsonElement("price")]
        public decimal Price { get; set; }

        [BsonElement("image")]
        public string Image { get; set; } = null!;

        [BsonElement("createdAt")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
```

### PropertyDto.cs (DTO)

```csharp
namespace RealStateAPI.DTOs
{
    public class PropertyDto
    {
        public string? Id { get; set; }
        public string IdOwner { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string Address { get; set; } = null!;
        public decimal Price { get; set; }
        public string Image { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
```

---

## 📡 Repositorio

### IPropertyRepository.cs (Interfaz)

```csharp
using RealStateAPI.Models;

namespace RealStateAPI.Repositories
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetAllAsync();
        Task<Property?> GetByIdAsync(string id);
        Task<IEnumerable<Property>> GetByOwnerAsync(string idOwner);
        Task<IEnumerable<Property>> GetByPriceRangeAsync(decimal minPrice, decimal maxPrice);
        Task<IEnumerable<Property>> SearchByNameAsync(string searchTerm);
        Task<IEnumerable<Property>> SearchByAddressAsync(string searchTerm);
        Task<Property> CreateAsync(Property property);
        Task UpdateAsync(string id, Property property);
        Task DeleteAsync(string id);
    }
}
```

### PropertyRepository.cs (Implementación)

```csharp
using MongoDB.Driver;
using RealStateAPI.Models;
using RealStateAPI.Repositories;

namespace RealStateAPI.Services
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly MongoDbContext _context;

        public PropertyRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Property>> GetAllAsync()
        {
            return await _context.Properties.Find(_ => true).ToListAsync();
        }

        public async Task<Property?> GetByIdAsync(string id)
        {
            return await _context.Properties.Find(p => p.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Property>> GetByOwnerAsync(string idOwner)
        {
            return await _context.Properties
                .Find(p => p.IdOwner == idOwner)
                .ToListAsync();
        }

        public async Task<IEnumerable<Property>> GetByPriceRangeAsync(decimal minPrice, decimal maxPrice)
        {
            return await _context.Properties
                .Find(p => p.Price >= minPrice && p.Price <= maxPrice)
                .SortBy(p => p.Price)
                .ToListAsync();
        }

        public async Task<IEnumerable<Property>> SearchByNameAsync(string searchTerm)
        {
            var filter = Builders<Property>.Filter.Regex(p => p.Name, searchTerm, "i");
            return await _context.Properties.Find(filter).ToListAsync();
        }

        public async Task<IEnumerable<Property>> SearchByAddressAsync(string searchTerm)
        {
            var filter = Builders<Property>.Filter.Regex(p => p.Address, searchTerm, "i");
            return await _context.Properties.Find(filter).ToListAsync();
        }

        public async Task<Property> CreateAsync(Property property)
        {
            property.CreatedAt = DateTime.UtcNow;
            property.UpdatedAt = DateTime.UtcNow;
            await _context.Properties.InsertOneAsync(property);
            return property;
        }

        public async Task UpdateAsync(string id, Property property)
        {
            property.UpdatedAt = DateTime.UtcNow;
            var update = Builders<Property>.Update
                .Set(p => p.Name, property.Name)
                .Set(p => p.Address, property.Address)
                .Set(p => p.Price, property.Price)
                .Set(p => p.Image, property.Image)
                .Set(p => p.UpdatedAt, property.UpdatedAt);

            await _context.Properties.UpdateOneAsync(p => p.Id == id, update);
        }

        public async Task DeleteAsync(string id)
        {
            await _context.Properties.DeleteOneAsync(p => p.Id == id);
        }
    }
}
```

---

## 🏢 Servicio

### IPropertyService.cs (Interfaz)

```csharp
using RealStateAPI.DTOs;

namespace RealStateAPI.Services
{
    public interface IPropertyService
    {
        Task<IEnumerable<PropertyDto>> GetAllPropertiesAsync();
        Task<PropertyDto?> GetPropertyByIdAsync(string id);
        Task<PropertyDto> CreatePropertyAsync(PropertyDto propertyDto);
        Task UpdatePropertyAsync(string id, PropertyDto propertyDto);
        Task DeletePropertyAsync(string id);
        Task<IEnumerable<PropertyDto>> FilterPropertiesAsync(PropertyFilterDto filter);
    }
}
```

### PropertyService.cs (Implementación)

```csharp
using RealStateAPI.DTOs;
using RealStateAPI.Models;
using RealStateAPI.Repositories;

namespace RealStateAPI.Services
{
    public class PropertyService : IPropertyService
    {
        private readonly IPropertyRepository _repository;

        public PropertyService(IPropertyRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PropertyDto>> GetAllPropertiesAsync()
        {
            var properties = await _repository.GetAllAsync();
            return MapToDto(properties);
        }

        public async Task<PropertyDto?> GetPropertyByIdAsync(string id)
        {
            var property = await _repository.GetByIdAsync(id);
            return property != null ? MapToDto(property) : null;
        }

        public async Task<PropertyDto> CreatePropertyAsync(PropertyDto propertyDto)
        {
            var property = MapToModel(propertyDto);
            var createdProperty = await _repository.CreateAsync(property);
            return MapToDto(createdProperty);
        }

        public async Task UpdatePropertyAsync(string id, PropertyDto propertyDto)
        {
            var property = MapToModel(propertyDto);
            property.Id = id;
            await _repository.UpdateAsync(id, property);
        }

        public async Task DeletePropertyAsync(string id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<PropertyDto>> FilterPropertiesAsync(PropertyFilterDto filter)
        {
            IEnumerable<Property> properties = new List<Property>();

            if (!string.IsNullOrEmpty(filter.Name))
            {
                properties = await _repository.SearchByNameAsync(filter.Name);
            }
            else if (!string.IsNullOrEmpty(filter.Address))
            {
                properties = await _repository.SearchByAddressAsync(filter.Address);
            }
            else if (filter.MinPrice.HasValue && filter.MaxPrice.HasValue)
            {
                properties = await _repository.GetByPriceRangeAsync(
                    filter.MinPrice.Value,
                    filter.MaxPrice.Value);
            }
            else
            {
                properties = await _repository.GetAllAsync();
            }

            return MapToDto(properties);
        }

        private IEnumerable<PropertyDto> MapToDto(IEnumerable<Property> properties)
        {
            return properties.Select(MapToDto);
        }

        private PropertyDto MapToDto(Property property)
        {
            return new PropertyDto
            {
                Id = property.Id,
                IdOwner = property.IdOwner,
                Name = property.Name,
                Address = property.Address,
                Price = property.Price,
                Image = property.Image,
                CreatedAt = property.CreatedAt,
                UpdatedAt = property.UpdatedAt
            };
        }

        private Property MapToModel(PropertyDto dto)
        {
            return new Property
            {
                Id = dto.Id,
                IdOwner = dto.IdOwner,
                Name = dto.Name,
                Address = dto.Address,
                Price = dto.Price,
                Image = dto.Image
            };
        }
    }
}
```

---

## 🎮 Controlador

### PropertiesController.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using RealStateAPI.DTOs;
using RealStateAPI.Services;

namespace RealStateAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        /// <summary>
        /// Obtener todas las propiedades
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<PropertyDto>>>>
            GetAllProperties()
        {
            try
            {
                var properties = await _propertyService.GetAllPropertiesAsync();
                return Ok(new ApiResponse<IEnumerable<PropertyDto>>
                {
                    Success = true,
                    Message = "Propiedades obtenidas exitosamente",
                    Data = properties
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error interno del servidor: {ex.Message}"
                });
            }
        }

        /// <summary>
        /// Obtener propiedad por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<PropertyDto>>>
            GetPropertyById(string id)
        {
            try
            {
                var property = await _propertyService.GetPropertyByIdAsync(id);
                if (property == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Propiedad no encontrada"
                    });
                }

                return Ok(new ApiResponse<PropertyDto>
                {
                    Success = true,
                    Message = "Propiedad obtenida exitosamente",
                    Data = property
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error interno del servidor: {ex.Message}"
                });
            }
        }

        /// <summary>
        /// Crear nueva propiedad
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<PropertyDto>>>
            CreateProperty([FromBody] PropertyDto propertyDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Datos inválidos"
                    });
                }

                var createdProperty = await _propertyService
                    .CreatePropertyAsync(propertyDto);

                return CreatedAtAction(nameof(GetPropertyById),
                    new { id = createdProperty.Id },
                    new ApiResponse<PropertyDto>
                    {
                        Success = true,
                        Message = "Propiedad creada exitosamente",
                        Data = createdProperty
                    });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error interno del servidor: {ex.Message}"
                });
            }
        }

        /// <summary>
        /// Actualizar propiedad
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<object>>>
            UpdateProperty(string id, [FromBody] PropertyDto propertyDto)
        {
            try
            {
                var existingProperty = await _propertyService
                    .GetPropertyByIdAsync(id);
                if (existingProperty == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Propiedad no encontrada"
                    });
                }

                await _propertyService.UpdatePropertyAsync(id, propertyDto);

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Propiedad actualizada exitosamente"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error interno del servidor: {ex.Message}"
                });
            }
        }

        /// <summary>
        /// Eliminar propiedad
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<object>>>
            DeleteProperty(string id)
        {
            try
            {
                var existingProperty = await _propertyService
                    .GetPropertyByIdAsync(id);
                if (existingProperty == null)
                {
                    return NotFound(new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Propiedad no encontrada"
                    });
                }

                await _propertyService.DeletePropertyAsync(id);

                return Ok(new ApiResponse<object>
                {
                    Success = true,
                    Message = "Propiedad eliminada exitosamente"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error interno del servidor: {ex.Message}"
                });
            }
        }

        /// <summary>
        /// Filtrar propiedades
        /// </summary>
        [HttpPost("filter")]
        public async Task<ActionResult<ApiResponse<IEnumerable<PropertyDto>>>>
            FilterProperties([FromBody] PropertyFilterDto filter)
        {
            try
            {
                var properties = await _propertyService
                    .FilterPropertiesAsync(filter);

                return Ok(new ApiResponse<IEnumerable<PropertyDto>>
                {
                    Success = true,
                    Message = "Propiedades filtradas exitosamente",
                    Data = properties
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<object>
                {
                    Success = false,
                    Message = $"Error interno del servidor: {ex.Message}"
                });
            }
        }
    }
}
```

---

## 🧪 Instalación de Paquetes

```bash
dotnet add package MongoDB.Driver --version 2.20.0
dotnet add package MongoDB.Bson --version 2.20.0
```

O en Package Manager Console:

```powershell
Install-Package MongoDB.Driver -Version 2.20.0
Install-Package MongoDB.Bson -Version 2.20.0
```

---

## 🚀 Ejecución

### Desarrollo

```bash
dotnet run
# API disponible en http://localhost:5000
```

### Producción

```bash
dotnet run --configuration Release
```

---

## 📖 URLs de API

| Método | Endpoint                 | Descripción                   |
| ------ | ------------------------ | ----------------------------- |
| GET    | `/api/properties`        | Obtener todas las propiedades |
| GET    | `/api/properties/{id}`   | Obtener propiedad por ID      |
| POST   | `/api/properties`        | Crear nueva propiedad         |
| PUT    | `/api/properties/{id}`   | Actualizar propiedad          |
| DELETE | `/api/properties/{id}`   | Eliminar propiedad            |
| POST   | `/api/properties/filter` | Filtrar propiedades           |

---

**Última actualización:** 18 de octubre de 2025  
**Versión .NET:** 8.0+  
**MongoDB.Driver:** 2.20+
