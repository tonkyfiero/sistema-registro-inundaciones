using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCore8API.Domain.Entities;

/// <summary>
/// Representa los usuarios del sistema con diferentes roles
/// </summary>
[Table("usuarios")]
public class Usuario
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("username")]
    public string Username { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("password_hash")]
    public string PasswordHash { get; set; } = string.Empty;

    [MaxLength(10)]
    [Column("role")]
    public string Role { get; set; } = "Visitante";

    [Column("albergue_id")]
    public int? AlbergueId { get; set; }

    [Column("is_active")]
    public bool IsActive { get; set; } = true;

    [Column("last_login")]
    public DateTime? LastLogin { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    [ForeignKey("AlbergueId")]
    public virtual Albergue? Albergue { get; set; }
}