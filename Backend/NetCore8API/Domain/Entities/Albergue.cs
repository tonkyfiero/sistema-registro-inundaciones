using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCore8API.Domain.Entities;

/// <summary>
/// Representa los albergues/centros de refugio temporal
/// </summary>
[Table("albergues")]
public class Albergue
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    [Column("nombre")]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [Column("direccion")]
    public string Direccion { get; set; } = string.Empty;

    [Required]
    [Column("municipio_id")]
    public int MunicipioId { get; set; }

    [MaxLength(150)]
    [Column("asentamiento")]
    public string? Asentamiento { get; set; }

    [Column("capacidad_maxima")]
    public int CapacidadMaxima { get; set; } = 0;

    [Column("capacidad_actual")]
    public int CapacidadActual { get; set; } = 0;

    [Column("servicios")]
    public string? Servicios { get; set; } // JSON como string

    [MaxLength(20)]
    [Column("contacto_telefono")]
    public string? ContactoTelefono { get; set; }

    [MaxLength(100)]
    [Column("contacto_email")]
    public string? ContactoEmail { get; set; }

    [Required]
    [MaxLength(150)]
    [Column("responsable")]
    public string Responsable { get; set; } = string.Empty;

    [MaxLength(15)]
    [Column("estado")]
    public string Estado { get; set; } = "Activo";

    [Column("fecha_apertura")]
    public DateTime FechaApertura { get; set; }

    [Column("latitud")]
    public decimal? Latitud { get; set; }

    [Column("longitud")]
    public decimal? Longitud { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    [ForeignKey("MunicipioId")]
    public virtual Municipio Municipio { get; set; } = null!;

    public virtual ICollection<Persona> Personas { get; set; } = new List<Persona>();
    public virtual ICollection<GrupoFamiliar> GruposFamiliares { get; set; } = new List<GrupoFamiliar>();
}