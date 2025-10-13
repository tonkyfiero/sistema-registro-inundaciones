# Diagrama Entidad-Relación - Sistema de Registro de Personas Afectadas por Inundaciones

## Análisis de Entidades del Sistema

Basado en las interfaces TypeScript analizadas, he identificado las siguientes entidades principales:

### 1. **USUARIOS (users)**
- Gestiona el acceso al sistema con diferentes roles
- Controla permisos y asociación con albergues

### 2. **ALBERGUES (albergues)**  
- Centros de refugio temporal
- Capacidad, servicios y ubicación geográfica

### 3. **MUNICIPIOS (municipios)**
- Divisiones administrativas
- Contiene múltiples asentamientos

### 4. **ASENTAMIENTOS (asentamientos)**
- Colonias, fraccionamientos, etc.
- Pertenecen a un municipio específico

### 5. **PERSONAS (personas)**
- Datos personales de afectados
- Información médica y familiar

### 6. **GRUPOS_FAMILIARES (grupos_familiares)**
- Agrupación de personas relacionadas
- Identificación del jefe de familia

### 7. **CONDICIONES_MEDICAS (condiciones_medicas)**
- Registro de condiciones de salud
- Medicamentos y alergias

### 8. **PERSONA_CONDICIONES (persona_condiciones)**
- Tabla de relación muchos a muchos
- Entre personas y condiciones médicas

## Diagrama Entidad-Relación

```
┌─────────────────┐    1:N    ┌─────────────────┐
│    USUARIOS     │◄──────────┤    ALBERGUES    │
├─────────────────┤           ├─────────────────┤
│ • id (PK)       │           │ • id (PK)       │
│ • username      │           │ • nombre        │
│ • email         │           │ • direccion     │ 
│ • password_hash │           │ • municipio_id  │─┐
│ • role          │           │ • asentamiento  │ │
│ • albergue_id   │           │ • capacidad_max │ │
│ • created_at    │           │ • capacidad_act │ │
│ • updated_at    │           │ • servicios     │ │
└─────────────────┘           │ • contacto_tel  │ │
                              │ • contacto_email│ │
                              │ • responsable   │ │
                              │ • estado        │ │
                              │ • fecha_apertura│ │
                              │ • latitud       │ │
                              │ • longitud      │ │
                              └─────────────────┘ │
                                                  │
                              ┌─────────────────┐ │
                              │   MUNICIPIOS    │◄┘
                              ├─────────────────┤
                              │ • id (PK)       │
                              │ • nombre        │
                              │ • estado        │
                              └─────────────────┘
                                       │ 1:N
                                       ▼
                              ┌─────────────────┐
                              │  ASENTAMIENTOS  │
                              ├─────────────────┤
                              │ • id (PK)       │
                              │ • nombre        │
                              │ • municipio_id  │
                              │ • tipo_asent    │
                              │ • ambito        │
                              └─────────────────┘
                                       │ N:1
                                       ▼
┌─────────────────┐           ┌─────────────────┐
│GRUPOS_FAMILIARES│           │    PERSONAS     │
├─────────────────┤    1:N    ├─────────────────┤
│ • id (PK)       │◄──────────┤ • id (PK)       │
│ • cabeza_fam_id │           │ • nombre        │
│ • albergue_id   │           │ • apellido_pat  │
│ • fecha_registro│           │ • apellido_mat  │
│ • requiere_ayuda│           │ • edad          │
│ • descripcion   │           │ • sexo          │
│ • tipo_ayuda    │           │ • municipio_id  │
└─────────────────┘           │ • asentamiento  │
       │                      │ • fecha_llegada │
       │                      │ • fecha_salida  │
       │                      │ • ult_actualiz  │
       │                      │ • es_cabeza_fam │
       │                      │ • grupo_fam_id  │
       │                      │ • parentesco    │
       │                      │ • cont_emergenc │
       │                      └─────────────────┘
       │                               │ N:M
       │                               ▼
       │                      ┌─────────────────┐
       │                      │PERSONA_CONDICNS │
       │                      ├─────────────────┤
       │                      │ • persona_id    │
       │                      │ • condicion_id  │
       │                      │ • medicamentos  │
       │                      │ • alergias      │
       │                      │ • req_especiales│
       │                      │ • descripcion   │
       │                      └─────────────────┘
       │                               │ N:1
       │                               ▼
       │                      ┌─────────────────┐
       │                      │CONDICIONES_MEDCS│
       │                      ├─────────────────┤
       │                      │ • id (PK)       │
       │                      │ • tipo          │
       │                      │ • descripcion   │
       │                      │ • activa        │
       │                      └─────────────────┘
       │
       │ N:1
       ▼
┌─────────────────┐
│    ALBERGUES    │
│   (Referencia)  │
└─────────────────┘
```

## Relaciones Principales

1. **USUARIOS ↔ ALBERGUES**: 1:N (Un albergue puede tener múltiples usuarios, pero un usuario pertenece a un albergue)

2. **MUNICIPIOS ↔ ASENTAMIENTOS**: 1:N (Un municipio tiene múltiples asentamientos)

3. **MUNICIPIOS ↔ ALBERGUES**: 1:N (Un municipio puede tener múltiples albergues)

4. **GRUPOS_FAMILIARES ↔ PERSONAS**: 1:N (Un grupo familiar contiene múltiples personas)

5. **ALBERGUES ↔ GRUPOS_FAMILIARES**: 1:N (Un albergue aloja múltiples grupos familiares)

6. **PERSONAS ↔ CONDICIONES_MEDICAS**: N:M (Una persona puede tener múltiples condiciones médicas)

7. **ASENTAMIENTOS ↔ PERSONAS**: 1:N (Un asentamiento puede tener múltiples personas)

## Características Clave del Diseño

- **Integridad referencial**: Todas las relaciones mantienen consistencia
- **Normalización**: Evita redundancia de datos
- **Flexibilidad**: Permite grupos familiares y personas individuales
- **Trazabilidad**: Registra fechas de llegada, salida y actualizaciones
- **Seguridad**: Sistema de roles para control de acceso
- **Escalabilidad**: Diseño preparado para múltiples municipios y albergues