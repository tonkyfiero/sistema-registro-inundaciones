# Configuración CORS - Guía de Implementación

## Cambios Realizados

### 1. Configuración CORS en Program.cs
- ✅ Agregado soporte para múltiples dominios
- ✅ Incluido `http://registro-personas-albergue.runasp.net`
- ✅ Incluido `https://registro-personas-albergue.runasp.net`
- ✅ Mantenido soporte para desarrollo local

### 2. Middleware Personalizado
- ✅ Creado `CorsMiddleware.cs` para manejo avanzado
- ✅ Logging detallado para debugging
- ✅ Manejo de preflight requests (OPTIONS)

### 3. Dominios Permitidos
```
- http://localhost:4200 (desarrollo local)
- https://localhost:4200 (desarrollo local HTTPS)
- http://localhost:3000 (desarrollo alternativo)
- https://localhost:3000 (desarrollo alternativo HTTPS)
- http://registro-personas-albergue.runasp.net (producción HTTP)
- https://registro-personas-albergue.runasp.net (producción HTTPS)
```

## Cómo Probar la Configuración

### 1. Prueba Local
```bash
# Iniciar el servidor
dotnet run

# En otra terminal, hacer una petición CORS
curl -H "Origin: http://registro-personas-albergue.runasp.net" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:5000/api/Municipios
```

### 2. Verificar Headers en Respuesta
Deberías ver estos headers en la respuesta:
```
Access-Control-Allow-Origin: http://registro-personas-albergue.runasp.net
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Content-Type, Authorization, Accept, X-Requested-With, Origin
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
```

### 3. Debugging
Los logs mostrarán información como:
```
CORS - Origin received: http://registro-personas-albergue.runasp.net
CORS - Headers added for origin: http://registro-personas-albergue.runasp.net
CORS - Handling OPTIONS preflight request
```

## Despliegue

### Antes del Despliegue
1. ✅ Verificar que el código compile sin errores
2. ✅ Probar localmente con el dominio de producción
3. ✅ Verificar logs para confirmar funcionamiento

### Después del Despliegue
1. Verificar que el API responda desde `http://datos-detalles.runasp.net`
2. Probar una petición CORS desde el frontend
3. Revisar logs del servidor si hay problemas

## Solución de Problemas

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
- ✅ Verificar que el dominio esté en la lista de allowedOrigins
- ✅ Verificar que el middleware esté registrado antes de UseCors
- ✅ Revisar logs para ver qué origin está recibiendo el servidor

### Error: "Credential mode is 'include'"
- ✅ La configuración ya incluye `AllowCredentials()`
- ✅ El middleware agrega `Access-Control-Allow-Credentials: true`

### Peticiones OPTIONS fallando
- ✅ El middleware maneja automáticamente las peticiones OPTIONS
- ✅ Retorna status 200 para preflight requests

## Comandos Útiles

```bash
# Compilar
dotnet build

# Ejecutar en modo desarrollo
dotnet run

# Ejecutar en modo producción
dotnet run --environment Production

# Ver logs detallados
dotnet run --verbosity detailed
```