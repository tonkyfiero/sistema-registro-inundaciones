-- =====================================================================
-- SISTEMA DE REGISTRO DE PERSONAS AFECTADAS POR INUNDACIONES
-- Base de datos SQL SERVER
-- =====================================================================

-- Crear la base de datos
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'registro_inundaciones_db')
BEGIN
    CREATE DATABASE registro_inundaciones_db
    COLLATE SQL_Latin1_General_CP1_CI_AS;
END
GO

USE registro_inundaciones_db;
GO

-- =====================================================================
-- TABLA: MUNICIPIOS
-- Almacena los municipios donde ocurren las inundaciones
-- =====================================================================
CREATE TABLE municipios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE,
    estado NVARCHAR(50) NOT NULL DEFAULT 'Veracruz',
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

CREATE INDEX idx_municipio_nombre ON municipios(nombre);
GO

-- =====================================================================
-- TABLA: ASENTAMIENTOS 
-- Colonias, fraccionamientos, etc. dentro de cada municipio
-- =====================================================================
CREATE TABLE asentamientos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(150) NOT NULL,
    municipio_id INT NOT NULL,
    tipo_asentamiento NVARCHAR(30) NOT NULL DEFAULT 'Colonia'
        CHECK (tipo_asentamiento IN ('Colonia', 'Fraccionamiento', 'Unidad habitacional', 'Ejido', 'Barrio', 'Pueblo', 'Otro')),
    ambito NVARCHAR(10) DEFAULT 'Urbano'
        CHECK (ambito IN ('Urbano', 'Rural')),
    created_at DATETIME2 DEFAULT GETDATE(),
    
    CONSTRAINT FK_asentamiento_municipio FOREIGN KEY (municipio_id) REFERENCES municipios(id) ON DELETE CASCADE,
    CONSTRAINT UK_asentamiento_municipio UNIQUE (nombre, municipio_id)
);

CREATE INDEX idx_asentamiento_municipio ON asentamientos(municipio_id);
CREATE INDEX idx_asentamiento_nombre ON asentamientos(nombre);
GO

-- =====================================================================
-- TABLA: ALBERGUES
-- Centros de refugio temporal para las personas afectadas
-- =====================================================================
CREATE TABLE albergues (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(200) NOT NULL,
    direccion NVARCHAR(MAX) NOT NULL,
    municipio_id INT NOT NULL,
    asentamiento NVARCHAR(150),
    capacidad_maxima INT NOT NULL DEFAULT 0,
    capacidad_actual INT NOT NULL DEFAULT 0,
    servicios NVARCHAR(MAX), -- JSON como string en SQL Server
    contacto_telefono NVARCHAR(20),
    contacto_email NVARCHAR(100),
    responsable NVARCHAR(150) NOT NULL,
    estado NVARCHAR(15) DEFAULT 'Activo'
        CHECK (estado IN ('Activo', 'Inactivo', 'Lleno', 'Mantenimiento')),
    fecha_apertura DATE NOT NULL,
    latitud DECIMAL(10, 8) NULL,
    longitud DECIMAL(11, 8) NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    CONSTRAINT FK_albergue_municipio FOREIGN KEY (municipio_id) REFERENCES municipios(id),
    CONSTRAINT CHK_capacidad CHECK (capacidad_actual <= capacidad_maxima),
    CONSTRAINT CHK_capacidad_positiva CHECK (capacidad_maxima > 0)
);

CREATE INDEX idx_albergue_municipio ON albergues(municipio_id);
CREATE INDEX idx_albergue_estado ON albergues(estado);
CREATE INDEX idx_albergue_capacidad ON albergues(capacidad_actual, capacidad_maxima);
GO

-- =====================================================================
-- TABLA: USUARIOS
-- Sistema de autenticación y autorización
-- =====================================================================
CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    role NVARCHAR(10) NOT NULL DEFAULT 'Visitante'
        CHECK (role IN ('Admin', 'Albergue', 'Visitante')),
    albergue_id INT NULL,
    is_active BIT DEFAULT 1,
    last_login DATETIME2 NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    CONSTRAINT FK_usuario_albergue FOREIGN KEY (albergue_id) REFERENCES albergues(id) ON DELETE SET NULL
);

