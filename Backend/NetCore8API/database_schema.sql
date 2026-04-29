IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [condiciones_medicas] (
    [id] int NOT NULL IDENTITY,
    [tipo] nvarchar(100) NOT NULL,
    [descripcion] nvarchar(max) NULL,
    [categoria] nvarchar(15) NOT NULL DEFAULT N'Otro',
    [requiere_atencion_especial] bit NOT NULL DEFAULT CAST(0 AS bit),
    [activa] bit NOT NULL DEFAULT CAST(1 AS bit),
    [created_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    CONSTRAINT [PK_condiciones_medicas] PRIMARY KEY ([id])
);
GO

CREATE TABLE [municipios] (
    [id] int NOT NULL IDENTITY,
    [nombre] nvarchar(100) NOT NULL,
    [estado] nvarchar(50) NOT NULL DEFAULT N'Veracruz',
    [created_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    [updated_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    CONSTRAINT [PK_municipios] PRIMARY KEY ([id])
);
GO

CREATE TABLE [albergues] (
    [id] int NOT NULL IDENTITY,
    [nombre] nvarchar(200) NOT NULL,
    [direccion] nvarchar(max) NOT NULL,
    [municipio_id] int NOT NULL,
    [asentamiento] nvarchar(150) NULL,
    [capacidad_maxima] int NOT NULL DEFAULT 0,
    [capacidad_actual] int NOT NULL DEFAULT 0,
    [servicios] nvarchar(max) NULL,
    [contacto_telefono] nvarchar(20) NULL,
    [contacto_email] nvarchar(100) NULL,
    [responsable] nvarchar(150) NOT NULL,
    [estado] nvarchar(15) NOT NULL DEFAULT N'Activo',
    [fecha_apertura] datetime2 NOT NULL,
    [latitud] decimal(10,8) NULL,
    [longitud] decimal(11,8) NULL,
    [created_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    [updated_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    CONSTRAINT [PK_albergues] PRIMARY KEY ([id]),
    CONSTRAINT [CHK_capacidad] CHECK (capacidad_actual <= capacidad_maxima),
    CONSTRAINT [CHK_capacidad_positiva] CHECK (capacidad_maxima > 0),
    CONSTRAINT [FK_albergues_municipios_municipio_id] FOREIGN KEY ([municipio_id]) REFERENCES [municipios] ([id]) ON DELETE NO ACTION
);
GO

CREATE TABLE [asentamientos] (
    [id] int NOT NULL IDENTITY,
    [nombre] nvarchar(150) NOT NULL,
    [municipio_id] int NOT NULL,
    [tipo_asentamiento] nvarchar(30) NOT NULL DEFAULT N'Colonia',
    [ambito] nvarchar(10) NOT NULL DEFAULT N'Urbano',
    [created_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    CONSTRAINT [PK_asentamientos] PRIMARY KEY ([id]),
    CONSTRAINT [FK_asentamientos_municipios_municipio_id] FOREIGN KEY ([municipio_id]) REFERENCES [municipios] ([id]) ON DELETE CASCADE
);
GO

CREATE TABLE [grupos_familiares] (
    [id] int NOT NULL IDENTITY,
    [codigo_grupo] nvarchar(20) NULL,
    [cabeza_familia_id] int NULL,
    [albergue_id] int NOT NULL,
    [numero_miembros] int NOT NULL DEFAULT 1,
    [fecha_registro] datetime2 NOT NULL DEFAULT (GETDATE()),
    [requiere_ayuda_especial] bit NOT NULL DEFAULT CAST(0 AS bit),
    [descripcion_situacion] nvarchar(max) NULL,
    [tipo_ayuda_requerida] nvarchar(max) NULL,
    [estado_grupo] nvarchar(15) NOT NULL DEFAULT N'Activo',
    [created_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    [updated_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    CONSTRAINT [PK_grupos_familiares] PRIMARY KEY ([id]),
    CONSTRAINT [FK_grupos_familiares_albergues_albergue_id] FOREIGN KEY ([albergue_id]) REFERENCES [albergues] ([id]) ON DELETE NO ACTION
);
GO

CREATE TABLE [usuarios] (
    [id] int NOT NULL IDENTITY,
    [username] nvarchar(50) NOT NULL,
    [email] nvarchar(100) NOT NULL,
    [password_hash] nvarchar(255) NOT NULL,
    [role] nvarchar(10) NOT NULL DEFAULT N'Visitante',
    [albergue_id] int NULL,
    [is_active] bit NOT NULL DEFAULT CAST(1 AS bit),
    [last_login] datetime2 NULL,
    [created_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    [updated_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    CONSTRAINT [PK_usuarios] PRIMARY KEY ([id]),
    CONSTRAINT [FK_usuarios_albergues_albergue_id] FOREIGN KEY ([albergue_id]) REFERENCES [albergues] ([id]) ON DELETE SET NULL
);
GO

CREATE TABLE [personas] (
    [id] int NOT NULL IDENTITY,
    [codigo_persona] nvarchar(20) NULL,
    [nombre] nvarchar(100) NOT NULL,
    [apellido_paterno] nvarchar(100) NOT NULL,
    [apellido_materno] nvarchar(100) NULL,
    [edad] int NOT NULL,
    [sexo] nvarchar(1) NOT NULL,
    [municipio_id] int NOT NULL,
    [asentamiento_nombre] nvarchar(150) NOT NULL,
    [direccion_anterior] nvarchar(max) NULL,
    [fecha_hora_llegada] datetime2 NOT NULL DEFAULT (GETDATE()),
    [fecha_hora_salida] datetime2 NULL,
    [ultima_actualizacion] datetime2 NOT NULL DEFAULT (GETDATE()),
    [es_cabeza_familia] bit NOT NULL DEFAULT CAST(0 AS bit),
    [grupo_familiar_id] int NULL,
    [parentesco] nvarchar(50) NULL,
    [contacto_emergencia] bit NOT NULL DEFAULT CAST(0 AS bit),
    [albergue_actual_id] int NULL,
    [estado_persona] nvarchar(15) NOT NULL DEFAULT N'Registrado',
    [observaciones] nvarchar(max) NULL,
    [documento_identidad] nvarchar(50) NULL,
    [telefono_contacto] nvarchar(20) NULL,
    [created_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    [updated_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    CONSTRAINT [PK_personas] PRIMARY KEY ([id]),
    CONSTRAINT [CHK_edad_valida] CHECK (edad >= 0 AND edad <= 120),
    CONSTRAINT [FK_personas_albergues_albergue_actual_id] FOREIGN KEY ([albergue_actual_id]) REFERENCES [albergues] ([id]) ON DELETE SET NULL,
    CONSTRAINT [FK_personas_grupos_familiares_grupo_familiar_id] FOREIGN KEY ([grupo_familiar_id]) REFERENCES [grupos_familiares] ([id]) ON DELETE SET NULL,
    CONSTRAINT [FK_personas_municipios_municipio_id] FOREIGN KEY ([municipio_id]) REFERENCES [municipios] ([id]) ON DELETE NO ACTION
);
GO

CREATE TABLE [persona_condiciones] (
    [id] int NOT NULL IDENTITY,
    [persona_id] int NOT NULL,
    [condicion_id] int NOT NULL,
    [descripcion_especifica] nvarchar(max) NULL,
    [medicamentos] nvarchar(max) NULL,
    [alergias] nvarchar(max) NULL,
    [requerimientos_especiales] nvarchar(max) NULL,
    [fecha_diagnostico] datetime2 NULL,
    [es_critica] bit NOT NULL DEFAULT CAST(0 AS bit),
    [observaciones_medicas] nvarchar(max) NULL,
    [created_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    [updated_at] datetime2 NOT NULL DEFAULT (GETDATE()),
    CONSTRAINT [PK_persona_condiciones] PRIMARY KEY ([id]),
    CONSTRAINT [FK_persona_condiciones_condiciones_medicas_condicion_id] FOREIGN KEY ([condicion_id]) REFERENCES [condiciones_medicas] ([id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_persona_condiciones_personas_persona_id] FOREIGN KEY ([persona_id]) REFERENCES [personas] ([id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_albergues_municipio_id] ON [albergues] ([municipio_id]);
GO

CREATE INDEX [IX_asentamientos_municipio_id] ON [asentamientos] ([municipio_id]);
GO

CREATE UNIQUE INDEX [IX_asentamientos_nombre_municipio_id] ON [asentamientos] ([nombre], [municipio_id]);
GO

CREATE UNIQUE INDEX [IX_condiciones_medicas_tipo] ON [condiciones_medicas] ([tipo]);
GO

CREATE INDEX [IX_grupos_familiares_albergue_id] ON [grupos_familiares] ([albergue_id]);
GO

CREATE UNIQUE INDEX [IX_grupos_familiares_codigo_grupo] ON [grupos_familiares] ([codigo_grupo]) WHERE [codigo_grupo] IS NOT NULL;
GO

CREATE UNIQUE INDEX [IX_municipios_nombre] ON [municipios] ([nombre]);
GO

CREATE INDEX [IX_persona_condiciones_condicion_id] ON [persona_condiciones] ([condicion_id]);
GO

CREATE UNIQUE INDEX [IX_persona_condiciones_persona_id_condicion_id] ON [persona_condiciones] ([persona_id], [condicion_id]);
GO

CREATE INDEX [IX_personas_albergue_actual_id] ON [personas] ([albergue_actual_id]);
GO

CREATE UNIQUE INDEX [IX_personas_codigo_persona] ON [personas] ([codigo_persona]) WHERE [codigo_persona] IS NOT NULL;
GO

CREATE INDEX [IX_personas_grupo_familiar_id] ON [personas] ([grupo_familiar_id]);
GO

CREATE INDEX [IX_personas_municipio_id] ON [personas] ([municipio_id]);
GO

CREATE INDEX [IX_usuarios_albergue_id] ON [usuarios] ([albergue_id]);
GO

CREATE UNIQUE INDEX [IX_usuarios_email] ON [usuarios] ([email]);
GO

CREATE UNIQUE INDEX [IX_usuarios_username] ON [usuarios] ([username]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251013020706_InitialCreateSpanishEntities', N'8.0.10');
GO

COMMIT;
GO

