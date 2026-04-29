using AutoMapper;
using NetCore8API.Application.DTOs;
using NetCore8API.Domain.Entities;
using NetCore8API.Domain.Interfaces;

namespace NetCore8API.Application.Services;

public interface IMunicipioService
{
    Task<IEnumerable<MunicipioDto>> GetTodosLosMunicipiosAsync();
    Task<MunicipioDto?> GetMunicipioPorIdAsync(int id);
    Task<MunicipioDetalleDto?> GetMunicipioConDetallesAsync(int id);
    Task<IEnumerable<MunicipioConAsentamientosDto>> GetMunicipiosConAsentamientosAsync();
    Task<MunicipioDto> CrearMunicipioAsync(CreateMunicipioDto createDto);
    Task<MunicipioDto> ActualizarMunicipioAsync(int id, UpdateMunicipioDto updateDto);
    Task<bool> EliminarMunicipioAsync(int id);
}

public class MunicipioService : IMunicipioService
{
    private readonly IMunicipioRepository _municipioRepository;
    private readonly IMapper _mapper;

    public MunicipioService(IMunicipioRepository municipioRepository, IMapper mapper)
    {
        _municipioRepository = municipioRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<MunicipioDto>> GetTodosLosMunicipiosAsync()
    {
        var municipios = await _municipioRepository.GetMunicipiosConAsentamientosAsync();
        return _mapper.Map<IEnumerable<MunicipioDto>>(municipios);
    }

    public async Task<MunicipioDto?> GetMunicipioPorIdAsync(int id)
    {
        var municipio = await _municipioRepository.GetByIdAsync(id);
        return municipio != null ? _mapper.Map<MunicipioDto>(municipio) : null;
    }

    public async Task<MunicipioDetalleDto?> GetMunicipioConDetallesAsync(int id)
    {
        var municipio = await _municipioRepository.GetMunicipioConDetallesAsync(id);
        return municipio != null ? _mapper.Map<MunicipioDetalleDto>(municipio) : null;
    }

    public async Task<IEnumerable<MunicipioConAsentamientosDto>> GetMunicipiosConAsentamientosAsync()
    {
        var municipios = await _municipioRepository.GetMunicipiosConAsentamientosAsync();
        return _mapper.Map<IEnumerable<MunicipioConAsentamientosDto>>(municipios);
    }

    public async Task<MunicipioDto> CrearMunicipioAsync(CreateMunicipioDto createDto)
    {
        var municipio = _mapper.Map<Municipio>(createDto);
        var municipioCreado = await _municipioRepository.AddAsync(municipio);
        return _mapper.Map<MunicipioDto>(municipioCreado);
    }

    public async Task<MunicipioDto> ActualizarMunicipioAsync(int id, UpdateMunicipioDto updateDto)
    {
        var municipio = await _municipioRepository.GetByIdAsync(id);
        if (municipio == null)
            throw new ArgumentException("Municipio no encontrado");

        _mapper.Map(updateDto, municipio);
        municipio.UpdatedAt = DateTime.UtcNow;

        var municipioActualizado = await _municipioRepository.UpdateAsync(municipio);
        return _mapper.Map<MunicipioDto>(municipioActualizado);
    }

    public async Task<bool> EliminarMunicipioAsync(int id)
    {
        return await _municipioRepository.DeleteAsync(id);
    }
}

public interface IAlbergueService
{
    Task<IEnumerable<AlbergueDto>> GetTodosLosAlberguesAsync();
    Task<IEnumerable<AlbergueDto>> GetAlberguesDisponiblesAsync();
    Task<IEnumerable<AlbergueDto>> GetAlberguesPorMunicipioAsync(int municipioId);
    Task<AlbergueDto?> GetAlberguePorIdAsync(int id);
    Task<AlbergueDto> CrearAlbergueAsync(CreateAlbergueDto createDto);
    Task<AlbergueDto?> ActualizarAlbergueAsync(int id, UpdateAlbergueDto updateDto);
    Task<bool> ActualizarCapacidadAsync(int id, int nuevaCapacidad);
    Task<bool> EliminarAlbergueAsync(int id);
    Task<EstadisticasAlberguesDto> GetEstadisticasAsync();
}

public class AlbergueService : IAlbergueService
{
    private readonly IAlbergueRepository _albergueRepository;
    private readonly IPersonaRepository _personaRepository;
    private readonly IMapper _mapper;