CREATE INDEX idx_usuario_role ON usuarios(role);
CREATE INDEX idx_usuario_active ON usuarios(is_active);
CREATE INDEX idx_usuario_albergue ON usuarios(albergue_id);
GO

-- =====================================================================
-- TABLA: CONDICIONES_MEDICAS
-- Catálogo de condiciones médicas predefinidas
-- =====================================================================
CREATE TABLE condiciones_medicas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tipo NVARCHAR(100) NOT NULL UNIQUE,
    descripcion NVARCHAR(MAX),
    categoria NVARCHAR(15) DEFAULT 'Otro'
        CHECK (categoria IN ('Cronica', 'Temporal', 'Discapacidad', 'Embarazo', 'Otro')),
    requiere_atencion_especial BIT DEFAULT 0,
    activa BIT DEFAULT 1,
    created_at DATETIME2 DEFAULT GETDATE()
);

CREATE INDEX idx_condicion_tipo ON condiciones_medicas(tipo);
CREATE INDEX idx_condicion_categoria ON condiciones_medicas(categoria);
GO

-- =====================================================================
-- TABLA: GRUPOS_FAMILIARES
-- Agrupación de familias en los albergues
-- =====================================================================
CREATE TABLE grupos_familiares (
    id INT IDENTITY(1,1) PRIMARY KEY,
    codigo_grupo NVARCHAR(20) UNIQUE,
    cabeza_familia_id INT NULL,
    albergue_id INT NOT NULL,
    numero_miembros INT DEFAULT 1,
    fecha_registro DATETIME2 DEFAULT GETDATE(),
    requiere_ayuda_especial BIT DEFAULT 0,
    descripcion_situacion NVARCHAR(MAX),
    tipo_ayuda_requerida NVARCHAR(MAX), -- JSON como string
    estado_grupo NVARCHAR(15) DEFAULT 'Activo'
        CHECK (estado_grupo IN ('Activo', 'Trasladado', 'Egresado')),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    CONSTRAINT FK_grupo_albergue FOREIGN KEY (albergue_id) REFERENCES albergues(id)
);

CREATE INDEX idx_grupo_albergue ON grupos_familiares(albergue_id);
CREATE INDEX idx_grupo_estado ON grupos_familiares(estado_grupo);
CREATE INDEX idx_grupo_codigo ON grupos_familiares(codigo_grupo);
GO

-- =====================================================================
-- TABLA: PERSONAS
-- Registro principal de personas afectadas
-- =====================================================================
CREATE TABLE personas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    codigo_persona NVARCHAR(20) UNIQUE,
    nombre NVARCHAR(100) NOT NULL,
    apellido_paterno NVARCHAR(100) NOT NULL,
    apellido_materno NVARCHAR(100),
    edad INT NOT NULL,
    sexo NCHAR(1) NOT NULL CHECK (sexo IN ('M', 'F', 'O', 'N')),
    municipio_id INT NOT NULL,
    asentamiento_nombre NVARCHAR(150) NOT NULL,
    direccion_anterior NVARCHAR(MAX),
    
    -- Fechas importantes
    fecha_hora_llegada DATETIME2 NOT NULL DEFAULT GETDATE(),
    fecha_hora_salida DATETIME2 NULL,
    ultima_actualizacion DATETIME2 DEFAULT GETDATE(),
    
    -- Información familiar
    es_cabeza_familia BIT DEFAULT 0,
    grupo_familiar_id INT NULL,
    parentesco NVARCHAR(50) NULL,
    contacto_emergencia BIT DEFAULT 0,
    
    -- Estado en el albergue
    albergue_actual_id INT NULL,
    estado_persona NVARCHAR(15) DEFAULT 'Registrado'
        CHECK (estado_persona IN ('Registrado', 'En_Albergue', 'Trasladado', 'Egresado', 'Desaparecido')),
    
    -- Información adicional
    observaciones NVARCHAR(MAX),
    documento_identidad NVARCHAR(50),
    telefono_contacto NVARCHAR(20),
    
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    CONSTRAINT FK_persona_municipio FOREIGN KEY (municipio_id) REFERENCES municipios(id),
    CONSTRAINT FK_persona_grupo FOREIGN KEY (grupo_familiar_id) REFERENCES grupos_familiares(id) ON DELETE SET NULL,
    CONSTRAINT FK_persona_albergue FOREIGN KEY (albergue_actual_id) REFERENCES albergues(id) ON DELETE SET NULL,
    CONSTRAINT CHK_edad_valida CHECK (edad >= 0 AND edad <= 120)
);

