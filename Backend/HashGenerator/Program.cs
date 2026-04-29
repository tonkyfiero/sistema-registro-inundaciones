using System.Security.Cryptography;
using System.Text;

// EXACTAMENTE el mismo método que tienes en AuthController
static string HashPassword(string password)
{
    using var sha256 = SHA256.Create();
    var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
    return Convert.ToBase64String(hashedBytes);
}

Console.WriteLine("=== GENERANDO HASHES SHA256 ===");
Console.WriteLine();

// Generar hashes para cada contraseña
var users = new[]
{
    new { Username = "admin", Email = "admin@inundaciones.gob.mx", Password = "admin123", Role = "Admin" },
    new { Username = "pozarica_admin", Email = "admin.pozarica@inundaciones.gob.mx", Password = "pozarica2024", Role = "Albergue" },
    new { Username = "alamo_admin", Email = "admin.alamo@inundaciones.gob.mx", Password = "alamo2024", Role = "Albergue" },
    new { Username = "tuxpan_admin", Email = "admin.tuxpan@inundaciones.gob.mx", Password = "tuxpan2024", Role = "Albergue" },
    new { Username = "visitante", Email = "visitante@example.com", Password = "visitante123", Role = "Visitante" }
};

Console.WriteLine("-- Limpiar tabla existente");
Console.WriteLine("DELETE FROM Usuarios;");
Console.WriteLine();
Console.WriteLine("-- Insertar usuarios con hashes SHA256 correctos");
Console.WriteLine();

foreach (var user in users)
{
    var hash = HashPassword(user.Password);
    Console.WriteLine($"INSERT INTO Usuarios (username, email, password_hash, role, albergue_id, is_active, created_at, updated_at) VALUES");
    Console.WriteLine($"('{user.Username}', '{user.Email}', '{hash}', '{user.Role}', NULL, 1, GETDATE(), GETDATE());");
    Console.WriteLine();
    
    Console.WriteLine($"-- Usuario: {user.Username}");
    Console.WriteLine($"-- Contraseña: {user.Password}");
    Console.WriteLine($"-- Hash: {hash}");
    Console.WriteLine($"-- Longitud hash: {hash.Length}");
    Console.WriteLine();
}

// También crear algunos hashes individuales para verificar
Console.WriteLine("=== VERIFICACIÓN INDIVIDUAL ===");
Console.WriteLine();
string[] passwords = { "admin123", "pozarica2024", "alamo2024", "tuxpan2024", "visitante123" };

foreach (var pwd in passwords)
{
    var hash = HashPassword(pwd);
    Console.WriteLine($"Password: '{pwd}' -> Hash: '{hash}'");
}
