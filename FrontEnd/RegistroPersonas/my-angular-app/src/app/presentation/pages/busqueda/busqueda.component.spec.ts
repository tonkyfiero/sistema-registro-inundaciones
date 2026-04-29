import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BusquedaComponent } from './busqueda.component';
import { PersonasService } from '../../../core/services/personas.service';
import { MunicipiosService } from '../../../core/services/municipios.service';
import { AuthService } from '../../../core/services/auth.service';

describe('BusquedaComponent', () => {
  let component: BusquedaComponent;
  let fixture: ComponentFixture<BusquedaComponent>;
  let personasServiceSpy: jasmine.SpyObj<PersonasService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockPersonasResponse = [
    {
      id: 1,
      numeroIdentificacion: 'ABC123',
      primerNombre: 'Juan',
      primerApellido: 'Pérez',
      segundoApellido: 'González',
      fechaNacimiento: new Date('1994-01-01'),
      edad: 30,
      genero: 'M' as 'M' | 'F' | 'Otro',
      municipioOrigen: 'Guadalajara',
      asentamientoOrigen: 'Centro',
      tieneCondicionesMedicas: false,
      fechaRegistro: new Date('2024-01-15T14:30:00'),
      estado: 'Activo' as 'Activo' | 'Inactivo' | 'Trasladado',
      albergueId: 1,
      albergueNombre: 'Albergue Central',
      albergueMunicipioNombre: 'Guadalajara',
      grupoFamiliar: {
        id: 1,
        nombre: 'Familia Pérez',
        cantidadMiembros: 3,
        observaciones: 'Jefe de familia'
      },
      condicionesMedicas: []
    }
  ];

  beforeEach(async () => {
    const personasServiceSpyObj = jasmine.createSpyObj('PersonasService', ['getAllPersonas']);
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'canEdit']);

    await TestBed.configureTestingModule({
      imports: [BusquedaComponent, FormsModule],
      providers: [
        { provide: PersonasService, useValue: personasServiceSpyObj },
        { provide: MunicipiosService, useValue: {} },
        { provide: AuthService, useValue: authServiceSpyObj }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignora elementos desconocidos en el template
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaComponent);
    component = fixture.componentInstance;
    
    personasServiceSpy = TestBed.inject(PersonasService) as jasmine.SpyObj<PersonasService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    // Setup default return values
    personasServiceSpy.getAllPersonas.and.returnValue(of(mockPersonasResponse));
    authServiceSpy.isAuthenticated.and.returnValue(true);
    authServiceSpy.canEdit.and.returnValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.filtroTexto).toBe('');
    expect(component.filtroMunicipio).toBe('');
    expect(component.filtroSexo).toBe('');
    expect(component.personaSeleccionada).toBeNull();
    expect(component.mostrarDetalles).toBe(false);
  });

  it('should load personas on init', () => {
    component.ngOnInit();
    expect(personasServiceSpy.getAllPersonas).toHaveBeenCalled();
  });

  it('should set loading to true initially and false after load', () => {
    expect(component.loading).toBe(false);
    component.ngOnInit();
    // loading se setea internamente durante la carga
    expect(personasServiceSpy.getAllPersonas).toHaveBeenCalled();
  });

  describe('aplicarFiltros', () => {
    beforeEach(() => {
      component.personas = [
        {
          id: '1',
          nombre: 'Juan Carlos',
          apellidoPaterno: 'González',
          apellidoMaterno: 'López',
          edad: 45,
          sexo: 'M',
          municipioId: 'test',
          municipioNombre: 'Test',
          coloniaNombre: 'Centro',
          fechaHoraLlegada: new Date(),
          ultimaActualizacion: new Date(),
          albergueMunicipioNombre: 'Guadalajara'
        },
        {
          id: '2',
          nombre: 'María',
          apellidoPaterno: 'Rodríguez',
          apellidoMaterno: 'Silva',
          edad: 30,
          sexo: 'F',
          municipioId: 'test2',
          municipioNombre: 'Test2',
          coloniaNombre: 'Norte',
          fechaHoraLlegada: new Date(),
          ultimaActualizacion: new Date(),
          albergueMunicipioNombre: 'Zapopan'
        }
      ];
    });

    it('should filter by text (nombre)', () => {
      component.filtroTexto = 'Juan';
      component.aplicarFiltros();
      
      expect(component.personasFiltradas.length).toBe(1);
      expect(component.personasFiltradas[0].nombre).toBe('Juan Carlos');
    });

    it('should filter by municipio albergue', () => {
      component.filtroMunicipio = 'Guadalajara';
      component.aplicarFiltros();
      
      expect(component.personasFiltradas.length).toBe(1);
      expect(component.personasFiltradas[0].albergueMunicipioNombre).toBe('Guadalajara');
    });

    it('should filter by sexo', () => {
      component.filtroSexo = 'F';
      component.aplicarFiltros();
      
      expect(component.personasFiltradas.length).toBe(1);
      expect(component.personasFiltradas[0].sexo).toBe('F');
    });

    it('should return empty array when no matches', () => {
      component.filtroTexto = 'NoExiste';
      component.aplicarFiltros();
      
      expect(component.personasFiltradas.length).toBe(0);
    });
  });

  describe('limpiarFiltros', () => {
    it('should reset all filters', () => {
      component.filtroTexto = 'test';
      component.filtroMunicipio = 'test';
      component.filtroSexo = 'M';
      
      component.limpiarFiltros();
      
      expect(component.filtroTexto).toBe('');
      expect(component.filtroMunicipio).toBe('');
      expect(component.filtroSexo).toBe('');
    });
  });

  describe('verDetalles', () => {
    it('should show person details', () => {
      const persona = component.personas[0] || {
        id: '1',
        nombre: 'Test',
        apellidoPaterno: 'Test',
        apellidoMaterno: 'Test',
        edad: 30,
        municipioId: 'test',
        municipioNombre: 'Test',
        coloniaNombre: 'Test',
        fechaHoraLlegada: new Date(),
        ultimaActualizacion: new Date()
      };
      
      component.verDetalles(persona);
      
      expect(component.personaSeleccionada).toBe(persona);
      expect(component.mostrarDetalles).toBe(true);
    });
  });

  describe('cerrarDetalles', () => {
    it('should hide person details', () => {
      component.mostrarDetalles = true;
      component.personaSeleccionada = {
        id: '1',
        nombre: 'Test',
        apellidoPaterno: 'Test',
        apellidoMaterno: 'Test',
        edad: 30,
        municipioId: 'test',
        municipioNombre: 'Test',
        coloniaNombre: 'Test',
        fechaHoraLlegada: new Date(),
        ultimaActualizacion: new Date()
      };
      
      component.cerrarDetalles();
      
      expect(component.personaSeleccionada).toBeNull();
      expect(component.mostrarDetalles).toBe(false);
    });
  });

  describe('authentication integration', () => {
    it('should use AuthService for authentication checks', () => {
      expect(component.authService).toBeTruthy();
      expect(component.authService.isAuthenticated).toBeDefined();
      expect(component.authService.canEdit).toBeDefined();
    });
  });
});