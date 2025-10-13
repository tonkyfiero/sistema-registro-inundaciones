# API de Registro de Personas Afectadas por Inundaciones

API REST desarrollada con .NET 9 y Entity Framework Core para gestionar el registro y seguimiento de personas afectadas por inundaciones en Veracruz.

## 🚀 Características

- **CRUD completo** para Municipios, Asentamientos, Albergues y Personas
- **Búsqueda avanzada** de personas por nombre o código
- **Gestión de capacidad** de albergues en tiempo real
- **Relaciones familiares** y grupos familiares
- **Condiciones médicas** y seguimiento de salud
- **Documentación automática** con Swagger/OpenAPI
- **CORS configurado** para Angular frontend

## 📋 Endpoints Principales

### Municipios (`/api/municipalities`)
- `GET /api/municipalities` - Obtener todos los municipios
- `GET /api/municipalities/{id}` - Obtener municipio por ID
- `POST /api/municipalities` - Crear nuevo municipio
- `PUT /api/municipalities/{id}` - Actualizar municipio
- `DELETE /api/municipalities/{id}` - Eliminar municipio

### Asentamientos (`/api/settlements`)
- `GET /api/settlements` - Obtener todos los asentamientos
- `GET /api/settlements/by-municipality/{municipalityId}` - Asentamientos por municipio
- `POST /api/settlements` - Crear nuevo asentamiento

### Albergues (`/api/shelters`)
- `GET /api/shelters` - Obtener todos los albergues
- `GET /api/shelters/available` - Albergues con capacidad disponible
- `GET /api/shelters/by-municipality/{municipalityId}` - Albergues por municipio
- `PATCH /api/shelters/{id}/capacity` - Actualizar capacidad actual

### Personas (`/api/persons`)
- `GET /api/persons` - Obtener personas (con paginación y filtros)
- `GET /api/persons/search?query={nombre}` - Buscar personas
- `POST /api/persons` - Registrar nueva persona
- `PATCH /api/persons/{id}/assign-shelter` - Asignar persona a albergue

## 🛠️ Configuración y Ejecución

### Prerrequisitos
- .NET 9 SDK
- SQL Server (LocalDB o instancia completa)
- Visual Studio Code o Visual Studio

### Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd Backend/NetCore8API
   ```

2. **Configurar la cadena de conexión:**
   Editar `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=registro_inundaciones_db;Trusted_Connection=true;TrustServerCertificate=true;"
     }
   }
   ```

3. **Instalar dependencias:**
   ```bash
   dotnet restore
   ```

4. **Aplicar migraciones (crear base de datos):**
   ```bash
   dotnet ef database update
   ```

5. **Ejecutar la aplicación:**
   ```bash
   dotnet run
   ```

6. **Acceder a Swagger UI:**
   Abrir navegador en: `http://localhost:5120/swagger`

## 📊 Modelo de Datos

### Entidades Principales

- **Municipality** - Municipios afectados
- **Settlement** - Asentamientos/colonias
- **Shelter** - Albergues temporales  
- **Person** - Personas registradas
- **FamilyGroup** - Grupos familiares
- **MedicalCondition** - Condiciones médicas
- **User** - Usuarios del sistema

### Relaciones

- Un municipio tiene múltiples asentamientos y albergues
- Un albergue puede tener múltiples grupos familiares
- Una persona pertenece a un municipio y opcionalmente a un albergue
- Una persona puede tener múltiples condiciones médicas

## 🔧 Estructura del Proyecto

```
NetCore8API/
├── Controllers/          # Controladores REST API
├── Data/                # Contexto de Entity Framework  
├── Models/              # Entidades de dominio
├── Migrations/          # Migraciones de EF Core
├── Properties/          # Configuración de lanzamiento
├── Program.cs           # Punto de entrada
└── appsettings.json     # Configuración
```

## 📈 Funcionalidades Avanzadas

### Búsqueda Inteligente
- Búsqueda por nombre, apellidos o código de persona
- Filtros por municipio y albergue
- Paginación automática

### Gestión de Capacidad
- Control automático de capacidad de albergues
- Validación antes de asignaciones
- Estados de albergue (Activo, Inactivo, Lleno, Mantenimiento)

### Códigos Únicos
- Generación automática de códigos para personas
- Formato: `PER{YYMMDD}{NNNN}`

## 🌐 CORS y Frontend

La API está configurada para aceptar peticiones desde:
- `http://localhost:4200` (Angular development server)

Para agregar más orígenes, modificar la configuración CORS en `Program.cs`.

## 📝 Próximas Funcionalidades

- [ ] Autenticación JWT
- [ ] Autorización por roles
- [ ] Exportación de reportes
- [ ] Notificaciones push
- [ ] Auditoría de cambios

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.