# ✅ SOLUCIONADO: Problema del mapeo del albergue

## 🐛 Problema identificado
El `albergueId` no se estaba guardando en la base de datos al crear una persona porque el mapeo de AutoMapper en el backend era incompleto.

## 🔍 Causa raíz encontrada
1. **Frontend**: Enviaba correctamente `"albergueId": 2` en el DTO ✅
2. **Backend**: El DTO `CrearPersonaDto` **NO tenía** la propiedad `AlbergueId` ❌
3. **AutoMapper**: No podía mapear `albergueId` → `AlbergueActualId` ❌

## 🔧 Soluciones aplicadas

### 1. Backend - DTO actualizado
**Archivo**: `PersonaDto.cs`
```csharp
public class CrearPersonaDto
{
    // ...propiedades existentes...
    public int? AlbergueId { get; set; }  // ← AGREGADO
    // ...resto de propiedades...
}
```

### 2. Backend - Mapeo corregido  
**Archivo**: `MappingProfile.cs`
```csharp
CreateMap<CrearPersonaDto, Persona>()
    .ForMember(dest => dest.AlbergueActualId, opt => opt.MapFrom(src => src.AlbergueId));
```

### 3. Frontend - Debug logs agregados
Para facilitar debugging futuro en:
- `registro-persona.component.ts`
- `personas.service.ts`

## 📋 Para probar la solución

1. **Republicar el backend** con los cambios
2. **Registrar una persona** seleccionando un albergue
3. **Verificar** que la respuesta incluya:
   ```json
   {
     "albergueActualId": 2,        // ← Debería tener valor
     "albergueNombre": "...",      // ← Debería aparecer
     "albergueMunicipioNombre": "..." // ← Debería aparecer
   }
   ```

## 🚀 Próximos pasos

1. **Publicar backend** con los cambios aplicados
2. **Probar registro** de persona individual  
3. **Probar registro** de grupo familiar
4. **Remover logs de debug** una vez confirmado que funciona

## 📝 Archivos modificados

### Backend:
- `Application/DTOs/PersonaDto.cs` - Agregada propiedad `AlbergueId`
- `Application/Mappings/MappingProfile.cs` - Corregido mapeo

### Frontend (debugging):
- `registro-persona.component.ts` - Agregados logs de debug
- `personas.service.ts` - Agregados logs de debug

---

**Status**: ✅ **LISTO PARA PROBAR** - Backend corrige y compila correctamente