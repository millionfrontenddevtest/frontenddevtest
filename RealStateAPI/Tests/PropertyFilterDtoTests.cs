using NUnit.Framework;
using RealStateAPI.DTOs;

namespace RealStateAPI.Tests
{
    /// <summary>
    /// Pruebas unitarias para PropertyFilterDto
    /// </summary>
    [TestFixture]
    public class PropertyFilterDtoTests
    {
        [Test]
        public void IsValid_WithNullValues_ShouldReturnTrue()
        {
            // Arrange
            var filter = new PropertyFilterDto();

            // Act
            var result = filter.IsValid();

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsValid_WithValidPriceRange_ShouldReturnTrue()
        {
            // Arrange
            var filter = new PropertyFilterDto
            {
                MinPrice = 100000,
                MaxPrice = 500000
            };

            // Act
            var result = filter.IsValid();

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsValid_WithNegativeMinPrice_ShouldReturnFalse()
        {
            // Arrange
            var filter = new PropertyFilterDto
            {
                MinPrice = -100000
            };

            // Act
            var result = filter.IsValid();

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void IsValid_WithNegativeMaxPrice_ShouldReturnFalse()
        {
            // Arrange
            var filter = new PropertyFilterDto
            {
                MaxPrice = -100000
            };

            // Act
            var result = filter.IsValid();

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void IsValid_WithMinPriceGreaterThanMaxPrice_ShouldReturnFalse()
        {
            // Arrange
            var filter = new PropertyFilterDto
            {
                MinPrice = 500000,
                MaxPrice = 100000
            };

            // Act
            var result = filter.IsValid();

            // Assert
            Assert.That(result, Is.False);
        }

        [Test]
        public void IsValid_WithValidNameAndAddress_ShouldReturnTrue()
        {
            // Arrange
            var filter = new PropertyFilterDto
            {
                Name = "Casa Moderna",
                Address = "Calle Principal 123"
            };

            // Act
            var result = filter.IsValid();

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsValid_WithEqualMinAndMaxPrice_ShouldReturnTrue()
        {
            // Arrange
            var filter = new PropertyFilterDto
            {
                MinPrice = 250000,
                MaxPrice = 250000
            };

            // Act
            var result = filter.IsValid();

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsValid_WithAllValidParameters_ShouldReturnTrue()
        {
            // Arrange
            var filter = new PropertyFilterDto
            {
                Name = "Apartamento",
                Address = "Avenida Principal",
                MinPrice = 100000,
                MaxPrice = 500000
            };

            // Act
            var result = filter.IsValid();

            // Assert
            Assert.That(result, Is.True);
        }

        [Test]
        public void IsValid_WithZeroPrices_ShouldReturnTrue()
        {
            // Arrange
            var filter = new PropertyFilterDto
            {
                MinPrice = 0,
                MaxPrice = 0
            };

            // Act
            var result = filter.IsValid();

            // Assert
            Assert.That(result, Is.True);
        }
    }
}
