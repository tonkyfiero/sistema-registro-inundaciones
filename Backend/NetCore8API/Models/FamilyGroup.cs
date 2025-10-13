using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCore8API.Models;

/// <summary>
/// Representa grupos familiares en los albergues
/// </summary>
[Table("grupos_familiares")]
public class FamilyGroup
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [MaxLength(20)]
    [Column("codigo_grupo")]
    public string? CodigoGrupo { get; set; }

    [Column("cabeza_familia_id")]
    public int? CabezaFamiliaId { get; set; }

    [Required]
    [Column("albergue_id")]
    public int AlbergueId { get; set; }

    [Column("numero_miembros")]
    public int NumeroMiembros { get; set; } = 1;

    [Column("fecha_registro")]
    public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;

    [Column("requiere_ayuda_especial")]
    public bool RequiereAyudaEspecial { get; set; } = false;

    [Column("descripcion_situacion")]
    public string? DescripcionSituacion { get; set; }

    [Column("tipo_ayuda_requerida")]
    public string? TipoAyudaRequerida { get; set; } // JSON como string

    [MaxLength(15)]
    [Column("estado_grupo")]
    public string EstadoGrupo { get; set; } = "Activo";

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    [ForeignKey("AlbergueId")]
    public virtual Shelter Shelter { get; set; } = null!;

    public virtual ICollection<Person> Members { get; set; } = new List<Person>();
}