import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  baseUrl: environment.apiUrl,
  endpoints: {
    municipios: '/Municipios',
    albergues: '/Albergues', 
    personas: '/Personas',
    gruposFamiliares: '/GruposFamiliares',
    auth: '/Auth'
  }
} as const;

// Configuración adicional basada en el entorno
export const APP_CONFIG = {
  appName: environment.appName,
  version: environment.version,
  enableLogging: environment.enableLogging,
  production: environment.production
} as const;

export const API_URLS = {
  // Municipios
  MUNICIPIOS_BASE: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.municipios}`,
  MUNICIPIOS_CON_ASENTAMIENTOS: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.municipios}/con-asentamientos`,
  
  // Albergues
  ALBERGUES_BASE: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.albergues}`,
  ALBERGUES_DISPONIBLES: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.albergues}/disponibles`,
  ALBERGUES_POR_MUNICIPIO: (municipioId: number) => `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.albergues}/municipio/${municipioId}`,
  
  // Personas
  PERSONAS_BASE: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.personas}`,
  PERSONAS_BUSCAR: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.personas}/buscar`,
  PERSONAS_ASIGNAR_ALBERGUE: (personaId: number, albergueId: number) => `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.personas}/${personaId}/asignar-albergue/${albergueId}`,
  
  // Grupos Familiares
  GRUPOS_FAMILIARES_BASE: `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.gruposFamiliares}`,
  GRUPOS_FAMILIARES_POR_ALBERGUE: (albergueId: number) => `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.gruposFamiliares}/albergue/${albergueId}`
} as const;