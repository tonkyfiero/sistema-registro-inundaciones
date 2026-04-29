using Microsoft.AspNetCore.Mvc;
using Moq;
using NetCore8API.Application.DTOs;
using NetCore8API.Application.Services;
using NetCore8API.Controllers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace NetCore8API.Tests.Controllers
{
    public class PersonasControllerTests
    {
        private readonly Mock<IPersonaService> _mockPersonaService;
        private readonly PersonasController _controller;

        public PersonasControllerTests()
        {
            _mockPersonaService = new Mock<IPersonaService>();
            _controller = new PersonasController(_mockPersonaService.Object);
        }

        [Fact]
        public async Task GetPersonas_ShouldReturnOkResult_WhenServiceReturnsData()
        {
            // Arrange
            var mockPersonas = new List<PersonaDto>
            {
                new PersonaDto { Id = 1, Nombre = "Juan", ApellidoPaterno = "Pérez", Edad = 30, Sexo = "M" },
                new PersonaDto { Id = 2, Nombre = "María", ApellidoPaterno = "García", Edad = 25, Sexo = "F" }
            };

            _mockPersonaService
                .Setup(s => s.GetPersonasPaginadasAsync(1, 10, null, null, null))
                .ReturnsAsync(mockPersonas);

            // Act
            var result = await _controller.GetPersonas();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var personas = Assert.IsAssignableFrom<IEnumerable<PersonaDto>>(okResult.Value);
            Assert.Equal(2, personas.Count());
        }

        [Fact]
        public async Task GetPersona_ShouldReturnOkResult_WhenPersonExists()
        {
            // Arrange
            var personaId = 1;
            var mockPersona = new PersonaDto { Id = personaId, Nombre = "Juan", ApellidoPaterno = "Pérez" };

            _mockPersonaService
                .Setup(s => s.GetPersonaPorIdAsync(personaId))
                .ReturnsAsync(mockPersona);

            // Act
            var result = await _controller.GetPersona(personaId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var persona = Assert.IsType<PersonaDto>(okResult.Value);
            Assert.Equal(personaId, persona.Id);
            Assert.Equal("Juan", persona.Nombre);
        }

        [Fact]
        public async Task GetPersona_ShouldReturnNotFound_WhenPersonDoesNotExist()
        {
            // Arrange
            var personaId = 999;
            _mockPersonaService
                .Setup(s => s.GetPersonaPorIdAsync(personaId))
                .ReturnsAsync((PersonaDto?)null);

            // Act
            var result = await _controller.GetPersona(personaId);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result.Result);
        }
    }
}