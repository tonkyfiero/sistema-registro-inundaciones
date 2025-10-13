using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCore8API.Domain.Entities;

/// <summary>
/// Representa la relación entre personas y condiciones médicas
/// </summary>
[Table("persona_condiciones")]
public class PersonaCondicionMedica
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("persona_id")]
    public int PersonaId { get; set; }

    [Required]
    [Column("condicion_id")]
    public int CondicionId { get; set; }

    [Column("descripcion_especifica")]
    public string? DescripcionEspecifica { get; set; }

    [Column("medicamentos")]
    public string? Medicamentos { get; set; } // JSON como string

    [Column("alergias")]
    public string? Alergias { get; set; } // JSON como string

    [Column("requerimientos_especiales")]
    public string? RequerimientosEspeciales { get; set; } // JSON como string

    [Column("fecha_diagnostico")]
    public DateTime? FechaDiagnostico { get; set; }

    [Column("es_critica")]
    public bool EsCritica { get; set; } = false;

    [Column("observaciones_medicas")]
    public string? ObservacionesMedicas { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    [ForeignKey("PersonaId")]
    public virtual Persona Persona { get; set; } = null!;

    [ForeignKey("CondicionId")]
    public virtual CondicionMedica CondicionMedica { get; set; } = null!;
}