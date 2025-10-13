import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { API_URLS } from '../config/api.config';

export interface GrupoFamiliar {
  id: number;
  codigoGrupo?: string;
  cabezaFamiliaId?: number;
  cabezaFamiliaNombre?: string;
  albergueId: number;
  albergueNombre: string;
  numeroMiembros: number;
  fechaRegistro: Date;
  requiereAyudaEspecial: boolean;
  descripcionSituacion?: string;
  tipoAyudaRequerida?: string;
  estadoGrupo: string;
  miembros?: any[];
}

export interface CreateGrupoFamiliarRequest {
  albergueId: number;
  requiereAyudaEspecial: boolean;
  descripcionSituacion?: string;
  tipoAyudaRequerida?: string;
  miembros: CreatePersonaDto[];
}

export interface CreatePersonaDto {
  numeroIdentificacion: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  fechaNacimiento: Date;
  genero: string;
  telefono?: string;
  email?: string;
  direccionAnterior?: string;
  municipioOrigenId: number;
  asentamientoOrigen: string;
  tieneCondicionesMedicas: boolean;
  condicionesMedicas: string[];
  observaciones?: string;
}

export interface CreateGrupoFamiliarDto {
  albergueId: number;
  requiereAyudaEspecial: boolean;
  descripcionSituacion?: string;
  tipoAyudaRequerida?: string;
  miembros: any[];
}

@Injectable({
  providedIn: 'root'
})
export class GruposFamiliaresService {
  constructor(private http: HttpClient) {}

  createGrupoFamiliar(request: CreateGrupoFamiliarRequest): Observable<GrupoFamiliar> {
    const createDto: CreateGrupoFamiliarDto = {
      albergueId: request.albergueId,
      requiereAyudaEspecial: request.requiereAyudaEspecial,
      descripcionSituacion: request.descripcionSituacion,
      tipoAyudaRequerida: request.tipoAyudaRequerida,
      miembros: request.miembros
    };

    return this.http.post<any>(API_URLS.GRUPOS_FAMILIARES_BASE, createDto)
      .pipe(
        map(dto => this.mapGrupoFamiliarDtoToGrupoFamiliar(dto)),
        catchError((error) => {
          console.error('Error creating grupo familiar via API:', error);
          throw error;
        })
      );
  }

  getGruposPorAlbergue(albergueId: number): Observable<GrupoFamiliar[]> {
    return this.http.get<any[]>(API_URLS.GRUPOS_FAMILIARES_POR_ALBERGUE(albergueId))
      .pipe(
        map(grupos => grupos.map(dto => this.mapGrupoFamiliarDtoToGrupoFamiliar(dto))),
        catchError((error) => {
          console.error('Error fetching grupos familiares:', error);
          return of([]);
        })
      );
  }

  getGrupoPorId(id: number): Observable<GrupoFamiliar | null> {
    return this.http.get<any>(`${API_URLS.GRUPOS_FAMILIARES_BASE}/${id}`)
      .pipe(
        map(dto => this.mapGrupoFamiliarDtoToGrupoFamiliar(dto)),
        catchError((error) => {
          console.error('Error fetching grupo familiar by ID:', error);
          return of(null);
        })
      );
  }

  private mapGrupoFamiliarDtoToGrupoFamiliar(dto: any): GrupoFamiliar {
    return {
      id: dto.id,
      codigoGrupo: dto.codigoGrupo,
      cabezaFamiliaId: dto.cabezaFamiliaId,
      cabezaFamiliaNombre: dto.cabezaFamiliaNombre,
      albergueId: dto.albergueId,
      albergueNombre: dto.albergueNombre || '',
      numeroMiembros: dto.numeroMiembros,
      fechaRegistro: new Date(dto.fechaRegistro),
      requiereAyudaEspecial: dto.requiereAyudaEspecial,
      descripcionSituacion: dto.descripcionSituacion,
      tipoAyudaRequerida: dto.tipoAyudaRequerida,
      estadoGrupo: dto.estadoGrupo || 'Activo',
      miembros: dto.miembros
    };
  }
}