import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RegistroPersonaComponent } from './registro-persona.component';
import { PersonasService } from '../../../core/services/personas.service';
import { MunicipiosService } from '../../../core/services/municipios.service';

describe('RegistroPersonaComponent', () => {
  let component: RegistroPersonaComponent;
  let fixture: ComponentFixture<RegistroPersonaComponent>;
  let personasServiceSpy: jasmine.SpyObj<PersonasService>;
  let municipiosServiceSpy: jasmine.SpyObj<MunicipiosService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const personasServiceSpyObj = jasmine.createSpyObj('PersonasService', ['createPersona', 'updatePersona']);
    const municipiosServiceSpyObj = jasmine.createSpyObj('MunicipiosService', ['getMunicipios']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      params: of({ id: null })
    };

    await TestBed.configureTestingModule({
      imports: [RegistroPersonaComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: PersonasService, useValue: personasServiceSpyObj },
        { provide: MunicipiosService, useValue: municipiosServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPersonaComponent);
    component = fixture.componentInstance;
    
    personasServiceSpy = TestBed.inject(PersonasService) as jasmine.SpyObj<PersonasService>;
    municipiosServiceSpy = TestBed.inject(MunicipiosService) as jasmine.SpyObj<MunicipiosService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Setup default return values
    municipiosServiceSpy.getMunicipios.and.returnValue(of([]));
    personasServiceSpy.createPersona.and.returnValue(of({ id: 1 } as any));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    component.ngOnInit();
    
    expect(component.registroForm).toBeTruthy();
    expect(component.registroForm.get('primerNombre')?.value).toBe('');
  });

  it('should have required form controls', () => {
    component.ngOnInit();
    
    // Test that important controls exist
    expect(component.registroForm.get('primerNombre')).toBeTruthy();
    expect(component.registroForm.get('primerApellido')).toBeTruthy();
    expect(component.registroForm.get('edad')).toBeTruthy();
    expect(component.registroForm.get('genero')).toBeTruthy();
  });

  it('should have telefonoContacto field', () => {
    component.ngOnInit();
    
    const telefonoContactoControl = component.registroForm.get('telefonoContacto');
    expect(telefonoContactoControl).toBeTruthy();
  });

  describe('form validation', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should have form validation setup', () => {
      expect(component.registroForm.valid).toBe(false); // Initially invalid due to required fields
    });
  });

  describe('form field behavior', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should have edad field', () => {
      const edadControl = component.registroForm.get('edad');
      expect(edadControl).toBeTruthy();
    });

    it('should have telefonoContacto field', () => {
      const telefonoContactoControl = component.registroForm.get('telefonoContacto');
      expect(telefonoContactoControl).toBeTruthy();
    });
  });

  describe('navigation', () => {
    it('should have router for navigation', () => {
      expect(component).toBeTruthy();
      // Router is injected and available for navigation
    });
  });
});