# 🏠 Sistema de Registro de Personas Afectadas por Inundaciones

Sistema integral para el registro y gestión de personas afectadas por inundaciones, desarrollado con **.NET Core 8** en el backend y **Angular 17** en el frontend.

## 📋 Descripción

Este sistema permite registrar, buscar y gestionar información de personas afectadas por inundaciones, incluyendo:

- ✅ Registro de personas con datos personales y médicos
- 🔍 Búsqueda avanzada con filtros múltiples
- 🏘️ Gestión de albergues y municipios
- 👨‍👩‍👧‍👦 Manejo de grupos familiares
- 📊 Información detallada en modales
- 🧭 Navegación con breadcrumbs

## 🛠️ Tecnologías Utilizadas

### Backend
- **.NET Core 8** - Framework principal
- **Entity Framework Core** - ORM para base de datos
- **AutoMapper** - Mapeo de objetos
- **SQL Server** - Base de datos
- **Clean Architecture** - Patrón arquitectónico

### Frontend  
- **Angular 17** - Framework de frontend
- **PrimeNG** - Librería de componentes UI
- **TypeScript** - Lenguaje de programación
- **SCSS** - Preprocesador CSS
- **Standalone Components** - Arquitectura de Angular

## 📁 Estructura del Proyecto

```
Codigo/
├── Backend/
│   └── NetCore8API/
│       ├── Controllers/          # Controladores de API
│       ├── Domain/               # Entidades de dominio
│       ├── Application/          # Servicios y DTOs
│       ├── Infrastructure/       # Repositorios y contexto
│       └── Migrations/           # Migraciones de BD
│
└── FrontEnd/
    └── RegistroPersonas/
        └── my-angular-app/
            ├── src/app/
            │   ├── core/         # Servicios y configuración
            │   ├── domain/       # Modelos de dominio
            │   ├── presentation/ # Componentes de UI
            │   └── shared/       # Componentes compartidos
            └── dist/            # Build de producción
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **.NET 8 SDK**
- **Node.js** (v18 o superior)
- **Angular CLI** (`npm install -g @angular/cli`)
- **SQL Server** (LocalDB o instancia completa)

### Backend (.NET Core 8)
```bash
cd Backend/NetCore8API
dotnet restore
dotnet build
dotnet run
```

### Frontend (Angular 17)
```bash
cd FrontEnd/RegistroPersonas/my-angular-app
npm install
ng serve
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5120/api
- **Swagger**: http://localhost:5120/swagger

## 📊 Características Principales

### 🔍 Búsqueda Avanzada
- Filtro por texto general (nombre, apellido, colonia)
- Filtro por municipio del albergue
- Filtro por sexo
- Filtro por rango de edad
- Filtro por fecha de llegada

### 📋 Gestión de Datos
- **Personas**: Registro completo con datos personales y médicos
- **Albergues**: Gestión de centros de refugio
- **Municipios**: Organización territorial
- **Grupos Familiares**: Manejo de familias completas

### 🎨 Interfaz de Usuario
- **Breadcrumbs**: Navegación clara entre secciones
- **Modales informativos**: Detalles completos con familiares
- **Tablas responsivas**: Con paginación y ordenamiento
- **Tags visuales**: Estados y categorías colorcodificadas

## 📝 API Endpoints

### Personas
- `GET /api/Personas` - Obtener todas las personas
- `GET /api/Personas/{id}` - Obtener persona por ID
- `POST /api/Personas` - Crear nueva persona
- `PUT /api/Personas/{id}` - Actualizar persona

### Albergues
- `GET /api/Albergues` - Obtener todos los albergues
- `GET /api/Albergues/disponibles` - Albergues con capacidad

### Municipios
- `GET /api/Municipios` - Obtener todos los municipios

### Grupos Familiares
- `GET /api/GruposFamiliares/{id}/miembros` - Obtener miembros del grupo

## 🎯 Próximas Funcionalidades

- [ ] Dashboard con estadísticas
- [ ] Reportes en PDF/Excel  
- [ ] Sistema de notificaciones
- [ ] Gestión de usuarios y roles
- [ ] API de geolocalización
- [ ] Aplicación móvil

## 👥 Equipo de Desarrollo

- **Desarrollador Principal**: Ulises
- **Tecnologías**: .NET Core 8, Angular 17, SQL Server

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

⭐ **¡Dale una estrella al repositorio si te ha sido útil!**