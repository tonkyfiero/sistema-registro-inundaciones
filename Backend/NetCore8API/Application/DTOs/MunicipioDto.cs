namespace NetCore8API.Application.DTOs;

public class MunicipioDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Estado { get; set; } = "Veracruz";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<AsentamientoDto>? Asentamientos { get; set; }
}

public class CreateMunicipioDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Estado { get; set; } = "Veracruz";
}

public class UpdateMunicipioDto
{
    public string Nombre { get; set; } = string.Empty;
    public string Estado { get; set; } = string.Empty;
}

public class MunicipioDetalleDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Estado { get; set; } = "Veracruz";
    public List<AsentamientoDto>? Asentamientos { get; set; }
    public List<AlbergueDto>? Albergues { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class MunicipioConAsentamientosDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Estado { get; set; } = "Veracruz";
    public List<AsentamientoDto>? Asentamientos { get; set; }
}