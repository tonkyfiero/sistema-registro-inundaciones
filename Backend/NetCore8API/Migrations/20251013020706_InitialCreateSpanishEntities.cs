using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NetCore8API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreateSpanishEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "condiciones_medicas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tipo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    categoria = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false, defaultValue: "Otro"),
                    requiere_atencion_especial = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    activa = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_condiciones_medicas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "municipios",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    estado = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false, defaultValue: "Veracruz"),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_municipios", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "albergues",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    direccion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    municipio_id = table.Column<int>(type: "int", nullable: false),
                    asentamiento = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    capacidad_maxima = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    capacidad_actual = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    servicios = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    contacto_telefono = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    contacto_email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    responsable = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    estado = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false, defaultValue: "Activo"),
                    fecha_apertura = table.Column<DateTime>(type: "datetime2", nullable: false),
                    latitud = table.Column<decimal>(type: "decimal(10,8)", nullable: true),
                    longitud = table.Column<decimal>(type: "decimal(11,8)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_albergues", x => x.id);
                    table.CheckConstraint("CHK_capacidad", "capacidad_actual <= capacidad_maxima");
                    table.CheckConstraint("CHK_capacidad_positiva", "capacidad_maxima > 0");
                    table.ForeignKey(
                        name: "FK_albergues_municipios_municipio_id",
                        column: x => x.municipio_id,
                        principalTable: "municipios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "asentamientos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    municipio_id = table.Column<int>(type: "int", nullable: false),
                    tipo_asentamiento = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false, defaultValue: "Colonia"),
                    ambito = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false, defaultValue: "Urbano"),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_asentamientos", x => x.id);
                    table.ForeignKey(
                        name: "FK_asentamientos_municipios_municipio_id",
                        column: x => x.municipio_id,
                        principalTable: "municipios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "grupos_familiares",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    codigo_grupo = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    cabeza_familia_id = table.Column<int>(type: "int", nullable: true),
                    albergue_id = table.Column<int>(type: "int", nullable: false),
                    numero_miembros = table.Column<int>(type: "int", nullable: false, defaultValue: 1),
                    fecha_registro = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    requiere_ayuda_especial = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    descripcion_situacion = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tipo_ayuda_requerida = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    estado_grupo = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false, defaultValue: "Activo"),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_grupos_familiares", x => x.id);
                    table.ForeignKey(
                        name: "FK_grupos_familiares_albergues_albergue_id",
                        column: x => x.albergue_id,
                        principalTable: "albergues",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    password_hash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    role = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false, defaultValue: "Visitante"),
                    albergue_id = table.Column<int>(type: "int", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    last_login = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuarios", x => x.id);
                    table.ForeignKey(
                        name: "FK_usuarios_albergues_albergue_id",
                        column: x => x.albergue_id,
                        principalTable: "albergues",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "personas",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    codigo_persona = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    apellido_paterno = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    apellido_materno = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    edad = table.Column<int>(type: "int", nullable: false),
                    sexo = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    municipio_id = table.Column<int>(type: "int", nullable: false),
                    asentamiento_nombre = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    direccion_anterior = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_hora_llegada = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    fecha_hora_salida = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ultima_actualizacion = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    es_cabeza_familia = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    grupo_familiar_id = table.Column<int>(type: "int", nullable: true),
                    parentesco = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    contacto_emergencia = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    albergue_actual_id = table.Column<int>(type: "int", nullable: true),
                    estado_persona = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false, defaultValue: "Registrado"),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    documento_identidad = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    telefono_contacto = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_personas", x => x.id);
                    table.CheckConstraint("CHK_edad_valida", "edad >= 0 AND edad <= 120");
                    table.ForeignKey(
                        name: "FK_personas_albergues_albergue_actual_id",
                        column: x => x.albergue_actual_id,
                        principalTable: "albergues",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_personas_grupos_familiares_grupo_familiar_id",
                        column: x => x.grupo_familiar_id,
                        principalTable: "grupos_familiares",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_personas_municipios_municipio_id",
                        column: x => x.municipio_id,
                        principalTable: "municipios",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "persona_condiciones",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    persona_id = table.Column<int>(type: "int", nullable: false),
                    condicion_id = table.Column<int>(type: "int", nullable: false),
                    descripcion_especifica = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    medicamentos = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    alergias = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    requerimientos_especiales = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fecha_diagnostico = table.Column<DateTime>(type: "datetime2", nullable: true),
                    es_critica = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    observaciones_medicas = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_persona_condiciones", x => x.id);
                    table.ForeignKey(
                        name: "FK_persona_condiciones_condiciones_medicas_condicion_id",
                        column: x => x.condicion_id,
                        principalTable: "condiciones_medicas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_persona_condiciones_personas_persona_id",
                        column: x => x.persona_id,
                        principalTable: "personas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_albergues_municipio_id",
                table: "albergues",
                column: "municipio_id");

            migrationBuilder.CreateIndex(
                name: "IX_asentamientos_municipio_id",
                table: "asentamientos",
                column: "municipio_id");

            migrationBuilder.CreateIndex(
                name: "IX_asentamientos_nombre_municipio_id",
                table: "asentamientos",
                columns: new[] { "nombre", "municipio_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_condiciones_medicas_tipo",
                table: "condiciones_medicas",
                column: "tipo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_grupos_familiares_albergue_id",
                table: "grupos_familiares",
                column: "albergue_id");

            migrationBuilder.CreateIndex(
                name: "IX_grupos_familiares_codigo_grupo",
                table: "grupos_familiares",
                column: "codigo_grupo",
                unique: true,
                filter: "[codigo_grupo] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_municipios_nombre",
                table: "municipios",
                column: "nombre",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_persona_condiciones_condicion_id",
                table: "persona_condiciones",
                column: "condicion_id");

            migrationBuilder.CreateIndex(
                name: "IX_persona_condiciones_persona_id_condicion_id",
                table: "persona_condiciones",
                columns: new[] { "persona_id", "condicion_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_personas_albergue_actual_id",
                table: "personas",
                column: "albergue_actual_id");

            migrationBuilder.CreateIndex(
                name: "IX_personas_codigo_persona",
                table: "personas",
                column: "codigo_persona",
                unique: true,
                filter: "[codigo_persona] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_personas_grupo_familiar_id",
                table: "personas",
                column: "grupo_familiar_id");

            migrationBuilder.CreateIndex(
                name: "IX_personas_municipio_id",
                table: "personas",
                column: "municipio_id");

            migrationBuilder.CreateIndex(
                name: "IX_usuarios_albergue_id",
                table: "usuarios",
                column: "albergue_id");

            migrationBuilder.CreateIndex(
                name: "IX_usuarios_email",
                table: "usuarios",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_usuarios_username",
                table: "usuarios",
                column: "username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "asentamientos");

            migrationBuilder.DropTable(
                name: "persona_condiciones");

            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropTable(
                name: "condiciones_medicas");

            migrationBuilder.DropTable(
                name: "personas");

            migrationBuilder.DropTable(
                name: "grupos_familiares");

            migrationBuilder.DropTable(
                name: "albergues");

            migrationBuilder.DropTable(
                name: "municipios");
        }
    }
}
