// Interfaces base
export interface PersonaBase {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  edad: number;
  sexo?: 'M' | 'F';
}

export interface UbicacionInfo {
  municipioId: string;
  municipioNombre: string;
  coloniaNombre: string;
}

export interface InfoTemporal {
  fechaHoraLlegada: Date;
  fechaHoraSalida?: Date;
  ultimaActualizacion: Date;
}

// Interfaces para condiciones médicas
export interface CondicionMedica {
  tipo: string;
  descripcion: string;
  medicamentos?: string[];
  alergias?: string[];
  requerimientosEspeciales?: string[];
}

// Interface principal de Persona
export interface Persona extends PersonaBase, UbicacionInfo, InfoTemporal {
  codigoPersona?: string;
  esCabezaFamilia?: boolean;
  condicionesMedicas?: CondicionMedica[];
  grupoFamiliarId?: string | null;
  parentesco?: string;
  albergueId?: number;
  nombreAlbergue?: string;
  albergueMunicipioNombre?: string;
}

// Interfaces para Grupos Familiares
export interface MiembroFamiliar extends Persona {
  parentesco: string;
  contactoEmergencia?: boolean;
}

export interface GrupoFamiliar {
  id: string;
  cabezaFamiliaId: string;
  miembros: MiembroFamiliar[];
  albergueId: number;
  fechaRegistro: Date;
  situacionFamiliar?: {
    requiereAyudaEspecial: boolean;
    descripcionSituacion?: string;
    tipoAyuda?: string[];
  };
}

// Interfaces para formularios
export interface RegistroFormData {
  datosPersonales: PersonaBase;
  ubicacion: UbicacionInfo;
  fechas: InfoTemporal;
  necesidadesEspeciales?: {
    tiene: boolean;
  };
  esGrupoFamiliar: boolean;
  familiares?: MiembroFamiliar[];
}

export interface AlbergueAsignacion {
  id: number;
  nombre: string;
  capacidadDisponible: number;
  serviciosDisponibles: string[];
  ubicacion: UbicacionInfo;
}