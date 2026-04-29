import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { API_URLS } from '../config/api.config';
import { PersonaDto, CrearPersonaDto, ActualizarPersonaDto, PersonaCondicionMedicaDto } from '../models/api.models';

export interface Persona {
  id: number;
  numeroIdentificacion: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  fechaNacimiento: Date;
  edad: number;
  genero: 'M' | 'F' | 'Otro';
  telefono?: string;
  email?: string;
  direccionAnterior?: string;
  municipioOrigen: string;
  asentamientoOrigen?: string;
  tieneCondicionesMedicas: boolean;
  condicionesMedicas?: CondicionMedica[];
  grupoFamiliar?: GrupoFamiliar;
  fechaRegistro: Date;
  estado: 'Activo' | 'Inactivo' | 'Trasladado';
  albergueId?: number;
  albergueNombre?: string;
  albergueMunicipioNombre?: string;
  observaciones?: string;
}

export interface CondicionMedica {
  id?: number;
  personaId: number;
  condicion: string;
  requiereTratamiento: boolean;
  medicamentos?: string;
  observaciones?: string;
}

export interface GrupoFamiliar {
  id?: number;
  nombre: string;
  cantidadMiembros: number;
  observaciones?: string;
  miembros?: Persona[];
}

export interface CreatePersonaRequest {
  numeroIdentificacion: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  fechaNacimiento: Date;
  genero: 'M' | 'F' | 'Otro';
  telefono?: string;
  email?: string;
  direccionAnterior?: string;
  municipioOrigenId: number;
  asentamientoOrigen?: string;
  tieneCondicionesMedicas: boolean;
  condicionesMedicas?: Omit<CondicionMedica, 'id' | 'personaId'>[];
  grupoFamiliarId?: number;
  albergueId?: number;
  observaciones?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  constructor(private http: HttpClient) {}

  private mapPersonaDtoToPersona(dto: PersonaDto): Persona {
    return {
      id: dto.id,
      numeroIdentificacion: dto.documentoIdentidad || dto.codigoPersona || '',
      primerNombre: dto.nombre,
      segundoNombre: '', // No existe en el DTO del backend
      primerApellido: dto.apellidoPaterno,
      segundoApellido: dto.apellidoMaterno,
      fechaNacimiento: new Date(dto.fechaHoraLlegada), // Aproximación usando fecha de llegada
      edad: dto.edad, // Campo edad del DTO
      genero: dto.sexo as 'M' | 'F' | 'Otro',
      telefono: dto.telefonoContacto,
      email: '', // No existe en el DTO del backend
      direccionAnterior: dto.direccionAnterior,
      municipioOrigen: dto.municipioNombre,
      asentamientoOrigen: dto.asentamientoNombre,
      tieneCondicionesMedicas: (dto.condicionesMedicas && dto.condicionesMedicas.length > 0) || false,
      condicionesMedicas: dto.condicionesMedicas?.map(cm => ({
        id: cm.id,
        personaId: dto.id,
        condicion: cm.tipoCondicion,
        requiereTratamiento: cm.esCritica,
        medicamentos: cm.medicamentos,
        observaciones: cm.descripcionEspecifica
      })),
      grupoFamiliar: dto.grupoFamiliarId ? {
        id: dto.grupoFamiliarId,
        nombre: `Grupo Familiar ${dto.grupoFamiliarId}`,
        cantidadMiembros: 1, // No tenemos esta info del DTO
        observaciones: dto.parentesco
      } : undefined,
      fechaRegistro: new Date(dto.fechaHoraLlegada),
      estado: dto.estadoPersona as 'Activo' | 'Inactivo' | 'Trasladado',
      albergueId: dto.albergueActualId,
      albergueNombre: dto.albergueNombre,
      albergueMunicipioNombre: dto.albergueMunicipioNombre,
      observaciones: dto.observaciones
    };
  }

  getAllPersonas(): Observable<Persona[]> {
    return this.http.get<PersonaDto[]>(API_URLS.PERSONAS_BASE)
      .pipe(
        map(personas => {
          console.log('Respuesta RAW del endpoint /api/Personas:', personas);
          const mapeadas = personas.map(dto => {
            console.log('DTO individual:', dto);
            const resultado = this.mapPersonaDtoToPersona(dto);
            console.log('Resultado del mapeo:', resultado);
            return resultado;
          });
          return mapeadas;
        }),
        catchError((error) => {
          console.error('Error fetching personas from API:', error);
          return of([]);
        })
      );
  }