CREATE INDEX idx_persona_nombre ON personas(nombre, apellido_paterno);
CREATE INDEX idx_persona_municipio ON personas(municipio_id);
CREATE INDEX idx_persona_asentamiento ON personas(asentamiento_nombre);
CREATE INDEX idx_persona_grupo ON personas(grupo_familiar_id);
CREATE INDEX idx_persona_albergue ON personas(albergue_actual_id);
CREATE INDEX idx_persona_estado ON personas(estado_persona);
CREATE INDEX idx_persona_edad ON personas(edad);
CREATE INDEX idx_persona_sexo ON personas(sexo);
CREATE INDEX idx_persona_codigo ON personas(codigo_persona);
CREATE INDEX idx_persona_fecha_llegada ON personas(fecha_hora_llegada);
GO

-- =====================================================================
-- TABLA: PERSONA_CONDICIONES
-- Relación muchos a muchos entre personas y condiciones médicas
-- =====================================================================
CREATE TABLE persona_condiciones (
    id INT IDENTITY(1,1) PRIMARY KEY,
    persona_id INT NOT NULL,
    condicion_id INT NOT NULL,
    descripcion_especifica NVARCHAR(MAX),
    medicamentos NVARCHAR(MAX), -- JSON como string
    alergias NVARCHAR(MAX), -- JSON como string
    requerimientos_especiales NVARCHAR(MAX), -- JSON como string
    fecha_diagnostico DATE NULL,
    es_critica BIT DEFAULT 0,
    observaciones_medicas NVARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    
    CONSTRAINT FK_pc_persona FOREIGN KEY (persona_id) REFERENCES personas(id) ON DELETE CASCADE,
    CONSTRAINT FK_pc_condicion FOREIGN KEY (condicion_id) REFERENCES condiciones_medicas(id),
    CONSTRAINT UK_persona_condicion UNIQUE (persona_id, condicion_id)
);

CREATE INDEX idx_pc_persona ON persona_condiciones(persona_id);
CREATE INDEX idx_pc_condicion ON persona_condiciones(condicion_id);
CREATE INDEX idx_pc_critica ON persona_condiciones(es_critica);
GO

-- =====================================================================
-- AGREGAR FOREIGN KEYS DESPUÉS DE CREAR TODAS LAS TABLAS
-- =====================================================================
ALTER TABLE grupos_familiares 
ADD CONSTRAINT FK_grupo_cabeza_familia 
FOREIGN KEY (cabeza_familia_id) REFERENCES personas(id) ON DELETE SET NULL;
GO

-- =====================================================================
-- TRIGGERS PARA MANTENER CONSISTENCIA (SQL Server)
-- =====================================================================

-- Trigger para actualizar timestamp en UPDATE
CREATE TRIGGER tr_update_municipios
ON municipios
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE municipios 
    SET updated_at = GETDATE()
    FROM municipios m
    INNER JOIN inserted i ON m.id = i.id;
END;
GO

CREATE TRIGGER tr_update_albergues
ON albergues
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE albergues 
    SET updated_at = GETDATE()
    FROM albergues a
    INNER JOIN inserted i ON a.id = i.id;
END;
GO

CREATE TRIGGER tr_update_usuarios
ON usuarios
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE usuarios 
    SET updated_at = GETDATE()
    FROM usuarios u
    INNER JOIN inserted i ON u.id = i.id;
END;
GO

CREATE TRIGGER tr_update_grupos_familiares
ON grupos_familiares
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE grupos_familiares 
    SET updated_at = GETDATE()
    FROM grupos_familiares gf
    INNER JOIN inserted i ON gf.id = i.id;
END;
GO

CREATE TRIGGER tr_update_personas
ON personas
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE personas 
    SET updated_at = GETDATE()
    FROM personas p
    INNER JOIN inserted i ON p.id = i.id;
END;
GO

