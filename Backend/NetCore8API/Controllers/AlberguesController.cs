using Microsoft.AspNetCore.Mvc;
using NetCore8API.Application.DTOs;
using NetCore8API.Application.Services;

namespace NetCore8API.Controllers;

/// <summary>
/// Controller para gestionar albergues
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AlberguesController : ControllerBase
{
    private readonly IAlbergueService _albergueService;

    public AlberguesController(IAlbergueService albergueService)
    {
        _albergueService = albergueService;
    }

    /// <summary>
    /// Obtiene todos los albergues
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlbergueDto>>> GetAlbergues()
    {
        try
        {
            var albergues = await _albergueService.GetTodosLosAlberguesAsync();
            return Ok(albergues);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene un albergue por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<AlbergueDto>> GetAlbergue(int id)
    {
        try
        {
            var albergue = await _albergueService.GetAlberguePorIdAsync(id);
            if (albergue == null)
            {
                return NotFound($"Albergue con ID {id} no encontrado");
            }
            return Ok(albergue);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene albergues disponibles (con capacidad)
    /// </summary>
    [HttpGet("disponibles")]
    public async Task<ActionResult<IEnumerable<AlbergueDto>>> GetAlberguesDisponibles()
    {
        try
        {
            var albergues = await _albergueService.GetAlberguesDisponiblesAsync();
            return Ok(albergues);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene albergues de un municipio específico
    /// </summary>
    [HttpGet("municipio/{municipioId}")]
    public async Task<ActionResult<IEnumerable<AlbergueDto>>> GetAlberguesPorMunicipio(int municipioId)
    {
        try
        {
            var albergues = await _albergueService.GetAlberguesPorMunicipioAsync(municipioId);
            return Ok(albergues);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Crea un nuevo albergue
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<AlbergueDto>> CrearAlbergue([FromBody] CreateAlbergueDto createDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var albergueCreado = await _albergueService.CrearAlbergueAsync(createDto);
            return CreatedAtAction(
                nameof(GetAlbergue), 
                new { id = albergueCreado.Id }, 
                albergueCreado
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Actualiza la capacidad actual de un albergue
    /// </summary>
    [HttpPatch("{id}/capacidad")]
    public async Task<ActionResult> ActualizarCapacidad(int id, [FromBody] ActualizarCapacidadDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var actualizado = await _albergueService.ActualizarCapacidadAsync(id, dto.NuevaCapacidad);
            if (!actualizado)
            {
                return BadRequest("No se pudo actualizar la capacidad. Verifique que el albergue existe y que la nueva capacidad es válida.");
            }

            return Ok(new { mensaje = "Capacidad actualizada exitosamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Actualiza un albergue completo
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<AlbergueDto>> ActualizarAlbergue(int id, [FromBody] UpdateAlbergueDto updateDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var albergueActualizado = await _albergueService.ActualizarAlbergueAsync(id, updateDto);
            if (albergueActualizado == null)
            {
                return NotFound($"Albergue con ID {id} no encontrado");
            }
            
            return Ok(albergueActualizado);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Elimina un albergue
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> EliminarAlbergue(int id)
    {
        try
        {
            var eliminado = await _albergueService.EliminarAlbergueAsync(id);
            if (!eliminado)
            {
                return NotFound($"Albergue con ID {id} no encontrado");
            }

            return Ok(new { mensaje = "Albergue eliminado exitosamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene estadísticas generales de albergues
    /// </summary>
    [HttpGet("estadisticas")]
    public async Task<ActionResult<EstadisticasAlberguesDto>> GetEstadisticas()
    {
        try
        {
            var estadisticas = await _albergueService.GetEstadisticasAsync();
            return Ok(estadisticas);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
}