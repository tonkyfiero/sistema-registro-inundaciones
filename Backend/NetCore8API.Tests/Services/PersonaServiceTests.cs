using AutoMapper;
using Moq;
using NetCore8API.Application.DTOs;
using NetCore8API.Application.Services;
using NetCore8API.Domain.Entities;
using NetCore8API.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace NetCore8API.Tests.Services
{
    public class PersonaServiceTests
    {
        private readonly Mock<IPersonaRepository> _mockPersonaRepository;
        private readonly Mock<IAlbergueRepository> _mockAlbergueRepository;
        private readonly Mock<IMapper> _mockMapper;
        private readonly PersonaService _service;

        public PersonaServiceTests()
        {
            _mockPersonaRepository = new Mock<IPersonaRepository>();
            _mockAlbergueRepository = new Mock<IAlbergueRepository>();
            _mockMapper = new Mock<IMapper>();
            _service = new PersonaService(_mockPersonaRepository.Object, _mockAlbergueRepository.Object, _mockMapper.Object);
        }

        [Fact]
        public async Task GetPersonasPaginadasAsync_ShouldReturnPersonas()
        {
            // Arrange
            var personas = new List<Persona>
            {
                new Persona { Id = 1, Nombre = "Juan", ApellidoPaterno = "Pérez" }
            };
            var personaDtos = new List<PersonaDto>
            {
                new PersonaDto { Id = 1, Nombre = "Juan", ApellidoPaterno = "Pérez" }
            };

            _mockPersonaRepository
                .Setup(r => r.GetPersonasPaginadasAsync(1, 10, null, null))
                .ReturnsAsync(personas);

            _mockMapper
                .Setup(m => m.Map<IEnumerable<PersonaDto>>(personas))
                .Returns(personaDtos);

            // Act
            var result = await _service.GetPersonasPaginadasAsync(1, 10, null, null, null);

            // Assert
            Assert.NotNull(result);
            Assert.Single(result);
        }

        [Fact]
        public async Task GetPersonaPorIdAsync_ShouldReturnPersona_WhenExists()
        {
            // Arrange
            var personaId = 1;
            var persona = new Persona { Id = personaId, Nombre = "Juan" };
            var personaDto = new PersonaDto { Id = personaId, Nombre = "Juan" };

            _mockPersonaRepository
                .Setup(r => r.GetByIdAsync(personaId))
                .ReturnsAsync(persona);

            _mockMapper
                .Setup(m => m.Map<PersonaDto>(persona))
                .Returns(personaDto);

            // Act
            var result = await _service.GetPersonaPorIdAsync(personaId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(personaId, result.Id);
        }
    }
}