import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { API_URLS } from '../config/api.config';
import { 
  MunicipioDto, 
  MunicipioConAsentamientosDto,
  MunicipioDetalleDto,
  AsentamientoDto 
} from '../models/api.models';
import municipiosData from '../../data/municipios.json';

// Interfaces para compatibilidad con el código existente
export interface Municipio {
  nombre: string;
  estado: string;
  asentamientos: Asentamiento[];
}

export interface Asentamiento {
  Nombre: string;
  TipoAsentamiento: string;
  Ambito: string;
}

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {
  private municipios: Municipio[] = [];
  private fallbackLoaded = false;

  constructor(private http: HttpClient) {}

  private loadFallbackMunicipios() {
    if (!this.fallbackLoaded) {
      // Convertir el JSON a formato de array como fallback
      this.municipios = Object.entries(municipiosData).map(([nombre, data]: [string, any]) => ({
        nombre,
        estado: data.Estado,
        asentamientos: data.Asentamientos
      }));
      this.fallbackLoaded = true;
    }
  }

  getMunicipios(): Observable<MunicipioDto[]> {
    return this.http.get<MunicipioDto[]>(API_URLS.MUNICIPIOS_BASE)
      .pipe(
        catchError((error) => {
          console.error('Error fetching municipios from API, using fallback data:', error);
          this.loadFallbackMunicipios();
          return of(this.municipios.map(m => ({
            id: 0,
            nombre: m.nombre,
            estado: m.estado,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })));
        })
      );
  }

  getMunicipiosConAsentamientos(): Observable<MunicipioConAsentamientosDto[]> {
    return this.http.get<MunicipioConAsentamientosDto[]>(API_URLS.MUNICIPIOS_CON_ASENTAMIENTOS)
      .pipe(
        catchError((error) => {
          console.error('Error fetching municipios con asentamientos from API, using fallback data:', error);
          this.loadFallbackMunicipios();
          return of(this.municipios.map(m => ({
            id: 0,
            nombre: m.nombre,
            estado: m.estado,
            asentamientos: m.asentamientos.map(a => ({
              id: 0,
              nombre: a.Nombre,
              municipioId: 0,
              municipioNombre: m.nombre,
              tipoAsentamiento: a.TipoAsentamiento,
              ambito: a.Ambito
            }))
          })));
        })
      );
  }

  getMunicipioById(id: number): Observable<MunicipioDetalleDto | null> {
    return this.http.get<MunicipioDetalleDto>(`${API_URLS.MUNICIPIOS_BASE}/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching municipio by ID from API:', error);
          return of(null);
        })
      );
  }

  getAsentamientosByMunicipio(municipioNombre: string): Observable<AsentamientoDto[]> {
    return this.getMunicipiosConAsentamientos().pipe(
      map(municipios => {
        const municipio = municipios.find(m => m.nombre === municipioNombre);
        return municipio?.asentamientos || [];
      })
    );
  }

  getMunicipiosList(): Observable<{label: string, value: string}[]> {
    return this.getMunicipios().pipe(
      map(municipios => municipios.map(m => ({
        label: m.nombre,
        value: m.nombre
      })))
    );
  }

  getMunicipiosListWithId(): Observable<{label: string, value: number}[]> {
    return this.getMunicipios().pipe(
      map(municipios => municipios.map(m => ({
        label: m.nombre,
        value: m.id
      })))
    );
  }

  getAsentamientosListByMunicipio(municipioNombre: string): Observable<{label: string, value: string}[]> {
    return this.getAsentamientosByMunicipio(municipioNombre).pipe(
      map(asentamientos => asentamientos.map(a => ({
        label: a.nombre,
        value: a.nombre
      })))
    );
  }
}