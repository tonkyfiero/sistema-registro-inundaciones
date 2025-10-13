# 🐛 Guía de Debugging - API Registro Inundaciones

## 📋 Configuración Completada

Tu proyecto está ahora **completamente configurado para debugging** con las siguientes mejoras:

### ✅ Configuraciones de Debug Agregadas:

1. **launchSettings.json** - 3 perfiles de lanzamiento:
   - `http` - Desarrollo HTTP
   - `https` - Desarrollo HTTPS  
   - `Debug API` - Perfil optimizado para debugging

2. **appsettings.Development.json** - Logging detallado:
   - Entity Framework queries visibles
   - Errores detallados habilitados
   - Logs de debug para el proyecto

3. **Program.cs** mejorado:
   - Logging de consola y debug
   - Sensitive data logging (solo desarrollo)
   - Developer exception page
   - Health check endpoint

4. **VS Code configuración**:
   - `launch.json` - Debugging automático
   - `tasks.json` - Tareas build/watch/EF
   - `extensions.json` - Extensiones recomendadas

## 🚀 Cómo Hacer Debug

### Opción 1: Visual Studio Code

1. **Abrir proyecto:**
   ```bash
   code "C:\Users\ulise\OneDrive\Documentos\Codigo\Backend\NetCore8API"
   ```

2. **Instalar extensiones recomendadas** (aparecerá popup automáticamente)

3. **Poner breakpoints** en el código (click izquierdo en número de línea)

4. **Ejecutar debug:**
   - Presiona `F5` o
   - Ve a "Run and Debug" > "Launch API"
   - Se abrirá automáticamente Swagger en el navegador

### Opción 2: Visual Studio

1. Abrir el archivo `.csproj` o `.sln`
2. Configurar como "Startup Project" 
3. Seleccionar perfil "Debug API"
4. Presionar F5

### Opción 3: Terminal con Watch Mode

```bash
cd "C:\Users\ulise\OneDrive\Documentos\Codigo\Backend\NetCore8API"
dotnet watch run --profile "Debug API"
```

## 🔍 Herramientas de Debug Disponibles

### 1. Health Check Endpoint
```
GET http://localhost:5120/health
```
Verifica estado de la API y configuración.

### 2. Archivo de Pruebas REST
Archivo: `api-tests.http`
- Pruebas predefinidas para todos los endpoints
- Usa la extensión REST Client de VS Code

### 3. Swagger UI Mejorado
- URL: `http://localhost:5120/swagger`
- Try It Out habilitado por defecto
- Duración de requests visible
- Documentación XML incluida

### 4. Logging Detallado
En la consola verás:
- **SQL queries** ejecutadas por EF Core
- **Request/Response** details
- **Errores detallados** con stack trace
- **Debug messages** del código

## 🐞 Puntos Comunes para Debug

### Controllers Recomendados:
1. **PersonsController.cs** - Lógica más compleja
2. **SheltersController.cs** - Gestión de capacidad
3. **ApplicationDbContext.cs** - Configuración EF

### Métodos Clave para Breakpoints:
```csharp
// PersonsController
- PostPerson() - Creación de personas
- AssignToShelter() - Asignación a albergues
- SearchPersons() - Búsqueda

// SheltersController  
- UpdateShelterCapacity() - Control de capacidad
- GetAvailableShelters() - Filtros de disponibilidad

// ApplicationDbContext
- OnModelCreating() - Configuración de relaciones
```

## 📊 Variables de Entorno Configuradas

```
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_DETAILEDERRORS=true
ASPNETCORE_URLS=http://localhost:5120
```

## 🔧 Tareas VS Code Disponibles

- `Ctrl+Shift+P` > "Tasks: Run Task":
  - **build** - Compilar proyecto
  - **watch** - Modo watch (auto-reload)
  - **ef-migrations-add** - Agregar migración
  - **ef-database-update** - Actualizar BD

## 📝 Tips de Debugging

1. **Breakpoints Condicionales:**
   - Click derecho en breakpoint > "Edit Breakpoint"
   - Agregar condición: `person.Age > 65`

2. **Watch Variables:**
   - Agregar variables al panel "Watch"
   - Ver cambios en tiempo real

3. **Call Stack:**
   - Ver la pila de llamadas completa
   - Navegar entre frames

4. **Debug Console:**
   - Ejecutar código C# en tiempo real
   - Evaluar expresiones

## 🌐 URLs Importantes

- **API Base:** http://localhost:5120
- **Swagger:** http://localhost:5120/swagger
- **Health:** http://localhost:5120/health

## 🆘 Solución de Problemas

### Si no conecta a la BD:
1. Verificar connection string en `appsettings.Development.json`
2. Ejecutar: `dotnet ef database update`
3. Ver logs en consola para errores SQL

### Si los breakpoints no funcionan:
1. Compilar en modo Debug: `dotnet build --configuration Debug`
2. Verificar que no estés en Release mode
3. Reiniciar VS Code/Visual Studio

¡Tu proyecto está listo para debugging profesional! 🎉