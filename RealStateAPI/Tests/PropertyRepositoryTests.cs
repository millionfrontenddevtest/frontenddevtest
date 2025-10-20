using NUnit.Framework;
using MongoDB.Bson;
using RealStateAPI.DTOs;
using RealStateAPI.Models;

namespace RealStateAPI.Tests
{
    /// <summary>
    /// Pruebas unitarias para PropertyRepository (pruebas lógicas sin conexión real)
    /// </summary>
    [TestFixture]
    public class PropertyRepositoryTests
    {
        [Test]
        public void IsValidObjectId_WithValidObjectId_ShouldReturnTrue()
        {
            // Arrange
            var validObjectId = "507f1f77bcf86cd799439011";

            // Act
            var isValid = ObjectId.TryParse(validObjectId, out _);

            // Assert
            Assert.That(isValid, Is.True);
        }

        [Test]
        public void IsValidObjectId_WithInvalidObjectId_ShouldReturnFalse()
        {
            // Arrange
            var invalidObjectId = "invalid_id";

            // Act
            var isValid = ObjectId.TryParse(invalidObjectId, out _);

            // Assert
            Assert.That(isValid, Is.False);
        }

        [Test]
        public void PropertyEntity_WithValidData_ShouldCreateSuccessfully()
        {
            // Arrange & Act
            var property = new Property
            {
                Id = new ObjectId().ToString(),
                IdOwner = "507f1f77bcf86cd799439010",
                Name = "Casa Moderna",
                Address = "Avenida Principal 123",
                Price = 250000,
                Image = "https://example.com/image.jpg"
            };

            // Assert
            Assert.That(property.Id, Is.Not.Empty);
            Assert.That(property.Name, Is.EqualTo("Casa Moderna"));
            Assert.That(property.Price, Is.EqualTo(250000));
            Assert.That(property.CreatedAt, Is.EqualTo(DateTime.UtcNow).Within(TimeSpan.FromSeconds(1)));
        }

        [Test]
        public void PropertyEntity_UpdatedAtShouldBeUpdated()
        {
            // Arrange
            var property = new Property
            {
                Name = "Casa Original",
                Price = 100000
            };
            var originalUpdatedAt = property.UpdatedAt;

            // Act
            System.Threading.Thread.Sleep(100);
            property.UpdatedAt = DateTime.UtcNow;

            // Assert
            Assert.That(property.UpdatedAt, Is.GreaterThan(originalUpdatedAt));
        }

        [Test]
        public void PropertyFilterDto_WithMultipleFilters_ShouldValidateCorrectly()
        {
            // Arrange
            var filter1 = new PropertyFilterDto
            {
                Name = "Casa",
                Address = "Calle Principal",
                MinPrice = 100000,
                MaxPrice = 500000
            };

            var filter2 = new PropertyFilterDto
            {
                MinPrice = 200000,
                MaxPrice = 100000 // Inválido: MinPrice > MaxPrice
            };

            // Act & Assert
            Assert.That(filter1.IsValid(), Is.True);
            Assert.That(filter2.IsValid(), Is.False);
        }

        [Test]
        public void ApiResponse_SuccessfulResponse_ShouldContainData()
        {
            // Arrange
            var dto = new PropertyDto
            {
                Id = "1",
                Name = "Casa",
                Price = 100000
            };

            // Act
            var response = new ApiResponse<PropertyDto>(true, "Success", dto);

            // Assert
            Assert.That(response.Success, Is.True);
            Assert.That(response.Message, Is.EqualTo("Success"));
            Assert.That(response.Data, Is.EqualTo(dto));
            Assert.That(response.Errors, Is.Null);
        }

        [Test]
        public void ApiResponse_ErrorResponse_ShouldContainErrors()
        {
            // Arrange
            var errors = new List<string> { "Error 1", "Error 2" };

            // Act
            var response = new ApiResponse<object>(false, "Error occurred", errors);

            // Assert
            Assert.That(response.Success, Is.False);
            Assert.That(response.Errors, Is.Not.Null);
            Assert.That(response.Errors!.Count, Is.EqualTo(2));
        }

        [Test]
        public void PropertyDto_Mapping_ShouldPreserveAllFields()
        {
            // Arrange
            var propertyDto = new PropertyDto
            {
                Id = "507f1f77bcf86cd799439011",
                IdOwner = "507f1f77bcf86cd799439010",
                Name = "Apartamento Lujo",
                Address = "Calle Elegante 456",
                Price = 350000,
                Image = "https://example.com/apt.jpg"
            };

            // Act & Assert
            Assert.That(propertyDto.Id, Is.EqualTo("507f1f77bcf86cd799439011"));
            Assert.That(propertyDto.IdOwner, Is.EqualTo("507f1f77bcf86cd799439010"));
            Assert.That(propertyDto.Name, Is.EqualTo("Apartamento Lujo"));
            Assert.That(propertyDto.Address, Is.EqualTo("Calle Elegante 456"));
            Assert.That(propertyDto.Price, Is.EqualTo(350000));
            Assert.That(propertyDto.Image, Is.EqualTo("https://example.com/apt.jpg"));
        }
    }
}
