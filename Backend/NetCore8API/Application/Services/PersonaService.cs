using AutoMapper;
using NetCore8API.Application.DTOs;
using NetCore8API.Domain.Entities;
using NetCore8API.Domain.Interfaces;

namespace NetCore8API.Application.Services;

public interface IPersonaService
{
    Task<IEnumerable<PersonaDto>> GetPersonasPaginadasAsync(int pagina, int tamanoPagina, int? municipioId = null, int? albergueId = null, string? busqueda = null);
    Task<PersonaDto?> GetPersonaPorIdAsync(int id);
    Task<IEnumerable<PersonaDto>> BuscarPersonasAsync(string termino);
    Task<PersonaDto> CrearPersonaAsync(CrearPersonaDto createDto);
    Task<PersonaDto> ActualizarPersonaAsync(int id, ActualizarPersonaDto updateDto);
    Task<bool> EliminarPersonaAsync(int id);
    Task<bool> AsignarAlbergueAsync(int personaId, int albergueId);
}

public class PersonaService : IPersonaService
{
    private readonly IPersonaRepository _personaRepository;
    private readonly IAlbergueRepository _albergueRepository;
    private readonly IMapper _mapper;

    public PersonaService(
        IPersonaRepository personaRepository, 
        IAlbergueRepository albergueRepository,
        IMapper mapper)
    {
        _personaRepository = personaRepository;
        _albergueRepository = albergueRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PersonaDto>> GetPersonasPaginadasAsync(int pagina, int tamanoPagina, int? municipioId = null, int? albergueId = null, string? busqueda = null)
    {
        IEnumerable<Persona> personas;
        
        if (!string.IsNullOrEmpty(busqueda))
        {
            personas = await _personaRepository.BuscarPersonasAsync(busqueda);
        }
        else
        {
            personas = await _personaRepository.GetPersonasPaginadasAsync(pagina, tamanoPagina, municipioId, albergueId);
        }

        return _mapper.Map<IEnumerable<PersonaDto>>(personas);
    }

    public async Task<PersonaDto?> GetPersonaPorIdAsync(int id)
    {
        var persona = await _personaRepository.GetByIdAsync(id);
        return persona != null ? _mapper.Map<PersonaDto>(persona) : null;
    }

    public async Task<IEnumerable<PersonaDto>> BuscarPersonasAsync(string termino)
    {
        var personas = await _personaRepository.BuscarPersonasAsync(termino);
        return _mapper.Map<IEnumerable<PersonaDto>>(personas);
    }

    public async Task<PersonaDto> CrearPersonaAsync(CrearPersonaDto createDto)
    {
        var persona = _mapper.Map<Persona>(createDto);
        
        if (string.IsNullOrEmpty(persona.CodigoPersona))
        {
            persona.CodigoPersona = await _personaRepository.GenerarCodigoUnicoAsync();
        }

        var personaCreada = await _personaRepository.AddAsync(persona);
        return _mapper.Map<PersonaDto>(personaCreada);
    }

    public async Task<PersonaDto> ActualizarPersonaAsync(int id, ActualizarPersonaDto updateDto)
    {
        var persona = await _personaRepository.GetByIdAsync(id);
        if (persona == null)
            throw new ArgumentException("Persona no encontrada");

        _mapper.Map(updateDto, persona);
        persona.UpdatedAt = DateTime.UtcNow;

        var personaActualizada = await _personaRepository.UpdateAsync(persona);
        return _mapper.Map<PersonaDto>(personaActualizada);
    }

    public async Task<bool> EliminarPersonaAsync(int id)
    {
        return await _personaRepository.DeleteAsync(id);
    }

    public async Task<bool> AsignarAlbergueAsync(int personaId, int albergueId)
    {
        var albergue = await _albergueRepository.GetByIdAsync(albergueId);
        if (albergue == null || albergue.CapacidadActual >= albergue.CapacidadMaxima)
            return false;

        var exito = await _personaRepository.AsignarAlbergueAsync(personaId, albergueId);
        if (exito)
        {
            await _albergueRepository.ActualizarCapacidadAsync(albergueId, albergue.CapacidadActual + 1);
        }

        return exito;
    }
}