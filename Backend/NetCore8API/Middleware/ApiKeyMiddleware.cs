using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace NetCore8API.Middleware
{
    public class ApiKeyMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _apiKey;

        public ApiKeyMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _apiKey = configuration["ApiKey"] ?? "sistema-registro-inundaciones-2024-api-key-secure";
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Permitir OPTIONS para CORS
            if (context.Request.Method == "OPTIONS")
            {
                await _next(context);
                return;
            }

            // Verificar si la ruta requiere API Key (excluir rutas de desarrollo)
            var path = context.Request.Path.Value?.ToLower();
            if (path != null && (path.StartsWith("/swagger") || path == "/" || path == "/health"))
            {
                await _next(context);
                return;
            }

            const string APIKEYNAME = "X-API-Key";
            var providedApiKey = context.Request.Headers[APIKEYNAME].FirstOrDefault();

            if (string.IsNullOrEmpty(providedApiKey))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("API Key requerida");
                return;
            }

            if (!_apiKey.Equals(providedApiKey))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("API Key inválida");
                return;
            }

            await _next(context);
        }
    }
}