-- Script para crear usuarios de prueba
-- Contraseñas: admin123, albergue123, visitante123

-- Usuario Administrador
INSERT INTO usuarios (username, email, password_hash, role, is_active, created_at, updated_at)
VALUES 
('admin', 'admin@registro-inundaciones.mx', 'kQHTqZVJ8VVQg9z/zh/V8A7xqRUmj94bL9uD4jhuk8Y=', 'Admin', 1, GETDATE(), GETDATE());

-- Usuario de Albergue (asociado a un albergue)
INSERT INTO usuarios (username, email, password_hash, role, albergue_id, is_active, created_at, updated_at)
VALUES 
('albergue1', 'albergue1@registro-inundaciones.mx', 'OFtvGGU1EONV8cSXy2pSdD7wXDNuP5EmzfVReCXRCeQ=', 'Albergue', 1, 1, GETDATE(), GETDATE());

-- Usuario Visitante
INSERT INTO usuarios (username, email, password_hash, role, is_active, created_at, updated_at)
VALUES 
('visitante', 'visitante@registro-inundaciones.mx', 'TutRD6E9zGZdLT7OB1pXFBMZtJ4nVV1GO/V1I+Tir7c=', 'Visitante', 1, GETDATE(), GETDATE());

-- Verificar que los usuarios se insertaron correctamente
SELECT id, username, email, role, albergue_id, is_active 
FROM usuarios 
ORDER BY role, username;