CREATE TRIGGER tr_update_persona_condiciones
ON persona_condiciones
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE persona_condiciones 
    SET updated_at = GETDATE()
    FROM persona_condiciones pc
    INNER JOIN inserted i ON pc.id = i.id;
END;
GO

-- Trigger para actualizar capacidad de albergues
CREATE TRIGGER tr_persona_albergue_capacity
ON personas
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Para INSERT
    IF EXISTS (SELECT * FROM inserted) AND NOT EXISTS (SELECT * FROM deleted)
    BEGIN
        UPDATE albergues 
        SET capacidad_actual = capacidad_actual + 1,
            updated_at = GETDATE()
        FROM albergues a
        INNER JOIN inserted i ON a.id = i.albergue_actual_id
        WHERE i.albergue_actual_id IS NOT NULL;
    END
    
    -- Para DELETE
    IF EXISTS (SELECT * FROM deleted) AND NOT EXISTS (SELECT * FROM inserted)
    BEGIN
        UPDATE albergues 
        SET capacidad_actual = capacidad_actual - 1,
            updated_at = GETDATE()
        FROM albergues a
        INNER JOIN deleted d ON a.id = d.albergue_actual_id
        WHERE d.albergue_actual_id IS NOT NULL;
    END
    
    -- Para UPDATE
    IF EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted)
    BEGIN
        -- Decrementar albergue anterior
        UPDATE albergues 
        SET capacidad_actual = capacidad_actual - 1,
            updated_at = GETDATE()
        FROM albergues a
        INNER JOIN deleted d ON a.id = d.albergue_actual_id
        LEFT JOIN inserted i ON d.id = i.id
        WHERE d.albergue_actual_id IS NOT NULL 
        AND (i.albergue_actual_id IS NULL OR i.albergue_actual_id != d.albergue_actual_id);
        
        -- Incrementar nuevo albergue
        UPDATE albergues 
        SET capacidad_actual = capacidad_actual + 1,
            updated_at = GETDATE()
        FROM albergues a
        INNER JOIN inserted i ON a.id = i.albergue_actual_id
        LEFT JOIN deleted d ON i.id = d.id
        WHERE i.albergue_actual_id IS NOT NULL 
        AND (d.albergue_actual_id IS NULL OR i.albergue_actual_id != d.albergue_actual_id);
    END
END;
GO

-- =====================================================================
-- INSERTAR DATOS INICIALES
-- =====================================================================

-- Municipios afectados por inundaciones
INSERT INTO municipios (nombre, estado) VALUES
(N'Poza Rica de Hidalgo', N'Veracruz'),
(N'Álamo Temapache', N'Veracruz'),
(N'Tuxpan', N'Veracruz');

-- Condiciones médicas comunes
INSERT INTO condiciones_medicas (tipo, descripcion, categoria, requiere_atencion_especial) VALUES
(N'Diabetes', N'Diabetes mellitus tipo 1 y 2', N'Cronica', 1),
(N'Hipertensión', N'Presión arterial elevada', N'Cronica', 1),
(N'Asma', N'Enfermedad respiratoria crónica', N'Cronica', 1),
(N'Epilepsia', N'Trastorno neurológico con convulsiones', N'Cronica', 1),
(N'Discapacidad Motriz', N'Limitaciones en el movimiento', N'Discapacidad', 1),
(N'Discapacidad Visual', N'Limitaciones en la visión', N'Discapacidad', 1),
(N'Discapacidad Auditiva', N'Limitaciones en la audición', N'Discapacidad', 1),
(N'Embarazo', N'Estado de gestación', N'Embarazo', 1),
(N'Artritis', N'Inflamación de las articulaciones', N'Cronica', 0),
(N'Cardiopatía', N'Enfermedades del corazón', N'Cronica', 1);

-- Usuario administrador inicial (usar hash real en producción)
INSERT INTO usuarios (username, email, password_hash, role) VALUES
(N'admin', N'admin@inundaciones.gob.mx', N'$2b$10$ejemplo_hash_seguro', N'Admin');

-- =====================================================================
-- VISTAS PARA CONSULTAS FRECUENTES (SQL Server compatible)
-- =====================================================================

