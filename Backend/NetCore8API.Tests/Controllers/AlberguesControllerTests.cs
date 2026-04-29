using Microsoft.AspNetCore.Mvc;
using Moq;
using NetCore8API.Application.DTOs;
using NetCore8API.Application.Services;
using NetCore8API.Controllers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace NetCore8API.Tests.Controllers
{
    public class AlberguesControllerTests
    {
        private readonly Mock<IAlbergueService> _mockAlbergueService;
        private readonly AlberguesController _controller;

        public AlberguesControllerTests()
        {
            _mockAlbergueService = new Mock<IAlbergueService>();
            _controller = new AlberguesController(_mockAlbergueService.Object);
        }

        [Fact]
        public async Task GetAlbergues_ShouldReturnResult()
        {
            // Arrange
            var mockAlbergues = new List<AlbergueDto>
            {
                new AlbergueDto { Id = 1, Nombre = "Albergue 1" }
            };

            _mockAlbergueService
                .Setup(s => s.GetTodosLosAlberguesAsync())
                .ReturnsAsync(mockAlbergues);

            // Act
            var result = await _controller.GetAlbergues();

            // Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetAlbergue_ShouldReturnResult()
        {
            // Arrange
            var albergueId = 1;
            var mockAlbergue = new AlbergueDto { Id = albergueId, Nombre = "Test" };

            _mockAlbergueService
                .Setup(s => s.GetAlberguePorIdAsync(albergueId))
                .ReturnsAsync(mockAlbergue);

            // Act
            var result = await _controller.GetAlbergue(albergueId);

            // Assert
            Assert.NotNull(result);
        }
    }
}