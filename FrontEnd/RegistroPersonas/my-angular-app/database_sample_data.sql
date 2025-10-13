-- =====================================================================
-- DATOS DE EJEMPLO PARA LA BASE DE DATOS - SQL SERVER
-- Inserción de municipios, asentamientos y albergues iniciales
-- =====================================================================

USE registro_inundaciones_db;
GO

-- =====================================================================
-- INSERTAR ASENTAMIENTOS PARA POZA RICA DE HIDALGO
-- =====================================================================

-- Declarar variables para IDs de municipios
DECLARE @poza_rica_id INT = (SELECT id FROM municipios WHERE nombre = N'Poza Rica de Hidalgo');
DECLARE @alamo_id INT = (SELECT id FROM municipios WHERE nombre = N'Álamo Temapache');
DECLARE @tuxpan_id INT = (SELECT id FROM municipios WHERE nombre = N'Tuxpan');

-- =====================================================================
-- INSERTAR TODOS LOS ASENTAMIENTOS DE POZA RICA DE HIDALGO (118 registros)
-- =====================================================================
INSERT INTO asentamientos (nombre, municipio_id, tipo_asentamiento, ambito) VALUES
-- Poza Rica de Hidalgo - Todos los asentamientos del JSON
(N'Tierra y Libertad', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Fraternidad Antorchista', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Círculo Michoacano', @poza_rica_id, N'Unidad habitacional', N'Urbano'),
(N'Prensa Nacional', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Las Vegas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Reforma', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Santa Emilia', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Lomas Del Carmen', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Mecánicos de Piso', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Perlas Del Oriente', @poza_rica_id, N'Colonia', N'Urbano'),
(N'La Ceiba', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Manuel Ávila Camacho', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Nacional', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Poza de Cuero', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Nuevo Progreso', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Los Sauces', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Heriberto Jara Corona', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Bella Vista', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Sector Popular', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Jesús Reyes Heroles', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Cerro del Mesón', @poza_rica_id, N'Ejido', N'Urbano'),
(N'San Felipe', @poza_rica_id, N'Unidad habitacional', N'Urbano'),
(N'Los Mangos', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Mirador', @poza_rica_id, N'Colonia', N'Urbano'),
(N'El Mollejón', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Arroyo del Maíz', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Cazones', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Las Palmas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Arroyo del Maíz Uno', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Técnicos y Profesionistas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Santa Fe', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Chapultepec', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Obras Sociales', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Santa Elena', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Residencial Bosques de Santa Elena', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'San Román', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Santa Regina', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Parcela 14', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Tepeyac', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Francisco I Madero', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Laredo', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Miguel Hidalgo', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Obrera', @poza_rica_id, N'Colonia', N'Urbano'),
(N'5 de Febrero', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Parcela 24', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Agustín Lara', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Anáhuac', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Tamaulipas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Yanga', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Azteca', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Ignacio Zaragoza', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Las Valentinas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Ampliación Yanga', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Constituyentes', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Francisco Sarabia', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Heriberto Kehoe Vicent', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Emiliano Zapata', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Libertad', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Rafael Hernández Ochoa', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Insurgentes', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Guadalupe Victoria', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Petrolera', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Petromex', @poza_rica_id, N'Colonia', N'Urbano'),
(N'18 de Marzo', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Las Huastecas', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Las Animas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Halliburton', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Independencia', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Lázaro Cárdenas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Las Gaviotas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'INFONAVIT Poza de Cuero', @poza_rica_id, N'Colonia', N'Urbano'),
(N'La Rueda', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Lomas Residencial', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Veintisiete de Enero', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Primavera', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Benito Juárez', @poza_rica_id, N'Colonia', N'Urbano'),
(N'México', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Miguel Hidalgo Fraccionamiento', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Las Granjas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Palma Sola', @poza_rica_id, N'Colonia', N'Urbano'),
(N'27 de Septiembre', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Magisterio', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Bugambilias', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'La Floresta', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Los Laureles', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Central de Abastos', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Ignacio de La Llave', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Tajín', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Flores Magón', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Morelos', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Vista Hermosa', @poza_rica_id, N'Colonia', N'Urbano'),
(N'5 de Mayo Vieja', @poza_rica_id, N'Colonia', N'Urbano'),
(N'División de Oriente', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Área Industrial PEMEX', @poza_rica_id, N'Zona industrial', N'Urbano'),
(N'Salvador Allende', @poza_rica_id, N'Colonia', N'Urbano'),
(N'12 de Octubre', @poza_rica_id, N'Colonia', N'Urbano'),
(N'La Barita', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Jardines de Poza Rica', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Nueva Imagen', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Aviación Vieja', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Herradura', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Buenos Aires', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Loma Bonita', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Nuevos Proyectos', @poza_rica_id, N'Colonia', N'Urbano'),
(N'A I M P', @poza_rica_id, N'Fraccionamiento', N'Urbano'),
(N'Las Flores', @poza_rica_id, N'Colonia', N'Urbano'),
(N'La Ilusión', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Casa de Visitas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Medias Lomas', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Loma Alta', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Chulavista', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Fausto Dávila Solís', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Revolución', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Escolín de Olarte', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Niños Héroes', @poza_rica_id, N'Colonia', N'Urbano'),
(N'10 de Abril', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Los Pinos', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Vicente Herrera', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Oscar Torres Pancardo', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Fernando Gutiérrez Barrios', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Del Policia', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Veracruz', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Villa de las Flores', @poza_rica_id, N'Colonia', N'Urbano'),
(N'El Vergel', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Lomas Verdes', @poza_rica_id, N'Colonia', N'Urbano'),
(N'Parcela 44', @poza_rica_id, N'Colonia', N'Urbano');

-- =====================================================================  
-- INSERTAR TODOS LOS ASENTAMIENTOS DE ÁLAMO TEMAPACHE (78 registros)
-- =====================================================================
INSERT INTO asentamientos (nombre, municipio_id, tipo_asentamiento, ambito) VALUES
-- Álamo Temapache - Todos los asentamientos del JSON
(N'Agua Nacida', @alamo_id, N'Ranchería', N'Rural'),
(N'Álamo Centro', @alamo_id, N'Colonia', N'Urbano'),
(N'Cerro Dulce', @alamo_id, N'Pueblo', N'Rural'),
(N'Estero del Ídolo', @alamo_id, N'Colonia', N'Urbano'),
(N'Hidalgo Amajac', @alamo_id, N'Pueblo', N'Rural'),
(N'La Concepción', @alamo_id, N'Pueblo', N'Rural'),
(N'La Reforma', @alamo_id, N'Ranchería', N'Rural'),
(N'La Unión', @alamo_id, N'Colonia', N'Urbano'),
(N'Tincontlán', @alamo_id, N'Pueblo', N'Rural'),
(N'Lázaro Cárdenas', @alamo_id, N'Colonia', N'Urbano'),
(N'Nuevo Jardín', @alamo_id, N'Colonia', N'Urbano'),
(N'Burócrata', @alamo_id, N'Colonia', N'Urbano'),
(N'Gabino González', @alamo_id, N'Colonia', N'Urbano'),
(N'Lic. José López Portillo', @alamo_id, N'Colonia', N'Urbano'),
(N'Progreso', @alamo_id, N'Colonia', N'Urbano'),
(N'Derechos Humanos', @alamo_id, N'Colonia', N'Urbano'),
(N'Educación', @alamo_id, N'Colonia', N'Urbano'),
(N'Empleados Municipales', @alamo_id, N'Colonia', N'Urbano'),
(N'Morelos', @alamo_id, N'Colonia', N'Urbano'),
(N'Pantepec', @alamo_id, N'Colonia', N'Urbano'),
(N'Santa Cruz', @alamo_id, N'Colonia', N'Urbano'),
(N'Solidaridad', @alamo_id, N'Colonia', N'Urbano'),
(N'28 de Noviembre', @alamo_id, N'Colonia', N'Urbano'),
(N'25 de Abril', @alamo_id, N'Colonia', N'Urbano'),
(N'Luis Donaldo Colosio', @alamo_id, N'Colonia', N'Urbano'),
(N'Benito Juárez', @alamo_id, N'Colonia', N'Urbano'),
(N'Francisco I. Madero', @alamo_id, N'Colonia', N'Urbano'),
(N'Fernando López Arias', @alamo_id, N'Colonia', N'Urbano'),
(N'Unidad y Trabajo', @alamo_id, N'Colonia', N'Urbano'),
(N'Pozo 50', @alamo_id, N'Colonia', N'Urbano'),
(N'Chapopote Núñez', @alamo_id, N'Colonia', N'Urbano'),
(N'Arboledas', @alamo_id, N'Colonia', N'Urbano'),
(N'Jacarandas', @alamo_id, N'Colonia', N'Rural'),
(N'Niños Héroes de Chapultepec', @alamo_id, N'Colonia', N'Urbano'),
(N'Villas de San Clemente', @alamo_id, N'Fraccionamiento', N'Urbano'),
(N'Lombardista', @alamo_id, N'Colonia', N'Urbano'),
(N'Ojital Ciruelo', @alamo_id, N'Congregación', N'Rural'),
(N'Azteca', @alamo_id, N'Colonia', N'Urbano'),
(N'Heroica Veracruz', @alamo_id, N'Colonia', N'Urbano'),
(N'Industrial', @alamo_id, N'Colonia', N'Urbano'),
(N'Pueblo Nuevo', @alamo_id, N'Colonia', N'Urbano'),
(N'Bellavista', @alamo_id, N'Colonia', N'Urbano'),
(N'Emiliano Zapata', @alamo_id, N'Colonia', N'Urbano'),
(N'Los Pinos', @alamo_id, N'Colonia', N'Urbano'),
(N'Ribera', @alamo_id, N'Colonia', N'Urbano'),
(N'Adolfo López Mateos', @alamo_id, N'Ranchería', N'Rural'),
(N'Aviación', @alamo_id, N'Colonia', N'Urbano'),
(N'18 de Marzo', @alamo_id, N'Colonia', N'Urbano'),
(N'Las Flores', @alamo_id, N'Barrio', N'Urbano'),
(N'Adolfo Lopez Mateos Colonia', @alamo_id, N'Colonia', N'Urbano'),
(N'Unidad Socialista', @alamo_id, N'Colonia', N'Rural'),
(N'Vista Hermosa', @alamo_id, N'Colonia', N'Urbano'),
(N'Tierra Blanca Booxter', @alamo_id, N'Pueblo', N'Rural'),
(N'Emiliano Zapata Pueblo', @alamo_id, N'Pueblo', N'Rural'),
(N'Vegas de la Soledad y Soledad Dos', @alamo_id, N'Pueblo', N'Rural'),
(N'Alazán', @alamo_id, N'Ranchería', N'Rural'),
(N'Brasilar', @alamo_id, N'Ranchería', N'Rural'),
(N'Potrero del Llano', @alamo_id, N'Pueblo', N'Rural'),
(N'Tepetzintlilla', @alamo_id, N'Pueblo', N'Rural'),
(N'Doctores', @alamo_id, N'Colonia', N'Rural'),
(N'Ejido 1', @alamo_id, N'Colonia', N'Rural'),
(N'La Esperanza', @alamo_id, N'Colonia', N'Rural'),
(N'Obras Sociales', @alamo_id, N'Colonia', N'Rural'),
(N'Zapotal Solís (San José Solís)', @alamo_id, N'Ranchería', N'Rural'),
(N'Solís de Allende', @alamo_id, N'Ranchería', N'Rural'),
(N'Tierra Amarilla', @alamo_id, N'Ranchería', N'Rural'),
(N'Ignacio Zaragoza', @alamo_id, N'Congregación', N'Rural'),
(N'La Camelia (Palo Blanco)', @alamo_id, N'Pueblo', N'Rural'),
(N'Lomas de Vinazco', @alamo_id, N'Pueblo', N'Rural'),
(N'Palo Blanco', @alamo_id, N'Pueblo', N'Rural'),
(N'Úrsulo Galvan', @alamo_id, N'Pueblo', N'Rural'),
(N'Horcones', @alamo_id, N'Pueblo', N'Rural'),
(N'Buenos Aires (San Isidro)', @alamo_id, N'Pueblo', N'Rural'),
(N'Raudal Nuevo', @alamo_id, N'Ranchería', N'Rural'),
(N'San Miguel', @alamo_id, N'Pueblo', N'Rural'),
(N'Nuevo Paso Real', @alamo_id, N'Congregación', N'Rural'),
(N'Tumbadero del Águila', @alamo_id, N'Ranchería', N'Rural'),
(N'Doctor Montes de Oca (San Isidro)', @alamo_id, N'Congregación', N'Rural'),
(N'Raya Obscura', @alamo_id, N'Congregación', N'Rural'),
(N'El Mangar', @alamo_id, N'Poblado comunal', N'Rural'),
(N'Temapache', @alamo_id, N'Pueblo', N'Rural'),
(N'Villa Hermosa', @alamo_id, N'Pueblo', N'Rural'),
(N'Guillermo Vélez', @alamo_id, N'Colonia', N'Rural');

-- =====================================================================
-- INSERTAR TODOS LOS ASENTAMIENTOS DE TUXPAN (217 registros)
-- =====================================================================
INSERT INTO asentamientos (nombre, municipio_id, tipo_asentamiento, ambito) VALUES
-- Tuxpan - Todos los asentamientos del JSON
(N'Aire Libre (Kilómetro 15)', @tuxpan_id, N'Pueblo', N'Rural'),
(N'Alto Lucero Centro', @tuxpan_id, N'Colonia', N'Rural'),
(N'Cañada Rica', @tuxpan_id, N'Ranchería', N'Rural'),
(N'Frijolillo', @tuxpan_id, N'Barrio', N'Rural'),
(N'Higueral', @tuxpan_id, N'Ranchería', N'Rural'),
(N'Ojite', @tuxpan_id, N'Ranchería', N'Rural'),
(N'Países Bajos (Kilómetro 8)', @tuxpan_id, N'Ranchería', N'Rural'),
(N'Peña de Afuera', @tuxpan_id, N'Barrio', N'Rural'),
(N'Praxedis Guerrero (Kilómetro 18)', @tuxpan_id, N'Pueblo', N'Rural'),
(N'Tierra Blanca', @tuxpan_id, N'Pueblo', N'Rural'),
(N'Altamira', @tuxpan_id, N'Congregación', N'Rural'),
(N'Boca del Monte', @tuxpan_id, N'Congregación', N'Rural'),
(N'Buenos Aires', @tuxpan_id, N'Congregación', N'Rural'),
(N'Ceiba Rica', @tuxpan_id, N'Congregación', N'Rural'),
(N'CTM', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Chijolar', @tuxpan_id, N'Congregación', N'Rural'),
(N'Chomotla', @tuxpan_id, N'Congregación', N'Rural'),
(N'El Muro', @tuxpan_id, N'Congregación', N'Rural'),
(N'El Vergel', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Juana Moza', @tuxpan_id, N'Ejido', N'Rural'),
(N'La Unión', @tuxpan_id, N'Congregación', N'Rural'),
(N'La Victoria', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Loma Alta', @tuxpan_id, N'Congregación', N'Rural'),
(N'Manlio Fabio Altamirano', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Miguel Hidalgo', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Montes de Armenia', @tuxpan_id, N'Congregación', N'Rural'),
(N'Puente Don Diego', @tuxpan_id, N'Congregación', N'Rural'),
(N'Santiago de la Peña', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Tampiquillo', @tuxpan_id, N'Congregación', N'Rural'),
(N'Zapotal Zaragoza', @tuxpan_id, N'Congregación', N'Rural'),
(N'Dante Delgado', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Las Animas', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Fernando Gutiérrez Barrios', @tuxpan_id, N'Colonia', N'Urbano'),
(N'20 de Noviembre', @tuxpan_id, N'Colonia', N'Urbano'),
(N'1ro de Mayo', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Murillo Vidal', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Nuevo Sol', @tuxpan_id, N'Colonia', N'Urbano'),
(N'El Paraíso', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Cobos', @tuxpan_id, N'Colonia', N'Urbano'),
(N'La Mata', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Banderas', @tuxpan_id, N'Congregación', N'Rural'),
(N'Cerro de Tumilco', @tuxpan_id, N'Congregación', N'Rural'),
(N'Chacoaco', @tuxpan_id, N'Congregación', N'Rural'),
(N'Franco Cruz Hernández', @tuxpan_id, N'Unidad habitacional', N'Urbano'),
(N'Barra Norte', @tuxpan_id, N'Colonia', N'Rural'),
(N'La Calzada', @tuxpan_id, N'Colonia', N'Urbano'),
(N'La Ceiba', @tuxpan_id, N'Congregación', N'Rural'),
(N'La Victoria Tuxpan', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Tampamachoco', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Arboleda', @tuxpan_id, N'Colonia', N'Urbano'),
(N'El Paraíso Tuxpan', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Emiliano Zapata', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Monte Horeb', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Niños Héroes', @tuxpan_id, N'Colonia', N'Urbano'),
(N'El Capullo', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Playa Azul', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Benito Juárez', @tuxpan_id, N'Congregación', N'Urbano'),
(N'Higo de la Esperanza', @tuxpan_id, N'Congregación', N'Rural'),
(N'Linda Vista', @tuxpan_id, N'Congregación', N'Rural'),
(N'Miramar (La Antigua)', @tuxpan_id, N'Congregación', N'Rural'),
(N'Playa Emiliano Zapata', @tuxpan_id, N'Congregación', N'Rural'),
(N'Corredor Industrial', @tuxpan_id, N'Parque industrial', N'Rural'),
(N'Laja del Tubo', @tuxpan_id, N'Congregación', N'Rural'),
(N'Las Pasas', @tuxpan_id, N'Congregación', N'Rural'),
(N'Monte Morelos', @tuxpan_id, N'Congregación', N'Rural'),
(N'Salto de La Reforma', @tuxpan_id, N'Congregación', N'Rural'),
(N'Tebanco', @tuxpan_id, N'Congregación', N'Rural'),
(N'Banco del Calichar', @tuxpan_id, N'Congregación', N'Rural'),
(N'El Progreso', @tuxpan_id, N'Congregación', N'Rural'),
(N'Chiconcoa', @tuxpan_id, N'Congregación', N'Rural'),
(N'El Coyol', @tuxpan_id, N'Congregación', N'Rural'),
(N'El Jobo', @tuxpan_id, N'Congregación', N'Rural'),
(N'Francisco I. Madero', @tuxpan_id, N'Congregación', N'Urbano'),
(N'Héroes de Chapultepec (El Tamarindo)', @tuxpan_id, N'Congregación', N'Rural'),
(N'Macuiltépetl', @tuxpan_id, N'Congregación', N'Rural'),
(N'Peña Alta', @tuxpan_id, N'Congregación', N'Rural'),
(N'San José el Grande', @tuxpan_id, N'Congregación', N'Rural'),
(N'Zapote Domingo', @tuxpan_id, N'Congregación', N'Rural'),
(N'Chalahuite', @tuxpan_id, N'Ranchería', N'Rural'),
(N'Nalúa', @tuxpan_id, N'Ranchería', N'Rural'),
(N'Rancho Viejo', @tuxpan_id, N'Rancho', N'Rural'),
(N'Comején', @tuxpan_id, N'Congregación', N'Rural'),
(N'El Lindero', @tuxpan_id, N'Congregación', N'Rural'),
(N'Otatal', @tuxpan_id, N'Congregación', N'Rural'),
(N'Palma de Morelos', @tuxpan_id, N'Congregación', N'Rural'),
(N'Tronconal', @tuxpan_id, N'Rancho', N'Rural'),
(N'Tronconal de Herrera Beltrán', @tuxpan_id, N'Pueblo', N'Rural'),
(N'Alto de San Lorenzo', @tuxpan_id, N'Congregación', N'Rural'),
(N'El Angosto', @tuxpan_id, N'Congregación', N'Rural'),
(N'Héroe de Nacozari (Arroyo de San Lorenzo)', @tuxpan_id, N'Congregación', N'Rural'),
(N'La Camelia', @tuxpan_id, N'Congregación', N'Rural'),
(N'Baltazar', @tuxpan_id, N'Congregación', N'Rural'),
(N'La Laja de Coloman', @tuxpan_id, N'Congregación', N'Rural'),
(N'Sabanillas', @tuxpan_id, N'Congregación', N'Rural'),
(N'Buena Vista', @tuxpan_id, N'Congregación', N'Rural'),
(N'Cruz Naranjos', @tuxpan_id, N'Congregación', N'Rural'),
(N'Juan Zumaya (El Remate)', @tuxpan_id, N'Congregación', N'Rural'),
(N'Zapotalillo', @tuxpan_id, N'Congregación', N'Rural'),
(N'Ojite Rancho Nuevo', @tuxpan_id, N'Pueblo', N'Rural'),
(N'La Laja de Zapote Bueno', @tuxpan_id, N'Congregación', N'Rural'),
(N'Túxpam de Rodríguez Cano Centro', @tuxpan_id, N'Colonia', N'Urbano'),
(N'El Esfuerzo', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Rafael Hernández Ochoa', @tuxpan_id, N'Colonia', N'Rural'),
(N'Murillo Vidal Rural', @tuxpan_id, N'Colonia', N'Rural'),
(N'INFONAVIT Puerto Pesquero', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Jesús Reyes Heroles', @tuxpan_id, N'Unidad habitacional', N'Urbano'),
(N'Esperanza Azcon', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Álvarez', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Azteca', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Mexicana Miguel Alemán', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Olímpica', @tuxpan_id, N'Colonia', N'Urbano'),
(N'5 de Julio', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Villa Mar', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Ampliación Azteca', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Concepción', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Cabo Alto', @tuxpan_id, N'Fraccionamiento', N'Urbano'),
(N'Anáhuac', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Juárez', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Escudero', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Géminis INFONAVIT', @tuxpan_id, N'Fraccionamiento', N'Urbano'),
(N'Las Palmas', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Lázaro Cárdenas', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Los Pinos', @tuxpan_id, N'Colonia', N'Urbano'),
(N'INFONAVIT Castillo', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Rodríguez Alcaine', @tuxpan_id, N'Fraccionamiento', N'Urbano'),
(N'Campo Real', @tuxpan_id, N'Fraccionamiento', N'Urbano'),
(N'Cabo Rojo', @tuxpan_id, N'Fraccionamiento', N'Urbano'),
(N'23 de Noviembre', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Alfonso Arroyo Flores', @tuxpan_id, N'Colonia', N'Urbano'),
(N'El Naranjal', @tuxpan_id, N'Colonia', N'Rural'),
(N'Loma Linda', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Reyes Heroles', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Fausto Vega Santander', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Los Mangos', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Vicente Guerrero', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Adolfo Lopez Mateos', @tuxpan_id, N'Colonia', N'Urbano'),
(N'INFONAVIT Tulipanes', @tuxpan_id, N'Colonia', N'Urbano'),
(N'De los Artistas', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Framboyanes', @tuxpan_id, N'Fraccionamiento', N'Urbano'),
(N'Las Lomas', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Emiliano Zapata Tuxpan', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Federico Garcia Blanco', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Juan Lucas', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Las Joyas', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Pisaflores', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Luis Donaldo Colosio', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Dante Delgado Tuxpan', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Jazmín', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Militares', @tuxpan_id, N'Unidad habitacional', N'Urbano'),
(N'Petropolis', @tuxpan_id, N'Fraccionamiento', N'Urbano'),
(N'El Mirador', @tuxpan_id, N'Colonia', N'Urbano'),
(N'El Retiro', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Insurgentes', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Obrera', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Ampliación Obrera', @tuxpan_id, N'Colonia', N'Urbano'),
(N'San Antonio', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Ampliación Los Mangos', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Niños Héroes Tuxpan', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Colinas Del Sol', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Lomas de Maratea', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Joaquín Hernandez Galicia', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Militares Retirados', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Cenecista C.N.C.', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Túxpam VIVAH', @tuxpan_id, N'Conjunto habitacional', N'Urbano'),
(N'Los Mangos Tuxpan', @tuxpan_id, N'Colonia', N'Urbano'),
(N'México Lindo', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Democrática', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Libertad', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Rodriguez Alcaine', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Vista Hermosa', @tuxpan_id, N'Conjunto habitacional', N'Urbano'),
(N'Manuel Ávila Camacho', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Rosa Maria', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Zapote Gordo', @tuxpan_id, N'Colonia', N'Urbano'),
(N'6 de Enero', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Tenechaco INFONAVIT', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Villa Rosita', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Burocrática', @tuxpan_id, N'Colonia', N'Urbano'),
(N'INFONAVIT CANACO', @tuxpan_id, N'Unidad habitacional', N'Urbano'),
(N'La Rivera', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Electricistas', @tuxpan_id, N'Colonia', N'Urbano'),
(N'INFONAVIT CROC', @tuxpan_id, N'Colonia', N'Urbano'),
(N'INFONAVIT CTM', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Tropicana', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Del Valle', @tuxpan_id, N'Colonia', N'Urbano'),
(N'FOVISSSTE', @tuxpan_id, N'Unidad habitacional', N'Urbano'),
(N'Adolfo Ruiz Cortines', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Enrique Rodríguez Cano', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Del Puerto', @tuxpan_id, N'Colonia', N'Urbano'),
(N'17 de Octubre', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Ampliación Adolfo Ruiz Cortinez', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Ampliación Enrique Rodríguez Cano', @tuxpan_id, N'Colonia', N'Urbano'),
(N'La Calzada Tuxpan', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Las Delicias', @tuxpan_id, N'Colonia', N'Urbano'),
(N'FECAPOMEX', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Carlos Salinas de Gortari', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Luís Donaldo Colosio', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Ampliación Luis Donaldo Colosio', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Niños Héroes 2', @tuxpan_id, N'Colonia', N'Urbano'),
(N'El Fortín', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Monte Grande', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Jardines de Tuxpan', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Lomas de Tuxpan FOVISSSTE', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Valle Verde', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Casa Bella', @tuxpan_id, N'Fraccionamiento', N'Urbano'),
(N'El Romance', @tuxpan_id, N'Colonia', N'Urbano'),
(N'INFONAVIT Las Granjas de Alto Lucero', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Nueva Italia', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Campestre Alborada', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Granjas de Alto Lucero', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Revolución Mexicana', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Villa de Guadalupe', @tuxpan_id, N'Colonia', N'Urbano'),
(N'INFONAVIT Las Granjas', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Los Pinos Tuxpan', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Del Bosque', @tuxpan_id, N'Colonia', N'Urbano'),
(N'El Retoño', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Paola Samperio Benitez', @tuxpan_id, N'Colonia', N'Urbano'),
(N'CEAS', @tuxpan_id, N'Colonia', N'Urbano'),
(N'Universitaria', @tuxpan_id, N'Colonia', N'Urbano');
GO

-- =====================================================================
-- INSERTAR ALBERGUES INICIALES
-- =====================================================================

DECLARE @poza_rica_id INT = (SELECT id FROM municipios WHERE nombre = N'Poza Rica de Hidalgo');
DECLARE @alamo_id INT = (SELECT id FROM municipios WHERE nombre = N'Álamo Temapache');
DECLARE @tuxpan_id INT = (SELECT id FROM municipios WHERE nombre = N'Tuxpan');

INSERT INTO albergues (
    nombre, 
    direccion, 
    municipio_id, 
    asentamiento, 
    capacidad_maxima, 
    capacidad_actual,
    servicios,
    contacto_telefono,
    contacto_email,
    responsable,
    estado,
    fecha_apertura,
    latitud,
    longitud
) VALUES
-- Albergues en Poza Rica
(
    N'Albergue Temporal Poza Rica', 
    N'Calle 20 de Noviembre No. 123, Col. Centro',
    @poza_rica_id,
    N'Centro',
    100,
    0,
    N'["Dormitorios", "Comedor", "Baños", "Área médica", "Área de juegos", "Comunicación"]',
    N'782-123-4567',
    N'albergue.pozarica@inundaciones.gob.mx',
    N'Juan Pérez González',
    N'Activo',
    '2024-01-15',
    20.5332,
    -97.4589
),

-- Albergues en Álamo Temapache
(
    N'Centro de Refugio Álamo',
    N'Av. Hidalgo No. 456, Col. Centro',
    @alamo_id,
    N'Centro',
    80,
    0,
    N'["Dormitorios", "Comedor", "Baños", "Área médica"]',
    N'782-234-5678',
    N'albergue.alamo@inundaciones.gob.mx',
    N'María Elena Rodríguez',
    N'Activo',
    '2024-01-16',
    20.9167,
    -97.7833
),

-- Albergues en Tuxpan
(
    N'Refugio Temporal Tuxpan',
    N'Calle Morelos No. 789, Col. Puerto',
    @tuxpan_id,
    N'Puerto',
    120,
    0,
    N'["Dormitorios", "Comedor", "Baños", "Área médica", "Área de niños", "Lavandería"]',
    N'783-345-6789',
    N'albergue.tuxpan@inundaciones.gob.mx',
    N'Carlos Antonio Hernández',
    N'Activo',
    '2024-01-14',
    20.9575,
    -97.4064
);
GO

-- =====================================================================
-- CREAR USUARIOS PARA CADA ALBERGUE
-- =====================================================================

-- Usuario para albergue de Poza Rica
INSERT INTO usuarios (username, email, password_hash, role, albergue_id) 
VALUES (
    N'pozarica_admin', 
    N'admin.pozarica@inundaciones.gob.mx', 
    N'$2b$10$N9qo8uLOickgx2ZMRZoMye', -- Cambiar por hash real
    N'Albergue',
    (SELECT id FROM albergues WHERE nombre = N'Albergue Temporal Poza Rica')
);

-- Usuario para albergue de Álamo
INSERT INTO usuarios (username, email, password_hash, role, albergue_id) 
VALUES (
    N'alamo_admin', 
    N'admin.alamo@inundaciones.gob.mx', 
    N'$2b$10$N9qo8uLOickgx2ZMRZoMye', -- Cambiar por hash real
    N'Albergue',
    (SELECT id FROM albergues WHERE nombre = N'Centro de Refugio Álamo')
);

-- Usuario para albergue de Tuxpan
INSERT INTO usuarios (username, email, password_hash, role, albergue_id) 
VALUES (
    N'tuxpan_admin', 
    N'admin.tuxpan@inundaciones.gob.mx', 
    N'$2b$10$N9qo8uLOickgx2ZMRZoMye', -- Cambiar por hash real
    N'Albergue',
    (SELECT id FROM albergues WHERE nombre = N'Refugio Temporal Tuxpan')
);

-- Usuario visitante de ejemplo
INSERT INTO usuarios (username, email, password_hash, role) 
VALUES (
    N'visitante', 
    N'visitante@example.com', 
    N'$2b$10$N9qo8uLOickgx2ZMRZoMye', -- Cambiar por hash real
    N'Visitante'
);
GO

-- =====================================================================
-- EJEMPLOS DE PERSONAS Y GRUPOS FAMILIARES
-- =====================================================================

DECLARE @poza_rica_id INT = (SELECT id FROM municipios WHERE nombre = N'Poza Rica de Hidalgo');
DECLARE @tuxpan_id INT = (SELECT id FROM municipios WHERE nombre = N'Tuxpan');

-- Crear algunos grupos familiares de ejemplo
INSERT INTO grupos_familiares (
    codigo_grupo,
    albergue_id,
    requiere_ayuda_especial,
    descripcion_situacion,
    tipo_ayuda_requerida
) VALUES
-- Grupo Familiar 1 en Poza Rica
(
    N'GF-PR-001',
    (SELECT id FROM albergues WHERE nombre = N'Albergue Temporal Poza Rica'),
    1,
    N'Familia con adulto mayor diabético',
    N'["Medicamentos", "Atención médica especializada"]'
),

-- Grupo Familiar 2 en Tuxpan
(
    N'GF-TX-002',
    (SELECT id FROM albergues WHERE nombre = N'Refugio Temporal Tuxpan'),
    0,
    N'Familia joven con menores de edad',
    N'["Educación temporal", "Cuidado infantil"]'
);

-- Insertar personas de ejemplo
INSERT INTO personas (
    codigo_persona,
    nombre,
    apellido_paterno,
    apellido_materno,
    edad,
    sexo,
    municipio_id,
    asentamiento_nombre,
    direccion_anterior,
    fecha_hora_llegada,
    es_cabeza_familia,
    grupo_familiar_id,
    albergue_actual_id,
    estado_persona,
    documento_identidad,
    telefono_contacto
) VALUES
-- Cabeza de familia grupo 1
(
    N'PER-001',
    N'Juan Carlos',
    N'González',
    N'López',
    45,
    N'M',
    @poza_rica_id,
    N'Centro',
    N'Calle Independencia #123, Col. Centro',
    '2024-01-15 14:30:00',
    1,
    1,
    (SELECT id FROM albergues WHERE nombre = N'Albergue Temporal Poza Rica'),
    N'En_Albergue',
    N'GOLJ450815HVZRPN01',
    N'782-555-0123'
),

-- Esposa del grupo 1
(
    N'PER-002',
    N'Ana María',
    N'Martínez',
    N'Hernández',
    42,
    N'F',
    @poza_rica_id,
    N'Centro',
    N'Calle Independencia #123, Col. Centro',
    '2024-01-15 14:30:00',
    0,
    1,
    (SELECT id FROM albergues WHERE nombre = N'Albergue Temporal Poza Rica'),
    N'En_Albergue',
    N'MAHA421203MVZRNN08',
    N'782-555-0123'
),

-- Hijo menor del grupo 1
(
    N'PER-003',
    N'Carlos Eduardo',
    N'González',
    N'Martínez',
    12,
    N'M',
    @poza_rica_id,
    N'Centro',
    N'Calle Independencia #123, Col. Centro',
    '2024-01-15 14:30:00',
    0,
    1,
    (SELECT id FROM albergues WHERE nombre = N'Albergue Temporal Poza Rica'),
    N'En_Albergue',
    N'GOMC120615HVZRLR02',
    N'782-555-0123'
),

-- Persona individual en Tuxpan
(
    N'PER-004',
    N'María Elena',
    N'Rodríguez',
    N'Santos',
    28,
    N'F',
    @tuxpan_id,
    N'Las Flores',
    N'Av. Las Flores #456, Col. Las Flores',
    '2024-01-16 09:15:00',
    1,
    NULL,
    (SELECT id FROM albergues WHERE nombre = N'Refugio Temporal Tuxpan'),
    N'En_Albergue',
    N'ROSM280390MVZDNT04',
    N'783-555-0456'
);
GO

-- Actualizar las cabezas de familia
UPDATE grupos_familiares 
SET cabeza_familia_id = (SELECT id FROM personas WHERE codigo_persona = N'PER-001')
WHERE codigo_grupo = N'GF-PR-001';
GO

-- Agregar condiciones médicas a las personas
INSERT INTO persona_condiciones (
    persona_id,
    condicion_id,
    descripcion_especifica,
    medicamentos,
    es_critica
) VALUES
-- Juan Carlos tiene diabetes
(
    (SELECT id FROM personas WHERE codigo_persona = N'PER-001'),
    (SELECT id FROM condiciones_medicas WHERE tipo = N'Diabetes'),
    N'Diabetes tipo 2 controlada con medicamentos',
    N'["Metformina 850mg", "Glibenclamida 5mg"]',
    1
),

-- María Elena está embarazada
(
    (SELECT id FROM personas WHERE codigo_persona = N'PER-004'),
    (SELECT id FROM condiciones_medicas WHERE tipo = N'Embarazo'),
    N'Embarazo de 6 meses, sin complicaciones',
    N'["Ácido fólico", "Hierro"]',
    1
);
GO

-- =====================================================================
-- VERIFICAR LOS DATOS INSERTADOS
-- =====================================================================

-- Mostrar estadísticas generales
SELECT 'Municipios' as Tabla, COUNT(*) as Total FROM municipios
UNION ALL
SELECT 'Asentamientos' as Tabla, COUNT(*) as Total FROM asentamientos
UNION ALL
SELECT 'Albergues' as Tabla, COUNT(*) as Total FROM albergues
UNION ALL
SELECT 'Usuarios' as Tabla, COUNT(*) as Total FROM usuarios
UNION ALL
SELECT 'Personas' as Tabla, COUNT(*) as Total FROM personas
UNION ALL
SELECT 'Grupos Familiares' as Tabla, COUNT(*) as Total FROM grupos_familiares
UNION ALL
SELECT 'Condiciones Médicas' as Tabla, COUNT(*) as Total FROM condiciones_medicas;

-- Mostrar la vista de personas completa
SELECT * FROM v_personas_completa;

-- Mostrar estadísticas de albergues
SELECT * FROM v_estadisticas_albergues;

-- =====================================================================
-- CONSULTAS DE EJEMPLO ÚTILES
-- =====================================================================

-- 1. Personas por municipio
SELECT 
    m.nombre as municipio,
    COUNT(p.id) as total_personas,
    COUNT(CASE WHEN p.es_cabeza_familia = 1 THEN 1 END) as cabezas_familia
FROM municipios m
LEFT JOIN personas p ON m.id = p.municipio_id
GROUP BY m.id, m.nombre;

-- 2. Ocupación actual de albergues
SELECT 
    a.nombre,
    a.capacidad_actual,
    a.capacidad_maxima,
    ROUND(CAST(a.capacidad_actual AS FLOAT) / a.capacidad_maxima * 100, 2) as porcentaje_ocupacion
FROM albergues a
WHERE a.estado = N'Activo'
ORDER BY porcentaje_ocupacion DESC;

-- 3. Personas con condiciones médicas críticas
SELECT 
    CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', ISNULL(p.apellido_materno, '')) as nombre_completo,
    cm.tipo as condicion,
    pc.descripcion_especifica,
    a.nombre as albergue
FROM personas p
JOIN persona_condiciones pc ON p.id = pc.persona_id
JOIN condiciones_medicas cm ON pc.condicion_id = cm.id
JOIN albergues a ON p.albergue_actual_id = a.id
WHERE pc.es_critica = 1
ORDER BY p.apellido_paterno;

-- 4. Resumen por grupo familiar
SELECT 
    gf.codigo_grupo,
    CONCAT(cf.nombre, ' ', cf.apellido_paterno) as cabeza_familia,
    gf.numero_miembros,
    a.nombre as albergue,
    gf.requiere_ayuda_especial
FROM grupos_familiares gf
LEFT JOIN personas cf ON gf.cabeza_familia_id = cf.id
LEFT JOIN albergues a ON gf.albergue_id = a.id
WHERE gf.estado_grupo = N'Activo'
ORDER BY gf.codigo_grupo;
GO