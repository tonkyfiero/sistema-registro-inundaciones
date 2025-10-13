using Microsoft.AspNetCore.Mvc;
using NetCore8API.Application.DTOs;
using NetCore8API.Application.Services;

namespace NetCore8API.Controllers;

/// <summary>
/// Controller para gestionar grupos familiares
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class GruposFamiliaresController : ControllerBase
{
    private readonly IGrupoFamiliarService _grupoFamiliarService;

    public GruposFamiliaresController(IGrupoFamiliarService grupoFamiliarService)
    {
        _grupoFamiliarService = grupoFamiliarService;
    }

    /// <summary>
    /// Obtiene grupos familiares por albergue
    /// </summary>
    [HttpGet("albergue/{albergueId}")]
    public async Task<ActionResult<IEnumerable<GrupoFamiliarDto>>> GetGruposPorAlbergue(int albergueId)
    {
        try
        {
            var grupos = await _grupoFamiliarService.GetGruposPorAlbergueAsync(albergueId);
            return Ok(grupos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene un grupo familiar por ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<GrupoFamiliarDto>> GetGrupo(int id)
    {
        try
        {
            var grupo = await _grupoFamiliarService.GetGrupoPorIdAsync(id);
            if (grupo == null)
            {
                return NotFound($"Grupo familiar con ID {id} no encontrado");
            }
            return Ok(grupo);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Crea un nuevo grupo familiar con todos los miembros
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<GrupoFamiliarDto>> CrearGrupoFamiliar([FromBody] CreateGrupoFamiliarDto createDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!createDto.Miembros.Any())
            {
                return BadRequest("Debe especificar al menos un miembro del grupo familiar");
            }

            var grupoCreado = await _grupoFamiliarService.CrearGrupoFamiliarAsync(createDto);
            return CreatedAtAction(
                nameof(GetGrupo),
                new { id = grupoCreado.Id },
                grupoCreado
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Crea un grupo familiar basado en una persona existente como cabeza de familia
    /// </summary>
    [HttpPost("con-persona-existente")]
    public async Task<ActionResult<GrupoFamiliarDto>> CrearGrupoConPersonaExistente([FromBody] CreateGrupoFamiliarConPersonaExistenteDto createDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var grupoCreado = await _grupoFamiliarService.CrearGrupoConPersonaExistenteAsync(createDto);
            return CreatedAtAction(
                nameof(GetGrupo),
                new { id = grupoCreado.Id },
                grupoCreado
            );
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene los miembros de un grupo familiar
    /// </summary>
    [HttpGet("{id}/miembros")]
    public async Task<ActionResult<IEnumerable<object>>> GetMiembrosGrupoFamiliar(int id)
    {
        try
        {
            var miembros = await _grupoFamiliarService.GetMiembrosGrupoFamiliarAsync(id);
            if (miembros == null || !miembros.Any())
            {
                return Ok(new List<object>()); // Retorna lista vacía en lugar de NotFound
            }

            return Ok(miembros);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Elimina un grupo familiar
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> EliminarGrupo(int id)
    {
        try
        {
            var eliminado = await _grupoFamiliarService.EliminarGrupoAsync(id);
            if (!eliminado)
            {
                return NotFound($"Grupo familiar con ID {id} no encontrado");
            }

            return Ok(new { mensaje = "Grupo familiar eliminado exitosamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
}