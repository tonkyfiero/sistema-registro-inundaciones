namespace NetCore8API.Application.DTOs;

public class AlbergueDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Direccion { get; set; } = string.Empty;
    public int MunicipioId { get; set; }
    public string MunicipioNombre { get; set; } = string.Empty;
    public string? Asentamiento { get; set; }
    public int CapacidadMaxima { get; set; }
    public int CapacidadActual { get; set; }
    public int CapacidadDisponible => CapacidadMaxima - CapacidadActual;
    public string? Servicios { get; set; }
    public string? ContactoTelefono { get; set; }
    public string? ContactoEmail { get; set; }
    public string Responsable { get; set; } = string.Empty;
    public string Estado { get; set; } = "Activo";
    public DateTime FechaApertura { get; set; }
    public decimal? Latitud { get; set; }
    public decimal? Longitud { get; set; }
}

public class CreateAlbergueDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Direccion { get; set; } = string.Empty;
    public int MunicipioId { get; set; }
    public string? Asentamiento { get; set; }
    public int CapacidadMaxima { get; set; }
    public string? Servicios { get; set; }
    public string? ContactoTelefono { get; set; }
    public string? ContactoEmail { get; set; }
    public string Responsable { get; set; } = string.Empty;
    public DateTime FechaApertura { get; set; }
    public decimal? Latitud { get; set; }
    public decimal? Longitud { get; set; }
}

public class AsentamientoDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public int MunicipioId { get; set; }
    public string MunicipioNombre { get; set; } = string.Empty;
    public string TipoAsentamiento { get; set; } = "Colonia";
    public string Ambito { get; set; } = "Urbano";
}

public class ActualizarCapacidadDto
{
    public int NuevaCapacidad { get; set; }
}

public class PersonaCondicionMedicaDto
{
    public int Id { get; set; }
    public int CondicionId { get; set; }
    public string TipoCondicion { get; set; } = string.Empty;
    public string? DescripcionEspecifica { get; set; }
    public string? Medicamentos { get; set; }
    public string? Alergias { get; set; }
    public bool EsCritica { get; set; }
}