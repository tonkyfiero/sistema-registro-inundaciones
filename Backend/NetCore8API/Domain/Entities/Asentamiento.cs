using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCore8API.Domain.Entities;

/// <summary>
/// Representa colonias, fraccionamientos, etc. dentro de cada municipio
/// </summary>
[Table("asentamientos")]
public class Asentamiento
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(150)]
    [Column("nombre")]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [Column("municipio_id")]
    public int MunicipioId { get; set; }

    [MaxLength(30)]
    [Column("tipo_asentamiento")]
    public string TipoAsentamiento { get; set; } = "Colonia";

    [MaxLength(10)]
    [Column("ambito")]
    public string Ambito { get; set; } = "Urbano";

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    [ForeignKey("MunicipioId")]
    public virtual Municipio Municipio { get; set; } = null!;
}