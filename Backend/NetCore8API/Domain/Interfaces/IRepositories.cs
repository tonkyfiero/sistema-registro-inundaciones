using NetCore8API.Domain.Entities;

namespace NetCore8API.Domain.Interfaces;

public interface IMunicipioRepository : IRepositoryBase<Municipio>
{
    Task<IEnumerable<Municipio>> GetMunicipiosConAsentamientosAsync();
    Task<Municipio?> GetMunicipioConDetallesAsync(int id);
}

public interface IAsentamientoRepository : IRepositoryBase<Asentamiento>
{
    Task<IEnumerable<Asentamiento>> GetAsentamientosPorMunicipioAsync(int municipioId);
}

public interface IAlbergueRepository : IRepositoryBase<Albergue>
{
    Task<IEnumerable<Albergue>> GetAlberguesDisponiblesAsync();
    Task<IEnumerable<Albergue>> GetAlberguesPorMunicipioAsync(int municipioId);
    Task<bool> ActualizarCapacidadAsync(int id, int nuevaCapacidad);
}

public interface IPersonaRepository : IRepositoryBase<Persona>
{
    Task<IEnumerable<Persona>> BuscarPersonasAsync(string termino);
    Task<IEnumerable<Persona>> GetPersonasPaginadasAsync(int pagina, int tamanoPagina, int? municipioId = null, int? albergueId = null);
    Task<bool> AsignarAlbergueAsync(int personaId, int albergueId);
    Task<string> GenerarCodigoUnicoAsync();
    Task<IEnumerable<Persona>> GetPersonasPorGrupoFamiliarAsync(int grupoFamiliarId);
}

public interface IGrupoFamiliarRepository : IRepositoryBase<GrupoFamiliar>
{
    Task<IEnumerable<GrupoFamiliar>> GetGruposPorAlbergueAsync(int albergueId);
    Task<GrupoFamiliar?> GetGrupoConMiembrosAsync(int id);
    Task<string> GenerarCodigoGrupoAsync();
}

public interface ICondicionMedicaRepository : IRepositoryBase<CondicionMedica>
{
    Task<IEnumerable<CondicionMedica>> GetCondicionesActivasAsync();
}

public interface IUsuarioRepository : IRepositoryBase<Usuario>
{
    Task<Usuario?> GetUsuarioPorUsernameAsync(string username);
    Task<Usuario?> GetUsuarioPorEmailAsync(string email);
}