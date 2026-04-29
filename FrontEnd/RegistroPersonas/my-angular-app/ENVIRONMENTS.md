# 🌍 Variables de Entorno - Sistema Registro Inundaciones

## 📋 **Configuración de Entornos**

Este proyecto utiliza variables de entorno para manejar diferentes configuraciones según el ambiente de despliegue.

### **Archivos de Entorno**

```
src/environments/
├── environment.ts                 # Producción (por defecto)
├── environment.development.ts     # Desarrollo local
└── environment.staging.ts         # Staging/Testing
```

## ⚙️ **Variables Disponibles**

### **🔧 environment.development.ts (Desarrollo)**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5120/api',
  apiKey: 'sistema-registro-inundaciones-2024-api-key-secure',
  appName: 'Sistema Registro Inundaciones - DEV',
  enableLogging: true,
  version: '1.0.0-dev'
};
```

### **🚀 environment.ts (Producción)**
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://registro-inundaciones-api.runasp.net/api',
  apiKey: 'sistema-registro-inundaciones-2024-api-key-secure',
  appName: 'Sistema Registro Inundaciones',
  enableLogging: false,
  version: '1.0.0'
};
```

### **🧪 environment.staging.ts (Staging)**
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7174/api',
  apiKey: 'sistema-registro-inundaciones-2024-api-key-secure-staging',
  appName: 'Sistema Registro Inundaciones - STAGING',
  enableLogging: true,
  version: '1.0.0-staging'
};
```

## 🚀 **Comandos para Compilar por Entorno**

### **Desarrollo (por defecto):**
```bash
ng serve
# o específicamente
ng serve --configuration development
ng build --configuration development
```

### **Staging:**
```bash
ng serve --configuration staging
ng build --configuration staging
```

### **Producción:**
```bash
ng build --configuration production
ng build  # (producción es el default)
```

## 📖 **Cómo Usar las Variables**

### **1. Importar en cualquier componente/servicio:**
```typescript
import { environment } from '../environments/environment';

// Usar las variables
console.log('API URL:', environment.apiUrl);
console.log('App Name:', environment.appName);
```

### **2. Ejemplos de uso:**

#### **En AuthService:**
```typescript
export class AuthService {
  private readonly API_URL = environment.apiUrl;  // ✅ Dinámico por entorno
  
  constructor(private http: HttpClient) {
    if (environment.enableLogging) {
      console.log('AuthService initialized with API:', this.API_URL);
    }
  }
}
```

#### **En ApiKeyInterceptor:**
```typescript
export class ApiKeyInterceptor implements HttpInterceptor {
  private readonly API_KEY = environment.apiKey;  // ✅ Diferente por entorno
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes(environment.apiUrl)) {
      const apiKeyReq = req.clone({
        headers: req.headers.set('X-API-Key', this.API_KEY)
      });
      return next.handle(apiKeyReq);
    }
    return next.handle(req);
  }
}
```

#### **En Componentes:**
```typescript
export class HomeComponent {
  get appName() {
    return environment.appName;  // ✅ Muestra nombre según entorno
  }
  
  get appVersion() {
    return environment.version;
  }
}
```

## 🔒 **Configuración de Seguridad**

### **API Keys por Entorno:**
- **Desarrollo**: `sistema-registro-inundaciones-2024-api-key-secure`
- **Staging**: `sistema-registro-inundaciones-2024-api-key-secure-staging`  
- **Producción**: `sistema-registro-inundaciones-2024-api-key-secure`

### **URLs de API:**
- **Desarrollo**: `http://localhost:5120/api`
- **Staging**: `https://localhost:7174/api`
- **Producción**: `https://registro-inundaciones-api.runasp.net/api`

## 📝 **Agregar Nuevas Variables**

### **1. Agregar a todos los archivos de environment:**
```typescript
// Agregar en environment.ts, environment.development.ts, environment.staging.ts
export const environment = {
  // ... variables existentes
  newVariable: 'valor-para-este-entorno',
  featureFlags: {
    enableNewFeature: true,
    enableBetaFeatures: false
  }
};
```

### **2. Usar en el código:**
```typescript
import { environment } from '../environments/environment';

if (environment.featureFlags.enableNewFeature) {
  // Código para la nueva característica
}
```

## 🎯 **Scripts NPM Personalizados**

Puedes agregar estos scripts en `package.json`:

```json
{
  "scripts": {
    "start": "ng serve --configuration development",
    "start:staging": "ng serve --configuration staging",
    "start:prod": "ng serve --configuration production",
    "build:dev": "ng build --configuration development",
    "build:staging": "ng build --configuration staging",  
    "build:prod": "ng build --configuration production"
  }
}
```

## 🚨 **Buenas Prácticas**

1. **Nunca commitear secretos reales** en los archivos de environment
2. **Usar variables de entorno del sistema** para datos sensibles en producción
3. **Mantener coherencia** en los nombres de variables entre entornos
4. **Documentar** cualquier nueva variable agregada
5. **Validar** que todas las configuraciones funcionen en cada entorno

## 🔍 **Debugging de Entornos**

Para verificar qué entorno está siendo usado:

```typescript
console.log('Environment:', {
  production: environment.production,
  apiUrl: environment.apiUrl,
  appName: environment.appName
});
```

Esta información te ayudará a solucionar problemas relacionados con configuraciones específicas del entorno.