    public AlbergueService(IAlbergueRepository albergueRepository, IPersonaRepository personaRepository, IMapper mapper)
    {
        _albergueRepository = albergueRepository;
        _personaRepository = personaRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AlbergueDto>> GetTodosLosAlberguesAsync()
    {
        var albergues = await _albergueRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<AlbergueDto>>(albergues);
    }

    public async Task<IEnumerable<AlbergueDto>> GetAlberguesDisponiblesAsync()
    {
        var albergues = await _albergueRepository.GetAlberguesDisponiblesAsync();
        return _mapper.Map<IEnumerable<AlbergueDto>>(albergues);
    }

    public async Task<IEnumerable<AlbergueDto>> GetAlberguesPorMunicipioAsync(int municipioId)
    {
        var albergues = await _albergueRepository.GetAlberguesPorMunicipioAsync(municipioId);
        return _mapper.Map<IEnumerable<AlbergueDto>>(albergues);
    }

    public async Task<AlbergueDto?> GetAlberguePorIdAsync(int id)
    {
        var albergue = await _albergueRepository.GetByIdAsync(id);
        return albergue != null ? _mapper.Map<AlbergueDto>(albergue) : null;
    }

    public async Task<AlbergueDto> CrearAlbergueAsync(CreateAlbergueDto createDto)
    {
        var albergue = _mapper.Map<Albergue>(createDto);
        var albergueCreado = await _albergueRepository.AddAsync(albergue);
        return _mapper.Map<AlbergueDto>(albergueCreado);
    }

    public async Task<AlbergueDto?> ActualizarAlbergueAsync(int id, UpdateAlbergueDto updateDto)
    {
        var albergueExistente = await _albergueRepository.GetByIdAsync(id);
        if (albergueExistente == null)
            return null;

        // Mapear los datos actualizados al albergue existente
        _mapper.Map(updateDto, albergueExistente);
        albergueExistente.UpdatedAt = DateTime.UtcNow;

        var albergueActualizado = await _albergueRepository.UpdateAsync(albergueExistente);
        return _mapper.Map<AlbergueDto>(albergueActualizado);
    }

    public async Task<bool> ActualizarCapacidadAsync(int id, int nuevaCapacidad)
    {
        return await _albergueRepository.ActualizarCapacidadAsync(id, nuevaCapacidad);
    }

    public async Task<bool> EliminarAlbergueAsync(int id)
    {
        return await _albergueRepository.DeleteAsync(id);
    }

    public async Task<EstadisticasAlberguesDto> GetEstadisticasAsync()
    {
        var albergues = await _albergueRepository.GetAllAsync();
        
        var total = albergues.Count();
        var activos = albergues.Count(a => a.Estado == "Activo");
        var llenos = albergues.Count(a => a.Estado == "Lleno");
        var inactivos = albergues.Count(a => a.Estado == "Inactivo");
        
        var capacidadTotal = albergues.Sum(a => a.CapacidadMaxima);
        
        // Calcular la ocupación real basándose en las personas asignadas a los albergues
        var personasAlojadas = 0;
        foreach (var albergue in albergues)
        {
            var personasEnAlbergue = await _personaRepository.GetPersonasPaginadasAsync(1, int.MaxValue, null, albergue.Id);
            var cantidadPersonas = personasEnAlbergue.Count();
            personasAlojadas += cantidadPersonas;
            
            // Actualizar la capacidad actual del albergue
            if (albergue.CapacidadActual != cantidadPersonas)
            {
                albergue.CapacidadActual = cantidadPersonas;
                await _albergueRepository.UpdateAsync(albergue);
            }
        }
        
        var ocupacionGeneral = capacidadTotal > 0 ? (double)personasAlojadas / capacidadTotal * 100 : 0;

        return new EstadisticasAlberguesDto
        {
            Total = total,
            Activos = activos,
            Llenos = llenos,
            Inactivos = inactivos,
            OcupacionGeneral = Math.Round(ocupacionGeneral, 1),
            CapacidadTotal = capacidadTotal,
            PersonasAlojadas = personasAlojadas
        };
    }
}

public interface IGrupoFamiliarService
{
    Task<IEnumerable<GrupoFamiliarDto>> GetGruposPorAlbergueAsync(int albergueId);
    Task<GrupoFamiliarDto?> GetGrupoPorIdAsync(int id);
    Task<GrupoFamiliarDto> CrearGrupoFamiliarAsync(CreateGrupoFamiliarDto createDto);
    Task<GrupoFamiliarDto> CrearGrupoConPersonaExistenteAsync(CreateGrupoFamiliarConPersonaExistenteDto createDto);
    Task<bool> EliminarGrupoAsync(int id);
    Task<IEnumerable<object>> GetMiembrosGrupoFamiliarAsync(int grupoFamiliarId);
}

public class GrupoFamiliarService : IGrupoFamiliarService
{
    private readonly IGrupoFamiliarRepository _grupoRepository;
    private readonly IPersonaRepository _personaRepository;
    private readonly IMapper _mapper;