  createPersona(request: CreatePersonaRequest): Observable<Persona> {
    const createDto: CrearPersonaDto = {
      nombre: request.primerNombre,
      apellidoPaterno: request.primerApellido,
      apellidoMaterno: request.segundoApellido,
      edad: this.calcularEdad(request.fechaNacimiento),
      sexo: request.genero,
      municipioId: request.municipioOrigenId,
      asentamientoNombre: request.asentamientoOrigen || '',
      direccionAnterior: request.direccionAnterior,
      esCabezaFamilia: request.grupoFamiliarId ? false : true,
      grupoFamiliarId: request.grupoFamiliarId,
      parentesco: request.grupoFamiliarId ? 'Miembro' : 'Jefe de familia',
      albergueId: request.albergueId,
      observaciones: request.observaciones,
      documentoIdentidad: request.numeroIdentificacion,
      telefonoContacto: request.telefono
    };

    console.log('=== DEBUG SERVICE ===');
    console.log('Request original:', request);
    console.log('DTO a enviar:', createDto);
    console.log('AlbergueId en DTO:', createDto.albergueId);
    console.log('URL:', API_URLS.PERSONAS_BASE);
    console.log('====================');

    console.log('=== PETICION HTTP ===');
    console.log('Enviando POST a:', API_URLS.PERSONAS_BASE);
    console.log('Body de la petición (createDto):', JSON.stringify(createDto, null, 2));
    console.log('Tipo de createDto:', typeof createDto);
    console.log('Propiedades de createDto:', Object.keys(createDto));
    console.log('====================');

    return this.http.post<PersonaDto>(API_URLS.PERSONAS_BASE, createDto)
      .pipe(
        map(dto => {
          console.log('=== RESPUESTA HTTP ===');
          console.log('Respuesta del backend:', dto);
          console.log('AlbergueActualId en respuesta:', dto.albergueActualId);
          console.log('======================');
          return this.mapPersonaDtoToPersona(dto);
        }),
        catchError((error) => {
          console.error('Error creating persona via API:', error);
          throw error;
        })
      );
  }

  private calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  }

  updatePersona(id: number, updates: Partial<CreatePersonaRequest>): Observable<Persona | null> {
    const updateDto: ActualizarPersonaDto = {
      nombre: updates.primerNombre || '',
      apellidoPaterno: updates.primerApellido || '',
      apellidoMaterno: updates.segundoApellido,
      edad: updates.fechaNacimiento ? this.calcularEdad(updates.fechaNacimiento) : 0,
      asentamientoNombre: updates.asentamientoOrigen || '',
      direccionAnterior: updates.direccionAnterior,
      parentesco: 'Miembro',
      estadoPersona: 'Activo',
      observaciones: updates.observaciones,
      telefonoContacto: updates.telefono
    };

    return this.http.put<PersonaDto>(`${API_URLS.PERSONAS_BASE}/${id}`, updateDto)
      .pipe(
        map(dto => this.mapPersonaDtoToPersona(dto)),
        catchError((error) => {
          console.error('Error updating persona via API:', error);
          return of(null);
        })
      );
  }

  deletePersona(id: number): Observable<boolean> {
    return this.http.delete(`${API_URLS.PERSONAS_BASE}/${id}`)
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error('Error deleting persona via API:', error);
          return of(false);
        })
      );
  }

  getPersonasPorAlbergue(albergueId: number): Observable<Persona[]> {
    return this.http.get<PersonaDto[]>(`${API_URLS.PERSONAS_BASE}/albergue/${albergueId}`)
      .pipe(
        map(personas => personas.map(dto => this.mapPersonaDtoToPersona(dto))),
        catchError((error) => {
          console.error('Error fetching personas by albergue from API:', error);
          return of([]);
        })
      );
  }

  getPersonasPorMunicipio(municipioId: number): Observable<Persona[]> {
    return this.http.get<PersonaDto[]>(`${API_URLS.PERSONAS_BASE}/municipio/${municipioId}`)
      .pipe(
        map(personas => personas.map(dto => this.mapPersonaDtoToPersona(dto))),
        catchError((error) => {
          console.error('Error fetching personas by municipio from API:', error);
          return of([]);
        })
      );
  }

  buscarPersonaPorIdentificacion(numeroIdentificacion: string): Observable<Persona | null> {
    return this.http.get<PersonaDto>(`${API_URLS.PERSONAS_BASE}/buscar/${numeroIdentificacion}`)
      .pipe(
        map(dto => this.mapPersonaDtoToPersona(dto)),
        catchError((error) => {
          console.error('Error searching persona by identification:', error);
          return of(null);
        })
      );
  }

  asignarAlbergue(personaId: number, albergueId: number): Observable<boolean> {
    return this.http.patch(`${API_URLS.PERSONAS_BASE}/${personaId}/albergue/${albergueId}`, {})
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error('Error assigning albergue to persona:', error);
          return of(false);
        })
      );
  }

  removerAlbergue(personaId: number): Observable<boolean> {
    return this.http.delete(`${API_URLS.PERSONAS_BASE}/${personaId}/albergue`)
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error('Error removing albergue from persona:', error);
          return of(false);
        })
      );
  }

  // Nuevo método para obtener detalles completos de una persona por ID (string)
  getPersonaById(id: string): Observable<any> {
    return this.http.get<any>(`${API_URLS.PERSONAS_BASE}/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching persona details by ID:', error);
          return of(null);
        })
      );
  }

  // Nuevo método para obtener miembros de un grupo familiar
  getMiembrosFamilia(grupoFamiliarId: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_URLS.GRUPOS_FAMILIARES_BASE}/${grupoFamiliarId}/miembros`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching miembros familia:', error);
          return of([]);
        })
      );
  }
}