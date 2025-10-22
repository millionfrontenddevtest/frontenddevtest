using NUnit.Framework;
using Moq;
using Backend.DTOs;
using Backend.Models;
using Backend.Repositories;
using Backend.Services;

namespace Backend.Tests
{
    /// <summary>
    /// Pruebas unitarias para PropertyService
    /// </summary>
    [TestFixture]
    public class PropertyServiceTests
    {
        private Mock<IPropertyRepository> _mockRepository;
        private PropertyService _propertyService;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IPropertyRepository>();
            _propertyService = new PropertyService(_mockRepository.Object);
        }

        [Test]
        public void Constructor_WithNullRepository_ShouldThrowArgumentNullException()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => new PropertyService(null));
        }

        [Test]
        public async Task GetAllPropertiesAsync_ShouldReturnAllPropertiesAsDto()
        {
            // Arrange
            var properties = new List<Property>
            {
                new Property { Id = "1", IdOwner = "owner1", Name = "Casa 1", Address = "Calle 1", Price = 100000 },
                new Property { Id = "2", IdOwner = "owner2", Name = "Casa 2", Address = "Calle 2", Price = 200000 }
            };
            _mockRepository.Setup(r => r.GetAllPropertiesAsync()).ReturnsAsync(properties);

            // Act
            var result = await _propertyService.GetAllPropertiesAsync();

            // Assert
            Assert.That(result.Count(), Is.EqualTo(2));
            _mockRepository.Verify(r => r.GetAllPropertiesAsync(), Times.Once);
        }

        [Test]
        public async Task GetAllPropertiesAsync_WhenNoProperties_ShouldReturnEmptyList()
        {
            // Arrange
            _mockRepository.Setup(r => r.GetAllPropertiesAsync()).ReturnsAsync(new List<Property>());

            // Act
            var result = await _propertyService.GetAllPropertiesAsync();

            // Assert
            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test]
        public async Task GetPropertyByIdAsync_WithValidId_ShouldReturnProperty()
        {
            // Arrange
            var property = new Property
            {
                Id = "507f1f77bcf86cd799439011",
                IdOwner = "owner1",
                Name = "Casa",
                Address = "Calle Principal",
                Price = 150000
            };
            _mockRepository.Setup(r => r.GetPropertyByIdAsync("507f1f77bcf86cd799439011")).ReturnsAsync(property);

            // Act
            var result = await _propertyService.GetPropertyByIdAsync("507f1f77bcf86cd799439011");

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result?.Name, Is.EqualTo("Casa"));
            _mockRepository.Verify(r => r.GetPropertyByIdAsync("507f1f77bcf86cd799439011"), Times.Once);
        }

        [Test]
        public async Task GetPropertyByIdAsync_WithInvalidId_ShouldThrowArgumentException()
        {
            // Act & Assert
            Assert.ThrowsAsync<ArgumentException>(async () => await _propertyService.GetPropertyByIdAsync(""));
        }

        [Test]
        public async Task GetPropertyByIdAsync_WithNonExistentId_ShouldReturnNull()
        {
            // Arrange
            _mockRepository.Setup(r => r.GetPropertyByIdAsync("invalid_id")).ReturnsAsync((Property?)null);

            // Act
            var result = await _propertyService.GetPropertyByIdAsync("invalid_id");

            // Assert
            Assert.That(result, Is.Null);
        }

        [Test]
        public async Task FilterPropertiesAsync_WithValidFilter_ShouldReturnFilteredProperties()
        {
            // Arrange
            var filter = new PropertyFilterDto { Name = "Casa", MinPrice = 100000, MaxPrice = 200000 };
            var properties = new List<Property>
            {
                new Property { Id = "1", IdOwner = "owner1", Name = "Casa 1", Address = "Calle 1", Price = 150000 }
            };
            _mockRepository.Setup(r => r.FilterPropertiesAsync(filter)).ReturnsAsync(properties);

            // Act
            var result = await _propertyService.FilterPropertiesAsync(filter);

            // Assert
            Assert.That(result.Count(), Is.EqualTo(1));
            _mockRepository.Verify(r => r.FilterPropertiesAsync(filter), Times.Once);
        }

        [Test]
        public async Task FilterPropertiesAsync_WithNullFilter_ShouldThrowArgumentNullException()
        {
            // Act & Assert
            Assert.ThrowsAsync<ArgumentNullException>(async () => await _propertyService.FilterPropertiesAsync(null));
        }

        [Test]
        public async Task FilterPropertiesAsync_WithInvalidFilter_ShouldThrowArgumentException()
        {
            // Arrange
            var filter = new PropertyFilterDto { MinPrice = 500000, MaxPrice = 100000 };

            // Act & Assert
            Assert.ThrowsAsync<ArgumentException>(async () => await _propertyService.FilterPropertiesAsync(filter));
        }

        [Test]
        public async Task FilterPropertiesAsync_WithEmptyResult_ShouldReturnEmptyList()
        {
            // Arrange
            var filter = new PropertyFilterDto { Name = "NoExiste" };
            _mockRepository.Setup(r => r.FilterPropertiesAsync(filter)).ReturnsAsync(new List<Property>());

            // Act
            var result = await _propertyService.FilterPropertiesAsync(filter);

            // Assert
            Assert.That(result.Count(), Is.EqualTo(0));
        }

        [Test]
        public async Task FilterPropertiesAsync_WithOnlyNameFilter_ShouldReturnMatchingProperties()
        {
            // Arrange
            var filter = new PropertyFilterDto { Name = "Apartamento" };
            var properties = new List<Property>
            {
                new Property { Id = "1", IdOwner = "owner1", Name = "Apartamento A", Address = "Calle A", Price = 100000 },
                new Property { Id = "2", IdOwner = "owner2", Name = "Apartamento B", Address = "Calle B", Price = 120000 }
            };
            _mockRepository.Setup(r => r.FilterPropertiesAsync(filter)).ReturnsAsync(properties);

            // Act
            var result = await _propertyService.FilterPropertiesAsync(filter);

            // Assert
            Assert.That(result.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task FilterPropertiesAsync_WithPriceRangeFilter_ShouldReturnPropertiesInRange()
        {
            // Arrange
            var filter = new PropertyFilterDto { MinPrice = 100000, MaxPrice = 200000 };
            var properties = new List<Property>
            {
                new Property { Id = "1", IdOwner = "owner1", Name = "Casa", Address = "Calle", Price = 150000 }
            };
            _mockRepository.Setup(r => r.FilterPropertiesAsync(filter)).ReturnsAsync(properties);

            // Act
            var result = await _propertyService.FilterPropertiesAsync(filter);

            // Assert
            Assert.That(result.Count(), Is.EqualTo(1));
            Assert.That(result.First().Price, Is.GreaterThanOrEqualTo(100000).And.LessThanOrEqualTo(200000));
        }
    }
}
