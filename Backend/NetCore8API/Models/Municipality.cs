using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCore8API.Models;

/// <summary>
/// Representa los municipios donde ocurren las inundaciones
/// </summary>
[Table("municipios")]
public class Municipality
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
    public virtual ICollection<Settlement> Settlements { get; set; } = new List<Settlement>();
}