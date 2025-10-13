import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, catchError, map } from 'rxjs';
import { API_URLS } from '../config/api.config';
import { AlbergueDto, CreateAlbergueDto, ActualizarCapacidadDto } from '../models/api.models';
import { Albergue, CreateAlbergueRequest } from '../../domain/entities/albergue.entity';
import alberguesData from '../../data/albergues.json';

@Injectable({
  providedIn: 'root'
})
export class AlberguesService {
  private alberguesSubject = new BehaviorSubject<Albergue[]>([]);
  private albergues$ = this.alberguesSubject.asObservable();
  private nextId = 3; // Empezamos desde 3 porque ya tenemos 2 albergues
  private fallbackLoaded = false;

  constructor(private http: HttpClient) {}

  private loadFallbackAlbergues() {
    if (!this.fallbackLoaded) {
      const alberguesIniciales: Albergue[] = alberguesData.Albergues.map((albergue, index) => ({
        id: index + 1,
        nombre: albergue.Nombre,
        direccion: albergue.Direccion,
        municipio: 'Poza Rica de Hidalgo',
        asentamiento: 'Centro',
        capacidadMaxima: albergue.Capacidad,
        capacidadActual: Math.floor(Math.random() * albergue.Capacidad),
        servicios: ['Alimentos', 'Agua potable', 'Atención médica básica'],
        contacto: {
          telefono: albergue.Telefono,
          responsable: albergue.Contacto,
          email: `${albergue.Contacto.toLowerCase().replace(' ', '.')}@albergue.gob.mx`
        },
        estado: Math.random() > 0.5 ? 'Activo' : 'Lleno',
        fechaApertura: new Date('2024-10-01'),
        ubicacion: {
          latitud: 20.533 + (Math.random() - 0.5) * 0.1,
          longitud: -97.460 + (Math.random() - 0.5) * 0.1
        }
      }));

      this.alberguesSubject.next(alberguesIniciales);
      this.fallbackLoaded = true;
    }
  }

  private mapAlbergueDtoToAlbergue(dto: AlbergueDto): Albergue {
    return {
      id: dto.id,
      nombre: dto.nombre,
      direccion: dto.direccion,
      municipio: dto.municipioNombre,
      asentamiento: dto.asentamiento || '',
      capacidadMaxima: dto.capacidadMaxima,
      capacidadActual: dto.capacidadActual,
      servicios: dto.servicios ? dto.servicios.split(',').map(s => s.trim()) : [],
      contacto: {
        telefono: dto.contactoTelefono || '',
        responsable: dto.responsable,
        email: dto.contactoEmail || ''
      },
      estado: dto.estado as 'Activo' | 'Inactivo' | 'Lleno',
      fechaApertura: new Date(dto.fechaApertura),
      ubicacion: {
        latitud: dto.latitud || 0,
        longitud: dto.longitud || 0
      }
    };
  }

  getAllAlbergues(): Observable<Albergue[]> {
    return this.http.get<AlbergueDto[]>(API_URLS.ALBERGUES_BASE)
      .pipe(
        map(albergues => albergues.map(dto => this.mapAlbergueDtoToAlbergue(dto))),
        catchError((error) => {
          console.error('Error fetching albergues from API, using fallback data:', error);
          this.loadFallbackAlbergues();
          return this.albergues$;
        })
      );
  }

  getAlbergueById(id: number): Observable<Albergue | null> {
    return this.http.get<AlbergueDto>(`${API_URLS.ALBERGUES_BASE}/${id}`)
      .pipe(
        map(dto => this.mapAlbergueDtoToAlbergue(dto)),
        catchError((error) => {
          console.error('Error fetching albergue by ID from API:', error);
          const albergues = this.alberguesSubject.value;
          const albergue = albergues.find(a => a.id === id) || null;
          return of(albergue);
        })
      );
  }

