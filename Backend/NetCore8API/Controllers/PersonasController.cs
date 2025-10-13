using Microsoft.AspNetCore.Mvc;
using NetCore8API.Application.DTOs;
using NetCore8API.Application.Services;

namespace NetCore8API.Controllers;

/// <summary>
/// Controller para gestionar personas afectadas por inundaciones
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PersonasController : ControllerBase
{
    private readonly IPersonaService _personaService;

    public PersonasController(IPersonaService personaService)
    {
        _personaService = personaService;
    }

    /// <summary>
    /// Obtiene todas las personas con paginación
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PersonaDto>>> GetPersonas(
        [FromQuery] int pagina = 1, 
        [FromQuery] int tamanoPagina = 10,
        [FromQuery] int? municipioId = null,
        [FromQuery] int? albergueId = null)
    {
        try
        {
            var personas = await _personaService.GetPersonasPaginadasAsync(pagina, tamanoPagina, municipioId, albergueId);
            return Ok(personas);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene una persona por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<PersonaDto>> GetPersona(int id)
    {
        try
        {
            var persona = await _personaService.GetPersonaPorIdAsync(id);
            if (persona == null)
            {
                return NotFound($"Persona con ID {id} no encontrada");
            }
            return Ok(persona);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Busca personas por término de búsqueda
    /// </summary>
    [HttpGet("buscar")]
    public async Task<ActionResult<IEnumerable<PersonaDto>>> BuscarPersonas([FromQuery] string termino)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(termino))
            {
                return BadRequest("El término de búsqueda no puede estar vacío");
            }

            var personas = await _personaService.BuscarPersonasAsync(termino);
            return Ok(personas);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Crea una nueva persona
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<PersonaDto>> CrearPersona([FromBody] CrearPersonaDto createDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var persona = await _personaService.CrearPersonaAsync(createDto);
            return CreatedAtAction(nameof(GetPersona), new { id = persona.Id }, persona);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Actualiza una persona existente
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<PersonaDto>> ActualizarPersona(int id, [FromBody] ActualizarPersonaDto updateDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var persona = await _personaService.ActualizarPersonaAsync(id, updateDto);
            if (persona == null)
            {
                return NotFound($"Persona con ID {id} no encontrada");
            }

            return Ok(persona);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Elimina una persona
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> EliminarPersona(int id)
    {
        try
        {
            var eliminado = await _personaService.EliminarPersonaAsync(id);
            if (!eliminado)
            {
                return NotFound($"Persona con ID {id} no encontrada");
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Asigna un albergue a una persona
    /// </summary>
    [HttpPost("{personaId}/asignar-albergue/{albergueId}")]
    public async Task<ActionResult> AsignarAlbergue(int personaId, int albergueId)
    {
        try
        {
            var asignado = await _personaService.AsignarAlbergueAsync(personaId, albergueId);
            if (!asignado)
            {
                return BadRequest("No se pudo asignar el albergue. Verifique que la persona y el albergue existan.");
            }

            return Ok(new { mensaje = "Albergue asignado exitosamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
}