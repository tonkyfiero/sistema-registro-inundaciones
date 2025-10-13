using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCore8API.Domain.Entities;

/// <summary>
/// Representa los municipios donde ocurren las inundaciones
/// </summary>
[Table("municipios")]
public class Municipio
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("nombre")]
    public string Nombre { get; set; } = string.Empty;

    [MaxLength(50)]
    [Column("estado")]
    public string Estado { get; set; } = "Veracruz";

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    public virtual ICollection<Asentamiento> Asentamientos { get; set; } = new List<Asentamiento>();
    public virtual ICollection<Albergue> Albergues { get; set; } = new List<Albergue>();
}