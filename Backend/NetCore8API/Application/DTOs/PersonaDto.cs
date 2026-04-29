namespace NetCore8API.Application.DTOs;

public class PersonaDto
{
    public int Id { get; set; }
    public string? CodigoPersona { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string ApellidoPaterno { get; set; } = string.Empty;
    public string? ApellidoMaterno { get; set; }
    public int Edad { get; set; }
    public string Sexo { get; set; } = string.Empty;
    public int MunicipioId { get; set; }
    public string MunicipioNombre { get; set; } = string.Empty;
    public string AsentamientoNombre { get; set; } = string.Empty;
    public string? DireccionAnterior { get; set; }
    public DateTime FechaHoraLlegada { get; set; }
    public DateTime? FechaHoraSalida { get; set; }
    public bool EsCabezaFamilia { get; set; }
    public int? GrupoFamiliarId { get; set; }
    public string? Parentesco { get; set; }
    public int? AlbergueActualId { get; set; }
    public string? AlbergueNombre { get; set; }
    public string? AlbergueMunicipioNombre { get; set; }
    public string EstadoPersona { get; set; } = "Registrado";
    public string? Observaciones { get; set; }
    public string? DocumentoIdentidad { get; set; }
    public string? TelefonoContacto { get; set; }
    public List<PersonaCondicionMedicaDto>? CondicionesMedicas { get; set; }
}

public class CreatePersonaDto
{
    public string Nombre { get; set; } = string.Empty;
    public string ApellidoPaterno { get; set; } = string.Empty;
    public string? ApellidoMaterno { get; set; }
    public int Edad { get; set; }
    public string Sexo { get; set; } = string.Empty;
    public int MunicipioId { get; set; }
    public string AsentamientoNombre { get; set; } = string.Empty;
    public string? DireccionAnterior { get; set; }
    public bool EsCabezaFamilia { get; set; } = false;
    public int? GrupoFamiliarId { get; set; }
    public string? Parentesco { get; set; }
    public int? AlbergueId { get; set; }
    public string? Observaciones { get; set; }
    public string? DocumentoIdentidad { get; set; }
    public string? TelefonoContacto { get; set; }
}

public class UpdatePersonaDto
{
    public string Nombre { get; set; } = string.Empty;
    public string ApellidoPaterno { get; set; } = string.Empty;
    public string? ApellidoMaterno { get; set; }
    public int Edad { get; set; }
    public string AsentamientoNombre { get; set; } = string.Empty;
    public string? DireccionAnterior { get; set; }
    public string? Parentesco { get; set; }
    public string EstadoPersona { get; set; } = string.Empty;
    public string? Observaciones { get; set; }
    public string? TelefonoContacto { get; set; }
}

public class CrearPersonaDto
{
    public string Nombre { get; set; } = string.Empty;
    public string ApellidoPaterno { get; set; } = string.Empty;
    public string? ApellidoMaterno { get; set; }
    public int Edad { get; set; }
    public string Sexo { get; set; } = string.Empty;
    public int MunicipioId { get; set; }
    public string AsentamientoNombre { get; set; } = string.Empty;
    public string? DireccionAnterior { get; set; }
    public bool EsCabezaFamilia { get; set; } = false;
    public int? GrupoFamiliarId { get; set; }
    public string? Parentesco { get; set; }
    public int? AlbergueId { get; set; }
    public string? Observaciones { get; set; }
    public string? DocumentoIdentidad { get; set; }
    public string? TelefonoContacto { get; set; }
}

public class ActualizarPersonaDto
{
    public string Nombre { get; set; } = string.Empty;
    public string ApellidoPaterno { get; set; } = string.Empty;
    public string? ApellidoMaterno { get; set; }
    public int Edad { get; set; }
    public string AsentamientoNombre { get; set; } = string.Empty;
    public string? DireccionAnterior { get; set; }
    public string? Parentesco { get; set; }
    public string EstadoPersona { get; set; } = string.Empty;
    public string? Observaciones { get; set; }
    public string? TelefonoContacto { get; set; }
}