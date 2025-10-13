-- =====================================================================
-- SEED DATA - MUNICIPIOS Y ASENTAMIENTOS BÁSICOS
-- Este script agrega los datos mínimos necesarios para pruebas
-- =====================================================================

USE registro_inundaciones_db;
GO

-- Insertar municipios básicos si no existen
IF NOT EXISTS (SELECT 1 FROM municipios WHERE nombre = 'Poza Rica de Hidalgo')
BEGIN
    INSERT INTO municipios (nombre, estado, created_at, updated_at) VALUES
    ('Poza Rica de Hidalgo', 'Veracruz', GETDATE(), GETDATE()),
    ('Álamo Temapache', 'Veracruz', GETDATE(), GETDATE()),
    ('Tuxpan', 'Veracruz', GETDATE(), GETDATE()),
    ('Papantla', 'Veracruz', GETDATE(), GETDATE()),
    ('Coatzintla', 'Veracruz', GETDATE(), GETDATE());
END

-- Obtener IDs de municipios
DECLARE @poza_rica_id INT = (SELECT id FROM municipios WHERE nombre = 'Poza Rica de Hidalgo');
DECLARE @alamo_id INT = (SELECT id FROM municipios WHERE nombre = 'Álamo Temapache');
DECLARE @tuxpan_id INT = (SELECT id FROM municipios WHERE nombre = 'Tuxpan');
DECLARE @papantla_id INT = (SELECT id FROM municipios WHERE nombre = 'Papantla');
DECLARE @coatzintla_id INT = (SELECT id FROM municipios WHERE nombre = 'Coatzintla');

-- Insertar asentamientos básicos si no existen
IF NOT EXISTS (SELECT 1 FROM asentamientos WHERE municipio_id = @poza_rica_id)
BEGIN
    INSERT INTO asentamientos (nombre, municipio_id, tipo_asentamiento, ambito, created_at) VALUES
    -- Poza Rica de Hidalgo
    ('Centro', @poza_rica_id, 'Colonia', 'Urbano', GETDATE()),
    ('Las Granjas', @poza_rica_id, 'Colonia', 'Urbano', GETDATE()),
    ('Obras Sociales', @poza_rica_id, 'Colonia', 'Urbano', GETDATE()),
    ('Del Valle', @poza_rica_id, 'Colonia', 'Urbano', GETDATE()),
    ('Insurgentes', @poza_rica_id, 'Colonia', 'Urbano', GETDATE()),
    
    -- Álamo Temapache
    ('Centro', @alamo_id, 'Colonia', 'Urbano', GETDATE()),
    ('Benito Juárez', @alamo_id, 'Colonia', 'Urbano', GETDATE()),
    ('Francisco Villa', @alamo_id, 'Colonia', 'Urbano', GETDATE()),
    
    -- Tuxpan
    ('Centro', @tuxpan_id, 'Colonia', 'Urbano', GETDATE()),
    ('Puerto México', @tuxpan_id, 'Colonia', 'Urbano', GETDATE()),
    ('Santiago de la Peña', @tuxpan_id, 'Colonia', 'Urbano', GETDATE()),
    
    -- Papantla
    ('Centro', @papantla_id, 'Colonia', 'Urbano', GETDATE()),
    ('El Tajín', @papantla_id, 'Colonia', 'Urbano', GETDATE()),
    
    -- Coatzintla
    ('Centro', @coatzintla_id, 'Colonia', 'Urbano', GETDATE()),
    ('La Esperanza', @coatzintla_id, 'Colonia', 'Urbano', GETDATE());
END

-- Insertar albergues básicos si no existen
IF NOT EXISTS (SELECT 1 FROM albergues WHERE municipio_id = @poza_rica_id)
BEGIN
    INSERT INTO albergues (nombre, direccion, municipio_id, capacidad_maxima, capacidad_actual, estado, responsable, contacto_telefono, contacto_email, fecha_apertura, asentamiento, created_at, updated_at) VALUES
    -- Poza Rica de Hidalgo
    ('Albergue Central Poza Rica', 'Centro de la Ciudad', @poza_rica_id, 100, 0, 'Activo', 'Protección Civil Municipal', '782-123-4567', 'albergue1@pozarica.gob.mx', GETDATE(), 'Centro', GETDATE(), GETDATE()),
    ('Albergue Las Granjas', 'Colonia Las Granjas', @poza_rica_id, 80, 0, 'Activo', 'Cruz Roja Mexicana', '782-234-5678', 'albergue2@pozarica.gob.mx', GETDATE(), 'Las Granjas', GETDATE(), GETDATE()),
    
    -- Álamo Temapache
    ('Albergue Municipal Álamo', 'Centro de Álamo', @alamo_id, 60, 0, 'Activo', 'Protección Civil Municipal', '782-345-6789', 'albergue@alamo.gob.mx', GETDATE(), 'Centro', GETDATE(), GETDATE()),
    
    -- Tuxpan
    ('Albergue Puerto Tuxpan', 'Zona Portuaria', @tuxpan_id, 120, 0, 'Activo', 'Protección Civil Estatal', '782-456-7890', 'albergue@tuxpan.gob.mx', GETDATE(), 'Puerto México', GETDATE(), GETDATE()),
    
    -- Papantla
    ('Albergue Cultural Papantla', 'Centro Histórico', @papantla_id, 70, 0, 'Activo', 'DIF Municipal', '782-567-8901', 'albergue@papantla.gob.mx', GETDATE(), 'Centro', GETDATE(), GETDATE());
END

-- Mostrar los datos insertados para verificación
SELECT 'MUNICIPIOS REGISTRADOS:' AS resultado;
SELECT id, nombre, estado FROM municipios ORDER BY id;

SELECT 'ASENTAMIENTOS REGISTRADOS:' AS resultado;
SELECT a.id, a.nombre, m.nombre as municipio FROM asentamientos a 
JOIN municipios m ON a.municipio_id = m.id 
ORDER BY m.nombre, a.nombre;

SELECT 'ALBERGUES REGISTRADOS:' AS resultado;
SELECT al.id, al.nombre, m.nombre as municipio, al.capacidad_maxima FROM albergues al
JOIN municipios m ON al.municipio_id = m.id
ORDER BY m.nombre, al.nombre;

GO