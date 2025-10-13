using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NetCore8API.Models;

/// <summary>
/// Representa las personas afectadas por inundaciones
/// </summary>
[Table("personas")]
public class Person
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [MaxLength(20)]
    [Column("codigo_persona")]
    public string? CodigoPersona { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("nombre")]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    [Column("apellido_paterno")]
    public string ApellidoPaterno { get; set; } = string.Empty;

    [MaxLength(100)]
    [Column("apellido_materno")]
    public string? ApellidoMaterno { get; set; }

    [Required]
    [Column("edad")]
    public int Edad { get; set; }

    [Required]
    [MaxLength(1)]
    [Column("sexo")]
    public string Sexo { get; set; } = string.Empty; // M, F, O, N

    [Required]
    [Column("municipio_id")]
    public int MunicipioId { get; set; }

    [Required]
    [MaxLength(150)]
    [Column("asentamiento_nombre")]
    public string AsentamientoNombre { get; set; } = string.Empty;

    [Column("direccion_anterior")]
    public string? DireccionAnterior { get; set; }

    // Fechas importantes
    [Column("fecha_hora_llegada")]
    public DateTime FechaHoraLlegada { get; set; } = DateTime.UtcNow;

    [Column("fecha_hora_salida")]
    public DateTime? FechaHoraSalida { get; set; }

    [Column("ultima_actualizacion")]
    public DateTime UltimaActualizacion { get; set; } = DateTime.UtcNow;

    // Información familiar
    [Column("es_cabeza_familia")]
    public bool EsCabezaFamilia { get; set; } = false;

    [Column("grupo_familiar_id")]
    public int? GrupoFamiliarId { get; set; }

    [MaxLength(50)]
    [Column("parentesco")]
    public string? Parentesco { get; set; }

    [Column("contacto_emergencia")]
    public bool ContactoEmergencia { get; set; } = false;

    // Estado en el albergue
    [Column("albergue_actual_id")]
    public int? AlbergueActualId { get; set; }

    [MaxLength(15)]
    [Column("estado_persona")]
    public string EstadoPersona { get; set; } = "Registrado";

    // Información adicional
    [Column("observaciones")]
    public string? Observaciones { get; set; }

    [MaxLength(50)]
    [Column("documento_identidad")]
    public string? DocumentoIdentidad { get; set; }

    [MaxLength(20)]
    [Column("telefono_contacto")]
    public string? TelefonoContacto { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navegación
    [ForeignKey("MunicipioId")]
    public virtual Municipality Municipality { get; set; } = null!;

    [ForeignKey("GrupoFamiliarId")]
    public virtual FamilyGroup? FamilyGroup { get; set; }

    [ForeignKey("AlbergueActualId")]
    public virtual Shelter? CurrentShelter { get; set; }

    public virtual ICollection<PersonMedicalCondition> MedicalConditions { get; set; } = new List<PersonMedicalCondition>();
}