  createAlbergue(request: CreateAlbergueRequest): Observable<Albergue> {
    const createDto: CreateAlbergueDto = {
      nombre: request.nombre,
      direccion: request.direccion,
      municipioId: 1, // Por defecto, debería obtenerse del municipio seleccionado
      asentamiento: request.asentamiento,
      capacidadMaxima: request.capacidadMaxima,
      servicios: request.servicios.join(', '),
      contactoTelefono: request.contacto.telefono,
      contactoEmail: request.contacto.email,
      responsable: request.contacto.responsable,
      fechaApertura: new Date().toISOString(),
      latitud: request.ubicacion?.latitud,
      longitud: request.ubicacion?.longitud
    };

    return this.http.post<AlbergueDto>(API_URLS.ALBERGUES_BASE, createDto)
      .pipe(
        map(dto => this.mapAlbergueDtoToAlbergue(dto)),
        catchError((error) => {
          console.error('Error creating albergue via API, using fallback:', error);
          const nuevoAlbergue: Albergue = {
            id: this.nextId++,
            ...request,
            capacidadActual: 0,
            estado: 'Activo',
            fechaApertura: new Date()
          };

          const alberguesActuales = this.alberguesSubject.value;
          this.alberguesSubject.next([...alberguesActuales, nuevoAlbergue]);
          return of(nuevoAlbergue);
        })
      );
  }

  updateAlbergue(id: number, updates: Partial<Albergue>): Observable<Albergue | null> {
    // Para actualizaciones parciales, primero obtenemos el albergue actual
    return this.getAlbergueById(id).pipe(
      map(albergue => {
        if (!albergue) return null;
        
        // Aquí normalmente haríamos un PUT/PATCH al API
        // Por ahora simulamos la actualización
        const albergueActualizado = { ...albergue, ...updates };
        
        const albergues = this.alberguesSubject.value;
        const index = albergues.findIndex(a => a.id === id);
        if (index !== -1) {
          albergues[index] = albergueActualizado;
          this.alberguesSubject.next([...albergues]);
        }
        
        return albergueActualizado;
      })
    );
  }

  actualizarCapacidad(id: number, nuevaCapacidad: number): Observable<boolean> {
    const dto: ActualizarCapacidadDto = { nuevaCapacidad };
    
    return this.http.patch(`${API_URLS.ALBERGUES_BASE}/${id}/capacidad`, dto)
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error('Error updating capacity via API:', error);
          return of(false);
        })
      );
  }

  deleteAlbergue(id: number): Observable<boolean> {
    return this.http.delete(`${API_URLS.ALBERGUES_BASE}/${id}`)
      .pipe(
        map(() => true),
        catchError((error) => {
          console.error('Error deleting albergue via API:', error);
          const albergues = this.alberguesSubject.value;
          const index = albergues.findIndex(a => a.id === id);
          
          if (index !== -1) {
            albergues.splice(index, 1);
            this.alberguesSubject.next([...albergues]);
            return of(true);
          }
          return of(false);
        })
      );
  }

  getAlberguesDisponibles(): Observable<Albergue[]> {
    return this.http.get<AlbergueDto[]>(API_URLS.ALBERGUES_DISPONIBLES)
      .pipe(
        map(albergues => albergues.map(dto => this.mapAlbergueDtoToAlbergue(dto))),
        catchError((error) => {
          console.error('Error fetching available albergues from API, using fallback:', error);
          const albergues = this.alberguesSubject.value;
          const disponibles = albergues.filter(a => 
            a.estado === 'Activo' && a.capacidadActual < a.capacidadMaxima
          );
          return of(disponibles);
        })
      );
  }

  getAlberguesPorMunicipio(municipioId: number): Observable<Albergue[]> {
    return this.http.get<AlbergueDto[]>(API_URLS.ALBERGUES_POR_MUNICIPIO(municipioId))
      .pipe(
        map(albergues => albergues.map(dto => this.mapAlbergueDtoToAlbergue(dto))),
        catchError((error) => {
          console.error('Error fetching albergues by municipio from API:', error);
          return of([]);
        })
      );
  }

  getEstadisticas(): Observable<{total: number, activos: number, llenos: number, ocupacion: number}> {
    const albergues = this.alberguesSubject.value;
    const total = albergues.length;
    const activos = albergues.filter(a => a.estado === 'Activo').length;
    const llenos = albergues.filter(a => a.estado === 'Lleno').length;
    
    const capacidadTotal = albergues.reduce((sum, a) => sum + a.capacidadMaxima, 0);
    const ocupacionTotal = albergues.reduce((sum, a) => sum + a.capacidadActual, 0);
    const ocupacion = capacidadTotal > 0 ? (ocupacionTotal / capacidadTotal) * 100 : 0;

    return of({ total, activos, llenos, ocupacion });
  }
}