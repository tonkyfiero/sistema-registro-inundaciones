# 🐛 Debug: Problema con el mapeo del albergue

## Problema identificado
El albergue no se está enviando correctamente cuando se crea una persona, aunque el control del formulario parece estar funcionando bien.

## 🔧 Cambios realizados para debugging

### 1. Frontend - Componente
Se agregaron logs de debug en:
- `registrarPersonaIndividual()`: Para ver datos del albergue individual
- `registrarGrupoFamiliar()`: Para ver datos del albergue en grupo familiar
- `guardarRegistro()`: Para ver estado general del formulario

### 2. Frontend - Servicio
Se agregaron logs en:
- `PersonasService.createPersona()`: Para ver qué se está enviando al backend

## 📋 Pasos para testing

### 1. Compilar y servir la aplicación
```bash
cd "c:\Users\ulise\OneDrive\Documentos\Codigo\FrontEnd\RegistroPersonas\my-angular-app"
ng serve
```

### 2. Abrir Developer Tools
- F12 en el navegador
- Ir a la pestaña Console
- Limpiar la consola antes de hacer la prueba

### 3. Hacer prueba de registro
1. Llenar el formulario completo
2. **IMPORTANTE**: Seleccionar un municipio para albergue
3. **IMPORTANTE**: Seleccionar un albergue
4. Enviar el formulario
5. Revisar los logs en la consola

### 4. Logs esperados
Deberías ver estos logs en secuencia:

```
=== DEBUG GUARDAR REGISTRO ===
Formulario válido: true
Datos completos del formulario: { informacionIngreso: { albergueId: "123" } }
Estado de informacionIngreso: { municipioAlbergueId: "1", albergueId: "123" }
===============================

=== DEBUG ALBERGUE ===
formData.informacionIngreso: { municipioAlbergueId: "1", albergueId: "123" }
albergueId raw: "123"
albergueId parseado: 123
======================

=== DEBUG REQUEST ===
CreatePersonaRequest completo: { albergueId: 123, ... }
=====================

=== DEBUG SERVICE ===
Request original: { albergueId: 123, ... }
DTO a enviar: { albergueId: 123, ... }
AlbergueId en DTO: 123
====================
```

## 🔍 Qué buscar

### ❌ Posibles problemas:

1. **albergueId es null o undefined**
   - Verificar si el dropdown está poblándose correctamente
   - Verificar si el value del option es correcto

2. **albergueId es string en lugar de number**
   - Debería parsearse a number antes del envío
   - Verificar que parseInt() funciona correctamente

3. **Formulario no es válido**
   - Verificar si hay errores de validación
   - Puede estar bloqueando el envío

4. **Request no se está enviando**
   - Verificar errores de red en Network tab
   - Verificar si hay errores CORS

### ✅ Lo que debe pasar:
- `albergueId` debe tener un valor numérico válido
- El formulario debe ser válido
- El request debe enviarse al backend con albergueId incluido

## 🛠️ Debugging adicional

Si no ves logs claros, agregar breakpoints:
1. Poner breakpoint en `registrarPersonaIndividual()` línea ~350
2. Poner breakpoint en `PersonasService.createPersona()` línea ~140
3. Inspeccionar variables en tiempo de ejecución

## 📝 Reporte de resultados

Después de la prueba, reportar:
1. **Estado del formulario**: ¿Es válido?
2. **Valor del albergue**: ¿Qué valor tiene `albergueId`?
3. **Logs en consola**: Copiar todos los logs de debug
4. **Errores en Network**: Si hay errores HTTP
5. **Resultado final**: ¿Se creó la persona? ¿Con albergue asignado?

## 🔧 Posibles soluciones

Si el problema persiste, verificar:

### En el HTML template:
```html
<p-dropdown 
  formControlName="albergueId"
  [options]="albergueOptions"
  optionLabel="label"
  optionValue="value"  <!-- ⚠️ Verificar que esto esté correcto -->
  placeholder="Seleccione un albergue">
</p-dropdown>
```

### En el servicio de albergues:
```typescript
// Verificar que los options se mapeen correctamente
albergueOptions = albergues.map(a => ({
  label: a.nombre,
  value: a.id.toString()  // ⚠️ Verificar formato
}));
```

### En el backend:
- Verificar que `AlbergueId` se esté recibiendo en el DTO
- Verificar que se esté guardando en la base de datos