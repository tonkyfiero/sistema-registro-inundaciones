using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCore8API.Infrastructure.Persistence;
using NetCore8API.Domain.Entities;
using System.Security.Cryptography;
using System.Text;

namespace NetCore8API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                Console.WriteLine("=== DEBUG LOGIN DETALLADO ===");
                Console.WriteLine($"Username recibido: '{request.Username}'");
                Console.WriteLine($"Password recibido: '{request.Password}'");
                Console.WriteLine($"Longitud password: {request.Password.Length}");
                
                if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
                {
                    return BadRequest(new { message = "Usuario y contraseña son requeridos" });
                }

                // Buscar usuario por username o email
                var usuario = await _context.Usuarios
                    .Include(u => u.Albergue)
                    .ThenInclude(a => a!.Municipio)
                    .FirstOrDefaultAsync(u => 
                        (u.Username == request.Username || u.Email == request.Username) && 
                        u.IsActive);

                Console.WriteLine($"Usuario encontrado: {usuario != null}");
                if (usuario != null)
                {
                    Console.WriteLine($"Username en BD: '{usuario.Username}'");
                    Console.WriteLine($"Email en BD: '{usuario.Email}'");
                    Console.WriteLine($"Hash en BD: '{usuario.PasswordHash}'");
                    Console.WriteLine($"Longitud hash BD: {usuario.PasswordHash.Length}");
                }

                if (usuario == null)
                {
                    return Unauthorized(new { message = "Usuario no encontrado o inactivo" });
                }

                // Generar hash de la contraseña ingresada para comparar
                var hashGenerado = HashPassword(request.Password);
                Console.WriteLine($"Hash generado: '{hashGenerado}'");
                Console.WriteLine($"Longitud hash generado: {hashGenerado.Length}");
                Console.WriteLine($"Hashes son iguales: {usuario.PasswordHash == hashGenerado}");
                
                // Comparación carácter por carácter para debug
                if (usuario.PasswordHash != hashGenerado)
                {
                    Console.WriteLine("COMPARACIÓN CARÁCTER POR CARÁCTER:");
                    var minLength = Math.Min(usuario.PasswordHash.Length, hashGenerado.Length);
                    for (int i = 0; i < minLength; i++)
                    {
                        if (usuario.PasswordHash[i] != hashGenerado[i])
                        {
                            Console.WriteLine($"Diferencia en posición {i}: BD='{usuario.PasswordHash[i]}' vs Generado='{hashGenerado[i]}'");
                            break;
                        }
                    }
                }

                // Verificar contraseña
                if (!VerifyPassword(request.Password, usuario.PasswordHash))
                {
                    Console.WriteLine("VERIFICACIÓN FALLÓ");
                    return Unauthorized(new { message = "Contraseña incorrecta" });
                }

                Console.WriteLine("LOGIN EXITOSO!");

                // Actualizar último login
                usuario.LastLogin = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                // Preparar respuesta
                var response = new LoginResponse
                {
                    Id = usuario.Id,
                    Username = usuario.Username,
                    Email = usuario.Email,
                    Role = usuario.Role,
                    AlbergueId = usuario.AlbergueId,
                    AlbergueNombre = usuario.Albergue?.Nombre,
                    MunicipioNombre = usuario.Albergue?.Municipio?.Nombre,
                    IsActive = usuario.IsActive,
                    LastLogin = usuario.LastLogin
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR EN LOGIN: {ex.Message}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Error interno del servidor", details = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                // Verificar si el usuario ya existe
                var existingUser = await _context.Usuarios
                    .AnyAsync(u => u.Username == request.Username || u.Email == request.Email);

                if (existingUser)
                {
                    return BadRequest(new { message = "Usuario o email ya existe" });
                }

                // Crear nuevo usuario
                var usuario = new Usuario
                {
                    Username = request.Username,
                    Email = request.Email,
                    PasswordHash = HashPassword(request.Password),
                    Role = request.Role ?? "Visitante",
                    AlbergueId = request.AlbergueId,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Usuario creado exitosamente", userId = usuario.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor", details = ex.Message });
            }
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashedBytes);
        }

        private static bool VerifyPassword(string password, string hash)
        {
            var hashOfInput = HashPassword(password);
            return hash == hashOfInput;
        }
    }

    // DTOs
    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public int? AlbergueId { get; set; }
        public string? AlbergueNombre { get; set; }
        public string? MunicipioNombre { get; set; }
        public bool IsActive { get; set; }
        public DateTime? LastLogin { get; set; }
    }

    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Role { get; set; } = "Visitante";
        public int? AlbergueId { get; set; }
    }
}