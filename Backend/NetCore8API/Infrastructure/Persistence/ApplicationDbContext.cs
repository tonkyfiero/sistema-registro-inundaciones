using Microsoft.EntityFrameworkCore;
using NetCore8API.Domain.Entities;

namespace NetCore8API.Infrastructure.Persistence;

/// <summary>
/// Contexto de base de datos para el sistema de registro de personas afectadas por inundaciones
/// </summary>
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    // DbSets
    public DbSet<Municipio> Municipios { get; set; }
    public DbSet<Asentamiento> Asentamientos { get; set; }
    public DbSet<Albergue> Albergues { get; set; }
    public DbSet<Persona> Personas { get; set; }
    public DbSet<GrupoFamiliar> GruposFamiliares { get; set; }
    public DbSet<CondicionMedica> CondicionesMedicas { get; set; }
    public DbSet<PersonaCondicionMedica> PersonasCondicionesMedicas { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuración de Municipio
        modelBuilder.Entity<Municipio>(entity =>
        {
            entity.HasIndex(e => e.Nombre).IsUnique();
            entity.Property(e => e.Estado).HasDefaultValue("Veracruz");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETDATE()");
        });

        // Configuración de Asentamiento
        modelBuilder.Entity<Asentamiento>(entity =>
        {
            entity.HasIndex(e => new { e.Nombre, e.MunicipioId }).IsUnique();
            entity.Property(e => e.TipoAsentamiento).HasDefaultValue("Colonia");
            entity.Property(e => e.Ambito).HasDefaultValue("Urbano");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            
            entity.HasOne(d => d.Municipio)
                  .WithMany(p => p.Asentamientos)
                  .HasForeignKey(d => d.MunicipioId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // Configuración de Albergue
        modelBuilder.Entity<Albergue>(entity =>
        {
            entity.Property(e => e.Estado).HasDefaultValue("Activo");
            entity.Property(e => e.CapacidadMaxima).HasDefaultValue(0);
            entity.Property(e => e.CapacidadActual).HasDefaultValue(0);
            entity.Property(e => e.Latitud).HasColumnType("decimal(10,8)");
            entity.Property(e => e.Longitud).HasColumnType("decimal(11,8)");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETDATE()");
            
            entity.HasOne(d => d.Municipio)
                  .WithMany(p => p.Albergues)
                  .HasForeignKey(d => d.MunicipioId)
                  .OnDelete(DeleteBehavior.Restrict);

            // Constraint para capacidades
            entity.ToTable(t => t.HasCheckConstraint("CHK_capacidad", "capacidad_actual <= capacidad_maxima"));
            entity.ToTable(t => t.HasCheckConstraint("CHK_capacidad_positiva", "capacidad_maxima > 0"));
        });

        // Configuración de GrupoFamiliar
        modelBuilder.Entity<GrupoFamiliar>(entity =>
        {
            entity.HasIndex(e => e.CodigoGrupo).IsUnique();
            entity.Property(e => e.EstadoGrupo).HasDefaultValue("Activo");
            entity.Property(e => e.NumeroMiembros).HasDefaultValue(1);
            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("GETDATE()");
            entity.Property(e => e.RequiereAyudaEspecial).HasDefaultValue(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETDATE()");
            
            entity.HasOne(d => d.Albergue)
                  .WithMany(p => p.GruposFamiliares)
                  .HasForeignKey(d => d.AlbergueId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // Configuración de Persona
        modelBuilder.Entity<Persona>(entity =>
        {
            entity.HasIndex(e => e.CodigoPersona).IsUnique();
            entity.Property(e => e.EstadoPersona).HasDefaultValue("Registrado");
            entity.Property(e => e.FechaHoraLlegada).HasDefaultValueSql("GETDATE()");
            entity.Property(e => e.UltimaActualizacion).HasDefaultValueSql("GETDATE()");
            entity.Property(e => e.EsCabezaFamilia).HasDefaultValue(false);
            entity.Property(e => e.ContactoEmergencia).HasDefaultValue(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETDATE()");
            
            entity.HasOne(d => d.Municipio)
                  .WithMany()
                  .HasForeignKey(d => d.MunicipioId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(d => d.GrupoFamiliar)
                  .WithMany(p => p.Miembros)
                  .HasForeignKey(d => d.GrupoFamiliarId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.HasOne(d => d.AlbergueActual)
                  .WithMany(p => p.Personas)
                  .HasForeignKey(d => d.AlbergueActualId)
                  .OnDelete(DeleteBehavior.SetNull);

            // Constraint para edad válida
            entity.ToTable(t => t.HasCheckConstraint("CHK_edad_valida", "edad >= 0 AND edad <= 120"));
        });

        // Configuración de CondicionMedica
        modelBuilder.Entity<CondicionMedica>(entity =>
        {
            entity.HasIndex(e => e.Tipo).IsUnique();
            entity.Property(e => e.Categoria).HasDefaultValue("Otro");
            entity.Property(e => e.RequiereAtencionEspecial).HasDefaultValue(false);
            entity.Property(e => e.Activa).HasDefaultValue(true);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
        });

        // Configuración de PersonaCondicionMedica
        modelBuilder.Entity<PersonaCondicionMedica>(entity =>
        {
            entity.HasIndex(e => new { e.PersonaId, e.CondicionId }).IsUnique();
            entity.Property(e => e.EsCritica).HasDefaultValue(false);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETDATE()");
            
            entity.HasOne(d => d.Persona)
                  .WithMany(p => p.CondicionesMedicas)
                  .HasForeignKey(d => d.PersonaId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(d => d.CondicionMedica)
                  .WithMany(p => p.PersonasCondiciones)
                  .HasForeignKey(d => d.CondicionId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // Configuración de Usuario
        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasIndex(e => e.Username).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Role).HasDefaultValue("Visitante");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            entity.Property(e => e.UpdatedAt).HasDefaultValueSql("GETDATE()");

            entity.HasOne(d => d.Albergue)
                  .WithMany()
                  .HasForeignKey(d => d.AlbergueId)
                  .OnDelete(DeleteBehavior.SetNull);
        });
    }
}