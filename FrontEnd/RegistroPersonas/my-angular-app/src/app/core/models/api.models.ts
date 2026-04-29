// DTOs que coinciden con el backend .NET
export interface MunicipioDto {
  id: number;
  nombre: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
  asentamientos?: AsentamientoDto[];
}

export interface MunicipioDetalleDto {
  id: number;
  nombre: string;
  estado: string;
  asentamientos?: AsentamientoDto[];
  albergues?: AlbergueDto[];
  createdAt: string;
  updatedAt: string;
}

export interface MunicipioConAsentamientosDto {
  id: number;
  nombre: string;
  estado: string;
  asentamientos?: AsentamientoDto[];
}

export interface AsentamientoDto {
  id: number;
  nombre: string;
  municipioId: number;
  municipioNombre: string;
  tipoAsentamiento: string;
  ambito: string;
}

export interface AlbergueDto {
  id: number;
  nombre: string;
  direccion: string;
  municipioId: number;
  municipioNombre: string;
  asentamiento?: string;
  capacidadMaxima: number;
  capacidadActual: number;
  capacidadDisponible: number;
  servicios?: string;
  contactoTelefono?: string;
  contactoEmail?: string;
  responsable: string;
  estado: string;
  fechaApertura: string;
  latitud?: number;
  longitud?: number;
}

export interface CreateAlbergueDto {
  nombre: string;
  direccion: string;
  municipioId: number;
  asentamiento?: string;
  capacidadMaxima: number;
  servicios?: string;
  contactoTelefono?: string;
  contactoEmail?: string;
  responsable: string;
  fechaApertura: string;
  latitud?: number;
  longitud?: number;
}

export interface UpdateAlbergueDto {
  nombre: string;
  direccion: string;
  municipioId: number;
  asentamiento?: string;
  capacidadMaxima: number;
  servicios?: string;
  contactoTelefono?: string;
  contactoEmail?: string;
  responsable: string;
  estado: string;
  latitud?: number;
  longitud?: number;
}

export interface PersonaDto {
  id: number;
  codigoPersona?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  edad: number;
  sexo: string;
  municipioId: number;
  municipioNombre: string;
  asentamientoNombre: string;
  direccionAnterior?: string;
  fechaHoraLlegada: string;
  fechaHoraSalida?: string;
  esCabezaFamilia: boolean;
  grupoFamiliarId?: number;
  parentesco?: string;
  albergueActualId?: number;
  albergueNombre?: string;
  albergueMunicipioNombre?: string;
  estadoPersona: string;
  observaciones?: string;
  documentoIdentidad?: string;
  telefonoContacto?: string;
  condicionesMedicas?: PersonaCondicionMedicaDto[];
}

export interface CrearPersonaDto {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  edad: number;
  sexo: string;
  municipioId: number;
  asentamientoNombre: string;
  direccionAnterior?: string;
  esCabezaFamilia: boolean;
  grupoFamiliarId?: number;
  parentesco?: string;
  albergueId?: number;
  observaciones?: string;
  documentoIdentidad?: string;
  telefonoContacto?: string;
}

export interface ActualizarPersonaDto {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  edad: number;
  asentamientoNombre: string;
  direccionAnterior?: string;
  parentesco?: string;
  estadoPersona: string;
  observaciones?: string;
  telefonoContacto?: string;
}

export interface PersonaCondicionMedicaDto {
  id: number;
  condicionId: number;
  tipoCondicion: string;
  descripcionEspecifica?: string;
  medicamentos?: string;
  alergias?: string;
  esCritica: boolean;
}

export interface ActualizarCapacidadDto {
  nuevaCapacidad: number;
}

export interface EstadisticasAlberguesDto {
  total: number;
  activos: number;
  llenos: number;
  inactivos: number;
  ocupacionGeneral: number;
  capacidadTotal: number;
  personasAlojadas: number;
}

// Parámetros de consulta
export interface PersonaQueryParams {
  pagina?: number;
  tamanoPagina?: number;
  municipioId?: number;
  albergueId?: number;
}

export interface BuscarPersonaParams {
  termino: string;
}

// Respuestas de API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}