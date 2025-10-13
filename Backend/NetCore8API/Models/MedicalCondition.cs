using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCore8API.Models;

/// <summary>
/// Representa las condiciones médicas disponibles
/// </summary>
[Table("condiciones_medicas")]
public class MedicalCondition
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("tipo")]
    public string Tipo { get; set; } = string.Empty;

    [Column("descripcion")]
    public string? Descripcion { get; set; }

    [MaxLength(15)]
    [Column("categoria")]
    public string Categoria { get; set; } = "Otro";

    [Column("requiere_atencion_especial")]
    public bool RequiereAtencionEspecial { get; set; } = false;

    [Column("activa")]
    public bool Activa { get; set; } = true;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}