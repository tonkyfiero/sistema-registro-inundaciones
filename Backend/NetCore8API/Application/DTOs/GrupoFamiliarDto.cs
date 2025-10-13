namespace NetCore8API.Application.DTOs;

public class GrupoFamiliarDto
{
    public int Id { get; set; }
    public string? CodigoGrupo { get; set; }
    public int? CabezaFamiliaId { get; set; }
    public string? CabezaFamiliaNombre { get; set; }
    public int AlbergueId { get; set; }
    public string AlbergueNombre { get; set; } = string.Empty;
    public int NumeroMiembros { get; set; }
    public DateTime FechaRegistro { get; set; }
    public bool RequiereAyudaEspecial { get; set; }
    public string? DescripcionSituacion { get; set; }
    public string? TipoAyudaRequerida { get; set; }
    public string EstadoGrupo { get; set; } = "Activo";
    public List<PersonaDto>? Miembros { get; set; }
}

public class CreateGrupoFamiliarDto
{
    public int AlbergueId { get; set; }
    public bool RequiereAyudaEspecial { get; set; }
    public string? DescripcionSituacion { get; set; }
    public string? TipoAyudaRequerida { get; set; }
    public List<CreatePersonaDto> Miembros { get; set; } = new List<CreatePersonaDto>();
}

public class CreateGrupoFamiliarConPersonaExistenteDto
{
    public int AlbergueId { get; set; }
    public int CabezaFamiliaId { get; set; }
    public bool RequiereAyudaEspecial { get; set; }
    public string? DescripcionSituacion { get; set; }
    public string? TipoAyudaRequerida { get; set; }
    public List<CreatePersonaDto> NuevosMiembros { get; set; } = new List<CreatePersonaDto>();
}