using Microsoft.EntityFrameworkCore;
using NetCore8API.Infrastructure.Persistence;
using NetCore8API.Domain.Interfaces;
using NetCore8API.Domain.Entities;
using NetCore8API.Infrastructure.Repositories;
using NetCore8API.Application.Services;
using NetCore8API.Application.Mappings;
using NetCore8API.Middleware;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Configure logging for development
if (builder.Environment.IsDevelopment())
{
    builder.Logging.ClearProviders();
    builder.Logging.AddConsole();
    builder.Logging.AddDebug();
}

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    // Try to get connection string from environment variable first, then fallback to configuration
    var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING") 
        ?? builder.Configuration.GetConnectionString("DefaultConnection");
    
    options.UseSqlServer(connectionString);
    
    // Enable detailed logging in development
    if (builder.Environment.IsDevelopment())
    {
        options.EnableSensitiveDataLogging();
        options.EnableDetailedErrors();
    }
});

// Register AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Register Repository interfaces and implementations
builder.Services.AddScoped<IRepositoryBase<Persona>, RepositoryBase<Persona>>();
builder.Services.AddScoped<IPersonaRepository, PersonaRepository>();
builder.Services.AddScoped<IMunicipioRepository, MunicipioRepository>();
builder.Services.AddScoped<IAlbergueRepository, AlbergueRepository>();
builder.Services.AddScoped<IGrupoFamiliarRepository, GrupoFamiliarRepository>();

// Register Application Services
builder.Services.AddScoped<IPersonaService, PersonaService>();
builder.Services.AddScoped<IMunicipioService, MunicipioService>();
builder.Services.AddScoped<IAlbergueService, AlbergueService>();
builder.Services.AddScoped<IGrupoFamiliarService, GrupoFamiliarService>();

// Configure controllers with detailed error info
builder.Services.AddControllers(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        // Add model validation details in development
        options.ModelValidatorProviders.Clear();
    }
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() 
    { 
        Title = "API de Registro de Personas Afectadas por Inundaciones", 
        Version = "v1",
        Description = "API para gestionar el registro y seguimiento de personas afectadas por inundaciones en Veracruz"
    });
    
    // Include XML comments for better Swagger documentation
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendDomains", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200", 
                "http://localhost:3000",
                "https://localhost:4200", 
                "https://localhost:3000",
                "http://registro-personas-albergue.runasp.net",
                "https://registro-personas-albergue.runasp.net"
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
    
    // Política alternativa para desarrollo amplio si es necesario
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Registro Inundaciones API v1");
        c.RoutePrefix = "swagger";
        c.DisplayRequestDuration();
        c.EnableTryItOutByDefault();
    });
}

 app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Registro Inundaciones API v1");
        c.RoutePrefix = "swagger";
        c.DisplayRequestDuration();
        c.EnableTryItOutByDefault();
    });

app.UseHttpsRedirection();

// IMPORTANTE: CORS debe ir antes de UseAuthorization
app.UseCors("AllowFrontendDomains");

// Agregar middleware de API Key para autenticación
app.UseMiddleware<ApiKeyMiddleware>();

app.UseAuthorization();

app.MapControllers();

// Add health check endpoint for debugging
app.MapGet("/health", () => new { 
    Status = "Healthy", 
    Environment = app.Environment.EnvironmentName,
    Timestamp = DateTime.UtcNow 
});

app.Run();
