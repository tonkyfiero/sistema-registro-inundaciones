# Estructura de Carpetas - Clean Architecture Angular

Esta estructura sigue los principios de **Clean Architecture** basada en el proyecto RegistrosPersonasAngular.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Funcionalidades centrales singleton
│   │   ├── guards/             # Guards de autenticación y autorización  
│   │   ├── models/             # Modelos centrales compartidos
│   │   ├── services/           # Servicios singleton globales
│   │   └── index.ts            # Barrel exports
│   │
│   ├── domain/                  # Capa de dominio (Clean Architecture)
│   │   ├── entities/           # Entidades de negocio e interfaces
│   │   ├── repositories/       # Interfaces de repositorios
│   │   └── index.ts            # Barrel exports
│   │
│   ├── data/                    # Capa de datos (implementaciones)
│   │   ├── repositories/       # Implementaciones de repositorios
│   │   └── index.ts            # Barrel exports
│   │
│   ├── presentation/            # Capa de presentación
│   │   └── pages/              # Páginas/componentes de página
│   │
│   ├── shared/                  # Recursos compartidos
│   │   ├── components/         # Componentes reutilizables
│   │   └── index.ts            # Barrel exports
│   │
│   ├── app.ts                  # Componente raíz
│   ├── app.html               # Template principal
│   ├── app.scss               # Estilos principales
│   ├── app.routes.ts          # Configuración de rutas
│   ├── app.config.ts          # Configuración de la aplicación
│   └── _colors.scss           # Funciones de colores SCSS
│
├── styles/                      # Estilos globales organizados
├── assets/                      # Recursos estáticos
├── types/                       # Tipos TypeScript globales
└── main.ts                     # Bootstrap de la aplicación
```

## 🎯 Principios de Organización

### **Core Module**
- Servicios singleton que se usan en toda la app
- Guards, interceptors y configuraciones globales
- Se importa una sola vez en el módulo raíz

### **Shared Module**  
- Componentes, pipes y directivas reutilizables
- Utilidades y constantes comunes
- Se puede importar en múltiples módulos

### **Feature Modules**
- Módulos funcionales específicos con lazy loading
- Cada feature tiene sus propios componentes y servicios
- Encapsulación de funcionalidades de negocio

### **Layouts**
- Plantillas de estructura de página
- Separación entre diferentes tipos de layouts
- Reutilización de estructuras comunes

### **Data Layer**
- Modelos de datos y DTOs
- Interfaces y tipos TypeScript  
- Repositorios para acceso a datos
- Separación de la lógica de datos

## 🔧 Uso de Barrel Exports

Cada carpeta principal tiene un `index.ts` que facilita las importaciones:

```typescript
// En lugar de múltiples imports
import { Service1 } from './core/services/service1';
import { Service2 } from './core/services/service2';

// Usa barrel exports
import { Service1, Service2 } from './core';
```

## 📝 Beneficios

- ✅ **Escalabilidad**: Fácil agregar nuevas features
- ✅ **Mantenibilidad**: Código organizado y predecible
- ✅ **Reutilización**: Componentes y servicios compartidos
- ✅ **Lazy Loading**: Carga bajo demanda de features
- ✅ **Testing**: Estructura clara para pruebas
- ✅ **Colaboración**: Equipos pueden trabajar en paralelo