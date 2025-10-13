using Microsoft.AspNetCore.Mvc;
using NetCore8API.Application.DTOs;
using NetCore8API.Application.Services;

namespace NetCore8API.Controllers;

/// <summary>
/// Controller para gestionar municipios
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class MunicipiosController : ControllerBase
{
    private readonly IMunicipioService _municipioService;

    public MunicipiosController(IMunicipioService municipioService)
    {
        _municipioService = municipioService;
    }

    /// <summary>
    /// Obtiene todos los municipios
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MunicipioDto>>> GetMunicipios()
    {
        try
        {
            var municipios = await _municipioService.GetTodosLosMunicipiosAsync();
            return Ok(municipios);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene un municipio por ID con sus asentamientos y albergues
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<MunicipioDetalleDto>> GetMunicipio(int id)
    {
        try
        {
            var municipio = await _municipioService.GetMunicipioConDetallesAsync(id);
            if (municipio == null)
            {
                return NotFound($"Municipio con ID {id} no encontrado");
            }
            return Ok(municipio);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }

    /// <summary>
    /// Obtiene municipios con sus asentamientos
    /// </summary>
    [HttpGet("con-asentamientos")]
    public async Task<ActionResult<IEnumerable<MunicipioConAsentamientosDto>>> GetMunicipiosConAsentamientos()
    {
        try
        {
            var municipios = await _municipioService.GetMunicipiosConAsentamientosAsync();
            return Ok(municipios);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error interno del servidor: {ex.Message}");
        }
    }
}