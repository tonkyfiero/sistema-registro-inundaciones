using Microsoft.EntityFrameworkCore;
using NetCore8API.Domain.Entities;
using NetCore8API.Domain.Interfaces;
using NetCore8API.Infrastructure.Persistence;

namespace NetCore8API.Infrastructure.Repositories;

public class PersonaRepository : RepositoryBase<Persona>, IPersonaRepository
{
    public PersonaRepository(ApplicationDbContext context) : base(context) { }

    public override async Task<Persona?> GetByIdAsync(int id)
    {
        return await _context.Personas
            .Include(p => p.Municipio)
            .Include(p => p.AlbergueActual)
            .Include(p => p.GrupoFamiliar)
            .Include(p => p.CondicionesMedicas)
                .ThenInclude(pcm => pcm.CondicionMedica)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Persona>> BuscarPersonasAsync(string termino)
    {
        return await _context.Personas
            .Include(p => p.Municipio)
            .Include(p => p.AlbergueActual!)
                .ThenInclude(a => a.Municipio)
            .Where(p => p.Nombre.Contains(termino) ||
                       p.ApellidoPaterno.Contains(termino) ||
                       p.ApellidoMaterno!.Contains(termino) ||
                       p.CodigoPersona!.Contains(termino))
            .OrderBy(p => p.ApellidoPaterno)
            .ThenBy(p => p.Nombre)
            .Take(20)
            .ToListAsync();
    }

    public async Task<IEnumerable<Persona>> GetPersonasPaginadasAsync(int pagina, int tamanoPagina, int? municipioId = null, int? albergueId = null)
    {
        var query = _context.Personas
            .Include(p => p.Municipio)
            .Include(p => p.AlbergueActual!)
                .ThenInclude(a => a.Municipio)
            .Include(p => p.GrupoFamiliar)
            .AsQueryable();

        if (municipioId.HasValue)
            query = query.Where(p => p.MunicipioId == municipioId.Value);

        if (albergueId.HasValue)
            query = query.Where(p => p.AlbergueActualId == albergueId.Value);

        return await query
            .OrderBy(p => p.ApellidoPaterno)
            .ThenBy(p => p.Nombre)
            .Skip((pagina - 1) * tamanoPagina)
            .Take(tamanoPagina)
            .ToListAsync();
    }

    public async Task<bool> AsignarAlbergueAsync(int personaId, int albergueId)
    {
        var persona = await _context.Personas.FindAsync(personaId);
        if (persona == null) return false;

        persona.AlbergueActualId = albergueId;
        persona.EstadoPersona = "En_Albergue";
        persona.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<string> GenerarCodigoUnicoAsync()
    {
        string codigo;
        do
        {
            codigo = $"PER{DateTime.Now:yyMMdd}{Random.Shared.Next(1000, 9999)}";
        }
        while (await _context.Personas.AnyAsync(p => p.CodigoPersona == codigo));

        return codigo;
    }

    public async Task<IEnumerable<Persona>> GetPersonasPorGrupoFamiliarAsync(int grupoFamiliarId)
    {
        return await _context.Personas
            .Include(p => p.Municipio)
            .Include(p => p.AlbergueActual)
            .Include(p => p.GrupoFamiliar)
            .Where(p => p.GrupoFamiliarId == grupoFamiliarId)
            .OrderBy(p => p.EsCabezaFamilia ? 0 : 1) // Cabeza de familia primero
            .ThenBy(p => p.Nombre)
            .ToListAsync();
    }
}

public class MunicipioRepository : RepositoryBase<Municipio>, IMunicipioRepository
{
    public MunicipioRepository(ApplicationDbContext context) : base(context) { }

    public async Task<IEnumerable<Municipio>> GetMunicipiosConAsentamientosAsync()
    {
        return await _context.Municipios
            .Include(m => m.Asentamientos)
            .OrderBy(m => m.Nombre)
            .ToListAsync();
    }

    public async Task<Municipio?> GetMunicipioConDetallesAsync(int id)
    {
        return await _context.Municipios
            .Include(m => m.Asentamientos)
            .Include(m => m.Albergues)
            .FirstOrDefaultAsync(m => m.Id == id);
    }
}

public class AlbergueRepository : RepositoryBase<Albergue>, IAlbergueRepository
{
    public AlbergueRepository(ApplicationDbContext context) : base(context) { }

    public override async Task<IEnumerable<Albergue>> GetAllAsync()
    {
        return await _context.Albergues
            .Include(a => a.Municipio)
            .OrderBy(a => a.Municipio.Nombre)
            .ThenBy(a => a.Nombre)
            .ToListAsync();
    }

    public override async Task<Albergue?> GetByIdAsync(int id)
    {
        return await _context.Albergues
            .Include(a => a.Municipio)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<IEnumerable<Albergue>> GetAlberguesDisponiblesAsync()
    {
        return await _context.Albergues
            .Include(a => a.Municipio)
            .Where(a => a.Estado == "Activo" && a.CapacidadActual < a.CapacidadMaxima)
            .OrderBy(a => a.Municipio.Nombre)
            .ThenBy(a => a.Nombre)
            .ToListAsync();
    }

    public async Task<IEnumerable<Albergue>> GetAlberguesPorMunicipioAsync(int municipioId)
    {
        return await _context.Albergues
            .Include(a => a.Municipio)
            .Where(a => a.MunicipioId == municipioId)
            .OrderBy(a => a.Nombre)
            .ToListAsync();
    }

    public async Task<bool> ActualizarCapacidadAsync(int id, int nuevaCapacidad)
    {
        var albergue = await _context.Albergues.FindAsync(id);
        if (albergue == null || nuevaCapacidad < 0 || nuevaCapacidad > albergue.CapacidadMaxima)
            return false;

        albergue.CapacidadActual = nuevaCapacidad;
        albergue.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return true;
    }
}

public class GrupoFamiliarRepository : RepositoryBase<GrupoFamiliar>, IGrupoFamiliarRepository
{
    public GrupoFamiliarRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<GrupoFamiliar>> GetGruposPorAlbergueAsync(int albergueId)
    {
        return await _context.GruposFamiliares
            .Include(g => g.Albergue)
            .Include(g => g.Miembros)
            .Where(g => g.AlbergueId == albergueId)
            .OrderBy(g => g.FechaRegistro)
            .ToListAsync();
    }

    public async Task<GrupoFamiliar?> GetGrupoConMiembrosAsync(int id)
    {
        return await _context.GruposFamiliares
            .Include(g => g.Albergue)
            .Include(g => g.Miembros)
                .ThenInclude(p => p.Municipio)
            .FirstOrDefaultAsync(g => g.Id == id);
    }

    public async Task<string> GenerarCodigoGrupoAsync()
    {
        var ultimoGrupo = await _context.GruposFamiliares
            .OrderByDescending(g => g.Id)
            .FirstOrDefaultAsync();

        var siguienteNumero = (ultimoGrupo?.Id ?? 0) + 1;
        return $"GF{siguienteNumero:D6}"; // Formato: GF000001
    }
}