-- Vista de personas con información completa
CREATE VIEW v_personas_completa AS
SELECT 
    p.id,
    p.codigo_persona,
    CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', ISNULL(p.apellido_materno, '')) as nombre_completo,
    p.edad,
    p.sexo,
    m.nombre as municipio,
    p.asentamiento_nombre,
    p.fecha_hora_llegada,
    p.fecha_hora_salida,
    p.es_cabeza_familia,
    gf.codigo_grupo,
    a.nombre as albergue_actual,
    a.capacidad_actual,
    a.capacidad_maxima,
    p.estado_persona,
    STRING_AGG(cm.tipo, ', ') as condiciones_medicas
FROM personas p
LEFT JOIN municipios m ON p.municipio_id = m.id
LEFT JOIN grupos_familiares gf ON p.grupo_familiar_id = gf.id
LEFT JOIN albergues a ON p.albergue_actual_id = a.id
LEFT JOIN persona_condiciones pc ON p.id = pc.persona_id
LEFT JOIN condiciones_medicas cm ON pc.condicion_id = cm.id
GROUP BY p.id, p.codigo_persona, p.nombre, p.apellido_paterno, p.apellido_materno,
         p.edad, p.sexo, m.nombre, p.asentamiento_nombre, p.fecha_hora_llegada,
         p.fecha_hora_salida, p.es_cabeza_familia, gf.codigo_grupo, a.nombre,
         a.capacidad_actual, a.capacidad_maxima, p.estado_persona;
GO

-- Vista de estadísticas por albergue
CREATE VIEW v_estadisticas_albergues AS
SELECT 
    a.id,
    a.nombre,
    a.capacidad_maxima,
    a.capacidad_actual,
    (a.capacidad_maxima - a.capacidad_actual) as espacios_disponibles,
    ROUND(CAST(a.capacidad_actual AS FLOAT) / a.capacidad_maxima * 100, 2) as porcentaje_ocupacion,
    COUNT(DISTINCT gf.id) as grupos_familiares,
    SUM(CASE WHEN p.edad < 18 THEN 1 ELSE 0 END) as menores,
    SUM(CASE WHEN p.edad >= 60 THEN 1 ELSE 0 END) as adultos_mayores,
    SUM(CASE WHEN pc.id IS NOT NULL THEN 1 ELSE 0 END) as personas_condiciones_medicas
FROM albergues a
LEFT JOIN personas p ON a.id = p.albergue_actual_id AND p.estado_persona = 'En_Albergue'
LEFT JOIN grupos_familiares gf ON a.id = gf.albergue_id AND gf.estado_grupo = 'Activo'
LEFT JOIN persona_condiciones pc ON p.id = pc.persona_id
WHERE a.estado = 'Activo'
GROUP BY a.id, a.nombre, a.capacidad_maxima, a.capacidad_actual;
GO

-- =====================================================================
-- PROCEDIMIENTOS ALMACENADOS ÚTILES
-- =====================================================================

-- Procedimiento para buscar personas por texto
CREATE PROCEDURE sp_buscar_personas
    @texto NVARCHAR(100) = NULL,
    @municipio_id INT = NULL,
    @estado_persona NVARCHAR(15) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT * FROM v_personas_completa
    WHERE (@texto IS NULL OR 
           nombre_completo LIKE '%' + @texto + '%' OR
           codigo_persona LIKE '%' + @texto + '%')
    AND (@municipio_id IS NULL OR municipio = (SELECT nombre FROM municipios WHERE id = @municipio_id))
    AND (@estado_persona IS NULL OR estado_persona = @estado_persona)
    ORDER BY fecha_hora_llegada DESC;
END;
GO

-- Procedimiento para obtener estadísticas generales
CREATE PROCEDURE sp_estadisticas_generales
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        'Total Personas' as concepto,
        COUNT(*) as valor
    FROM personas
    WHERE estado_persona IN ('Registrado', 'En_Albergue')
    
    UNION ALL
    
    SELECT 
        'Total Albergues Activos',
        COUNT(*)
    FROM albergues
    WHERE estado = 'Activo'
    
    UNION ALL
    
    SELECT 
        'Capacidad Total',
        SUM(capacidad_maxima)
    FROM albergues
    WHERE estado = 'Activo'
    
    UNION ALL
    
    SELECT 
        'Espacios Ocupados',
        SUM(capacidad_actual)
    FROM albergues
    WHERE estado = 'Activo';
END;
GO