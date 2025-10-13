export interface Albergue {
  id: number;
  nombre: string;
  direccion: string;
  municipio: string;
  asentamiento: string;
  capacidadMaxima: number;
  capacidadActual: number;
  servicios: string[];
  contacto: {
    telefono?: string;
    email?: string;
    responsable: string;
  };
  estado: 'Activo' | 'Inactivo' | 'Lleno';
  fechaApertura: Date;
  ubicacion?: {
    latitud: number;
    longitud: number;
  };
}

export interface CreateAlbergueRequest {
  nombre: string;
  direccion: string;
  municipio: string;
  asentamiento: string;
  capacidadMaxima: number;
  servicios: string[];
  contacto: {
    telefono?: string;
    email?: string;
    responsable: string;
  };
  ubicacion?: {
    latitud: number;
    longitud: number;
  };
}

export interface UpdateAlbergueRequest extends Partial<CreateAlbergueRequest> {
  id: number;
}