    public GrupoFamiliarService(
        IGrupoFamiliarRepository grupoRepository, 
        IPersonaRepository personaRepository,
        IMapper mapper)
    {
        _grupoRepository = grupoRepository;
        _personaRepository = personaRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<GrupoFamiliarDto>> GetGruposPorAlbergueAsync(int albergueId)
    {
        var grupos = await _grupoRepository.GetGruposPorAlbergueAsync(albergueId);
        return _mapper.Map<IEnumerable<GrupoFamiliarDto>>(grupos);
    }

    public async Task<GrupoFamiliarDto?> GetGrupoPorIdAsync(int id)
    {
        var grupo = await _grupoRepository.GetGrupoConMiembrosAsync(id);
        return grupo != null ? _mapper.Map<GrupoFamiliarDto>(grupo) : null;
    }

    public async Task<GrupoFamiliarDto> CrearGrupoFamiliarAsync(CreateGrupoFamiliarDto createDto)
    {
        // Crear el grupo familiar
        var grupo = new GrupoFamiliar
        {
            CodigoGrupo = await _grupoRepository.GenerarCodigoGrupoAsync(),
            AlbergueId = createDto.AlbergueId,
            RequiereAyudaEspecial = createDto.RequiereAyudaEspecial,
            DescripcionSituacion = createDto.DescripcionSituacion,
            TipoAyudaRequerida = createDto.TipoAyudaRequerida,
            NumeroMiembros = createDto.Miembros.Count,
            FechaRegistro = DateTime.UtcNow
        };

        var grupoCreado = await _grupoRepository.AddAsync(grupo);

        // Crear los miembros del grupo
        var miembros = new List<Persona>();
        bool esPrimerMiembro = true;

        foreach (var miembroDto in createDto.Miembros)
        {
            var persona = _mapper.Map<Persona>(miembroDto);
            persona.GrupoFamiliarId = grupoCreado.Id;
            persona.EsCabezaFamilia = esPrimerMiembro;
            persona.AlbergueActualId = createDto.AlbergueId;
            
            // Generar código único para cada persona
            if (string.IsNullOrEmpty(persona.CodigoPersona))
            {
                persona.CodigoPersona = await _personaRepository.GenerarCodigoUnicoAsync();
            }
            
            if (esPrimerMiembro)
            {
                persona.Parentesco = "Jefe de familia";
                grupoCreado.CabezaFamiliaId = persona.Id;
            }

            var personaCreada = await _personaRepository.AddAsync(persona);
            miembros.Add(personaCreada);
            esPrimerMiembro = false;
        }

        // Actualizar el grupo con el ID de la cabeza de familia
        if (miembros.Any())
        {
            grupoCreado.CabezaFamiliaId = miembros.First().Id;
            await _grupoRepository.UpdateAsync(grupoCreado);
        }

        return _mapper.Map<GrupoFamiliarDto>(grupoCreado);
    }

    public async Task<GrupoFamiliarDto> CrearGrupoConPersonaExistenteAsync(CreateGrupoFamiliarConPersonaExistenteDto createDto)
    {
        // Crear el grupo familiar
        var grupo = new GrupoFamiliar
        {
            CodigoGrupo = await _grupoRepository.GenerarCodigoGrupoAsync(),
            CabezaFamiliaId = createDto.CabezaFamiliaId,
            AlbergueId = createDto.AlbergueId,
            RequiereAyudaEspecial = createDto.RequiereAyudaEspecial,
            DescripcionSituacion = createDto.DescripcionSituacion,
            TipoAyudaRequerida = createDto.TipoAyudaRequerida,
            NumeroMiembros = createDto.NuevosMiembros.Count + 1, // +1 por la cabeza de familia
            FechaRegistro = DateTime.UtcNow
        };

        var grupoCreado = await _grupoRepository.AddAsync(grupo);

        // Actualizar la persona existente para ser cabeza de familia
        var cabezaFamilia = await _personaRepository.GetByIdAsync(createDto.CabezaFamiliaId);
        if (cabezaFamilia != null)
        {
            cabezaFamilia.GrupoFamiliarId = grupoCreado.Id;
            cabezaFamilia.EsCabezaFamilia = true;
            cabezaFamilia.Parentesco = "Jefe de familia";
            await _personaRepository.UpdateAsync(cabezaFamilia);
        }

        // Crear los nuevos miembros
        foreach (var miembroDto in createDto.NuevosMiembros)
        {
            var persona = _mapper.Map<Persona>(miembroDto);
            persona.GrupoFamiliarId = grupoCreado.Id;
            persona.EsCabezaFamilia = false;
            persona.AlbergueActualId = createDto.AlbergueId;
            
            // Generar código único para cada nuevo miembro
            if (string.IsNullOrEmpty(persona.CodigoPersona))
            {
                persona.CodigoPersona = await _personaRepository.GenerarCodigoUnicoAsync();
            }
            
            await _personaRepository.AddAsync(persona);
        }

        return _mapper.Map<GrupoFamiliarDto>(grupoCreado);
    }

    public async Task<bool> EliminarGrupoAsync(int id)
    {
        return await _grupoRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<object>> GetMiembrosGrupoFamiliarAsync(int grupoFamiliarId)
    {
        var personas = await _personaRepository.GetPersonasPorGrupoFamiliarAsync(grupoFamiliarId);
        
        return personas.Select(p => new
        {
            id = p.Id,
            numeroIdentificacion = p.CodigoPersona,
            primerNombre = p.Nombre,
            segundoNombre = "",
            primerApellido = p.ApellidoPaterno,
            segundoApellido = p.ApellidoMaterno ?? "",
            fechaNacimiento = DateTime.Now.AddYears(-p.Edad), // Aproximación desde la edad
            genero = p.Sexo,
            telefono = p.TelefonoContacto,
            email = "",
            direccionAnterior = p.DireccionAnterior ?? "",
            municipioOrigen = p.Municipio?.Nombre ?? "",
            asentamientoOrigen = p.AsentamientoNombre ?? "",
            grupoFamiliar = new
            {
                id = p.GrupoFamiliarId,
                nombre = $"Grupo Familiar {p.GrupoFamiliarId}",
                cantidadMiembros = 1,
                observaciones = p.EsCabezaFamilia ? "Jefe de familia" : "Miembro"
            },
            fechaRegistro = p.CreatedAt,
            estado = p.EstadoPersona,
            albergueId = p.AlbergueActualId,
            albergueNombre = p.AlbergueActual?.Nombre ?? "",
            observaciones = p.Observaciones ?? ""
        });
    }
}