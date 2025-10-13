export const APP_CONFIG = {
  name: 'Sistema de Registro de Inundaciones',
  version: '1.0.0',
  environment: 'development',
  
  // Configuración de paginación
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50]
  },
  
  // Configuración de validación
  validation: {
    minAge: 0,
    maxAge: 120,
    phonePattern: /^[0-9]{10}$/,
    emailPattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  
  // Estados válidos
  estados: {
    persona: ['Registrado', 'En_Albergue', 'Trasladado', 'Egresado', 'Desaparecido'],
    albergue: ['Activo', 'Inactivo', 'Lleno', 'Mantenimiento'],
    grupoFamiliar: ['Activo', 'Trasladado', 'Egresado']
  },
  
  // Configuración de UI
  ui: {
    snackbarDuration: 3000,
    loadingTimeout: 30000
  }
} as const;