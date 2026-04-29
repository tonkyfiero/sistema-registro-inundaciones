using Microsoft.Extensions.Primitives;

namespace NetCore8API.Middleware
{
    public class CorsMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<CorsMiddleware> _logger;

        public CorsMiddleware(RequestDelegate next, ILogger<CorsMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var origin = context.Request.Headers.Origin.FirstOrDefault();
            
            // Lista de orígenes permitidos
            var allowedOrigins = new[]
            {
                "http://localhost:4200",
                "https://localhost:4200",
                "http://localhost:3000",
                "https://localhost:3000",
                "http://registro-personas-albergue.runasp.net",
                "https://registro-personas-albergue.runasp.net"
            };

            _logger.LogInformation($"CORS - Origin received: {origin}");

            if (!string.IsNullOrEmpty(origin) && allowedOrigins.Contains(origin))
            {
                context.Response.Headers["Access-Control-Allow-Origin"] = origin;
                context.Response.Headers["Access-Control-Allow-Credentials"] = "true";
                context.Response.Headers["Access-Control-Allow-Headers"] = 
                    "Content-Type, Authorization, Accept, X-Requested-With, Origin, X-API-Key";
                context.Response.Headers["Access-Control-Allow-Methods"] = 
                    "GET, POST, PUT, DELETE, OPTIONS, PATCH";
                
                _logger.LogInformation($"CORS - Headers added for origin: {origin}");
            }
            else if (!string.IsNullOrEmpty(origin))
            {
                _logger.LogWarning($"CORS - Origin not allowed: {origin}");
            }

            // Handle preflight requests
            if (context.Request.Method == "OPTIONS")
            {
                _logger.LogInformation("CORS - Handling OPTIONS preflight request");
                context.Response.StatusCode = 200;
                await context.Response.WriteAsync("");
                return;
            }

            await _next(context);
        }
    }
}