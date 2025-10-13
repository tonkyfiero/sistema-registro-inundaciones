import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { MunicipiosService } from '../../../core/services/municipios.service';
import { PersonasService, CreatePersonaRequest } from '../../../core/services/personas.service';
import { AlberguesService } from '../../../core/services/albergues.service';
import { GruposFamiliaresService, CreateGrupoFamiliarRequest } from '../../../core/services/grupos-familiares.service';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-registro-persona',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    CardModule,
    DividerModule,
    CheckboxModule,
    InputTextareaModule,
    PanelModule,
    AccordionModule,
    TagModule,
    MessageModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule,
    BreadcrumbComponent
  ],
  templateUrl: './registro-persona.component.html',
  styleUrl: './registro-persona.component.scss'
})
export class RegistroPersonaComponent implements OnInit {
  registroForm!: FormGroup;
  isLoading = false;

  // Breadcrumb items
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Registro de Personas', icon: 'pi pi-user-plus' }
  ];

  // Opciones para dropdowns
  sexoOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
    { label: 'Otro', value: 'O' },
    { label: 'Prefiero no decir', value: 'N' }
  ];

  municipioOptions: {label: string, value: string}[] = [];
  asentamientoOptions: {label: string, value: string}[] = [];
  municipioAlbergueOptions: {label: string, value: string}[] = [];
  albergueOptions: {label: string, value: string}[] = [];

  parentescoOptions = [
    { label: 'Padre/Madre', value: 'Padre/Madre' },
    { label: 'Hijo/Hija', value: 'Hijo/Hija' },
    { label: 'Hermano/Hermana', value: 'Hermano/Hermana' },
    { label: 'Abuelo/Abuela', value: 'Abuelo/Abuela' },
    { label: 'Tío/Tía', value: 'Tío/Tía' },
    { label: 'Primo/Prima', value: 'Primo/Prima' },
    { label: 'Cónyuge', value: 'Cónyuge' },
    { label: 'Otro', value: 'Otro' }
  ];

  tipoCondicionMedica = [
    { label: 'Diabetes', value: 'Diabetes' },
    { label: 'Hipertensión', value: 'Hipertensión' },
    { label: 'Asma', value: 'Asma' },
    { label: 'Epilepsia', value: 'Epilepsia' },
    { label: 'Discapacidad Motriz', value: 'Discapacidad Motriz' },
    { label: 'Discapacidad Visual', value: 'Discapacidad Visual' },
    { label: 'Discapacidad Auditiva', value: 'Discapacidad Auditiva' },
    { label: 'Embarazo', value: 'Embarazo' },
    { label: 'Otro', value: 'Otro' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private municipiosService: MunicipiosService,
    private personasService: PersonasService,
    private alberguesService: AlberguesService,
    private gruposFamiliaresService: GruposFamiliaresService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadMunicipios();
    this.loadMunicipiosConAlbergues();
  }

  private createForm() {
    this.registroForm = this.fb.group({
      // Datos Personales
      datosPersonales: this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(2)]],
        apellidoPaterno: ['', [Validators.required, Validators.minLength(2)]],
        apellidoMaterno: ['', Validators.minLength(2)],
        edad: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
        sexo: ['', Validators.required]
      }),

      // Ubicación
      ubicacion: this.fb.group({
        municipioId: ['', Validators.required],
        municipioNombre: [''],
        coloniaNombre: ['', Validators.required]
      }),

      // Fechas
      fechas: this.fb.group({
        fechaHoraLlegada: [new Date(), Validators.required],
        fechaHoraSalida: ['']
      }),

      // Información de Ingreso
      informacionIngreso: this.fb.group({
        municipioAlbergueId: ['', Validators.required],
        albergueId: ['', Validators.required]
      }),

      // Información Familiar
      esCabezaFamilia: [false],
      
      // Condiciones Médicas
      tieneCondicionesMedicas: [false],
      condicionesMedicas: this.fb.array([]),

      // Grupo Familiar
      esGrupoFamiliar: [false],
      familiares: this.fb.array([])
    });

    // Configurar watchers
    this.setupFormWatchers();
  }

  private setupFormWatchers() {
    // Watcher para municipio
    this.registroForm.get('ubicacion.municipioId')?.valueChanges.subscribe(municipioId => {
      if (municipioId) {
        // Encontrar el nombre del municipio por ID
        const municipioSeleccionado = this.municipioOptions.find(m => m.value === municipioId);
        const municipioNombre = municipioSeleccionado?.label || municipioId;
        
        this.loadAsentamientos(municipioNombre);
        this.registroForm.get('ubicacion.municipioNombre')?.setValue(municipioNombre);
        // Resetear asentamiento
        this.registroForm.get('ubicacion.coloniaNombre')?.setValue('');
      }
    });

    // Watcher para municipio de albergue
    this.registroForm.get('informacionIngreso.municipioAlbergueId')?.valueChanges.subscribe(municipioId => {
      if (municipioId) {
        this.loadAlberguesPorMunicipio(municipioId);
        // Resetear albergue seleccionado
        this.registroForm.get('informacionIngreso.albergueId')?.setValue('');
      }
    });

    // Watcher para condiciones médicas
    this.registroForm.get('tieneCondicionesMedicas')?.valueChanges.subscribe(tiene => {
      const condicionesArray = this.registroForm.get('condicionesMedicas') as FormArray;
      if (tiene && condicionesArray.length === 0) {
        this.agregarCondicionMedica();
      } else if (!tiene) {
        condicionesArray.clear();
      }
    });

    // Watcher para grupo familiar
    this.registroForm.get('esGrupoFamiliar')?.valueChanges.subscribe(esGrupo => {
      const familiaresArray = this.registroForm.get('familiares') as FormArray;
      if (esGrupo && familiaresArray.length === 0) {
        this.agregarFamiliar();
      } else if (!esGrupo) {
        familiaresArray.clear();
        this.registroForm.get('esCabezaFamilia')?.setValue(false);
      }
    });
  }

  private loadMunicipios() {
    this.municipiosService.getMunicipiosListWithId().subscribe(municipios => {
      this.municipioOptions = municipios.map(m => ({
        label: m.label,
        value: m.value.toString() // Convertir el número a string para el dropdown
      }));
    });
  }

  private loadAsentamientos(municipioNombre: string) {
    this.municipiosService.getAsentamientosListByMunicipio(municipioNombre).subscribe(asentamientos => {
      this.asentamientoOptions = asentamientos;
    });
  }

  private loadMunicipiosConAlbergues() {
    this.municipiosService.getMunicipiosListWithId().subscribe(municipios => {
      this.municipioAlbergueOptions = municipios.map(m => ({
        label: m.label,
        value: m.value.toString()
      }));
    });
  }

  private loadAlberguesPorMunicipio(municipioId: string) {
    const municipioIdNum = parseInt(municipioId, 10);
    this.alberguesService.getAlberguesPorMunicipio(municipioIdNum).subscribe({
      next: (albergues: any[]) => {
        this.albergueOptions = albergues.map(albergue => ({
          label: `${albergue.nombre} - ${albergue.direccion} (Capacidad: ${albergue.capacidadDisponible || albergue.capacidadMaxima - albergue.capacidadActual})`,
          value: albergue.id.toString()
        }));
      },
      error: (error: any) => {
        console.error('Error al cargar albergues:', error);
        this.albergueOptions = [];
      }
    });
  }

  // Getters para FormArrays
  get condicionesMedicas(): FormArray {
    return this.registroForm.get('condicionesMedicas') as FormArray;
  }

  get familiares(): FormArray {
    return this.registroForm.get('familiares') as FormArray;
  }

  // Métodos para condiciones médicas
  agregarCondicionMedica() {
    const condicionGroup = this.fb.group({
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      medicamentos: [''],
      alergias: [''],
      requerimientosEspeciales: ['']
    });
    this.condicionesMedicas.push(condicionGroup);
  }

  removerCondicionMedica(index: number) {
    this.condicionesMedicas.removeAt(index);
  }

  // Métodos para familiares
  agregarFamiliar() {
    const familiarGroup = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(2)]],
      apellidoMaterno: [''],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      sexo: ['', Validators.required],
      parentesco: ['', Validators.required],
      contactoEmergencia: [false]
    });
    this.familiares.push(familiarGroup);
  }

  removerFamiliar(index: number) {
    this.familiares.removeAt(index);
  }

  // Validación y envío
  onSubmit() {
    if (this.registroForm.valid) {
      this.confirmationService.confirm({
        message: '¿Está seguro de que desea registrar esta persona en el albergue?',
        header: 'Confirmar Registro',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.guardarRegistro();
        }
      });
    } else {
      this.markFormGroupTouched(this.registroForm);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos'
      });
    }
  }

  private guardarRegistro() {
    this.isLoading = true;
    
    const formData = this.registroForm.value;
    console.log('Datos a guardar:', formData);

    // Verificar si hay familiares registrados
    const tieneFamiliares = formData.familiares && formData.familiares.length > 0;
    
    if (tieneFamiliares) {
      // Registrar como grupo familiar
      this.registrarGrupoFamiliar(formData);
    } else {
      // Registrar como persona individual
      this.registrarPersonaIndividual(formData);
    }
  }

  private registrarPersonaIndividual(formData: any) {
    // Validar que los datos requeridos estén presentes
    const municipioId = parseInt(formData.ubicacion.municipioId, 10);
    if (!municipioId || isNaN(municipioId)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'Debe seleccionar un municipio válido para proceder con el registro.'
      });
      this.isLoading = false;
      return;
    }

    // Preparar los datos para el backend
    const createPersonaRequest: CreatePersonaRequest = {
      numeroIdentificacion: this.generateTempId(), // Generar ID temporal si no hay documento
      primerNombre: formData.datosPersonales.nombre,
      primerApellido: formData.datosPersonales.apellidoPaterno,
      segundoApellido: formData.datosPersonales.apellidoMaterno || '',
      fechaNacimiento: this.calculateBirthDate(formData.datosPersonales.edad),
      genero: this.mapSexoToGenero(formData.datosPersonales.sexo),
      telefono: formData.contacto?.telefono || '',
      email: formData.contacto?.email || '',
      direccionAnterior: formData.ubicacion?.direccionAnterior || '',
      municipioOrigenId: municipioId,
      asentamientoOrigen: formData.ubicacion.coloniaNombre || 'Centro',
      tieneCondicionesMedicas: formData.tieneCondicionesMedicas || false,
      condicionesMedicas: formData.tieneCondicionesMedicas ? this.mapCondicionesMedicas(formData.condicionesMedicas) : [],
      grupoFamiliarId: undefined,
      albergueId: formData.informacionIngreso?.albergueId ? parseInt(formData.informacionIngreso.albergueId, 10) : undefined,
      observaciones: `Registrado el ${new Date().toLocaleDateString()}. Es cabeza de familia: ${formData.esCabezaFamilia ? 'Sí' : 'No'}`
    };

    // Llamar al servicio del backend
    this.personasService.createPersona(createPersonaRequest).subscribe({
      next: (persona) => {
        this.isLoading = false;
        console.log('Persona creada exitosamente:', persona);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Registro Exitoso',
          detail: `La persona ${persona.primerNombre} ${persona.primerApellido} ha sido registrada correctamente`
        });
        
        // Redirigir después de un breve delay
        setTimeout(() => {
          this.router.navigate(['/busqueda']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al crear persona:', error);
        
        this.messageService.add({
          severity: 'error',
          summary: 'Error de Registro',
          detail: 'Ocurrió un error al registrar la persona. Por favor intente nuevamente.'
        });
      }
    });
  }

  private registrarGrupoFamiliar(formData: any) {
    // Validar que los datos requeridos estén presentes
    const municipioId = parseInt(formData.ubicacion.municipioId, 10);
    if (!municipioId || isNaN(municipioId)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Validación',
        detail: 'Debe seleccionar un municipio válido para proceder con el registro.'
      });
      this.isLoading = false;
      return;
    }

    // Preparar datos del representante (cabeza de familia) - usando campos exactos del CreatePersonaDto
    const representante = {
      nombre: formData.datosPersonales.nombre,
      apellidoPaterno: formData.datosPersonales.apellidoPaterno,
      apellidoMaterno: formData.datosPersonales.apellidoMaterno || '',
      edad: formData.datosPersonales.edad,
      sexo: formData.datosPersonales.sexo,
      municipioId: municipioId,
      asentamientoNombre: formData.ubicacion.coloniaNombre || 'Centro',
      direccionAnterior: formData.ubicacion?.direccionAnterior || '',
      esCabezaFamilia: true,
      grupoFamiliarId: null,
      parentesco: null,
      albergueId: formData.informacionIngreso?.albergueId ? parseInt(formData.informacionIngreso.albergueId, 10) : null,
      observaciones: `Cabeza de familia - Registrado el ${new Date().toLocaleDateString()}`,
      documentoIdentidad: this.generateTempId(),
      telefonoContacto: formData.contacto?.telefono || ''
    };

    // Preparar datos de los familiares - usando campos exactos del CreatePersonaDto
    const miembrosFamiliares = formData.familiares.map((familiar: any) => ({
      nombre: familiar.nombre,
      apellidoPaterno: familiar.apellidoPaterno,
      apellidoMaterno: familiar.apellidoMaterno || '',
      edad: familiar.edad,
      sexo: familiar.sexo,
      municipioId: municipioId,
      asentamientoNombre: formData.ubicacion.coloniaNombre || 'Centro',
      direccionAnterior: formData.ubicacion?.direccionAnterior || '',
      esCabezaFamilia: false,
      grupoFamiliarId: null,
      parentesco: familiar.parentesco,
      albergueId: formData.informacionIngreso?.albergueId ? parseInt(formData.informacionIngreso.albergueId, 10) : null,
      observaciones: `Familiar - Parentesco: ${familiar.parentesco} - Registrado el ${new Date().toLocaleDateString()}`,
      documentoIdentidad: this.generateTempId(),
      telefonoContacto: ''
    }));

    // Preparar request para grupo familiar
    const createGrupoFamiliarRequest: CreateGrupoFamiliarRequest = {
      albergueId: formData.informacionIngreso?.albergueId ? parseInt(formData.informacionIngreso.albergueId, 10) : 1,
      requiereAyudaEspecial: false,
      descripcionSituacion: `Grupo familiar registrado el ${new Date().toLocaleDateString()}. Total miembros: ${1 + formData.familiares.length}`,
      miembros: [representante, ...miembrosFamiliares]
    };

    console.log('Creando grupo familiar:', createGrupoFamiliarRequest);

    // Llamar al servicio del backend para crear el grupo familiar
    this.gruposFamiliaresService.createGrupoFamiliar(createGrupoFamiliarRequest).subscribe({
      next: (grupoFamiliar) => {
        this.isLoading = false;
        console.log('Grupo familiar creado exitosamente:', grupoFamiliar);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Registro Exitoso',
          detail: `El grupo familiar ha sido registrado correctamente con ${grupoFamiliar.numeroMiembros || (1 + formData.familiares.length)} miembros`
        });
        
        // Redirigir después de un breve delay
        setTimeout(() => {
          this.router.navigate(['/busqueda']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al crear grupo familiar:', error);
        
        this.messageService.add({
          severity: 'error',
          summary: 'Error de Registro',
          detail: 'Ocurrió un error al registrar el grupo familiar. Por favor intente nuevamente.'
        });
      }
    });
  }

  private generateTempId(): string {
    // Generar un ID temporal basado en timestamp y nombre
    const timestamp = Date.now().toString();
    const formData = this.registroForm.value;
    const initials = (formData.datosPersonales.nombre.charAt(0) + 
                     formData.datosPersonales.apellidoPaterno.charAt(0)).toUpperCase();
    return `TEMP${initials}${timestamp.slice(-6)}`;
  }

  private calculateBirthDate(edad: number): Date {
    const today = new Date();
    const birthYear = today.getFullYear() - edad;
    return new Date(birthYear, today.getMonth(), today.getDate());
  }

  private mapSexoToGenero(sexo: string): 'M' | 'F' | 'Otro' {
    switch (sexo) {
      case 'M':
        return 'M';
      case 'F':
        return 'F';
      default:
        return 'Otro';
    }
  }

  private mapCondicionesMedicas(condiciones: any[]): any[] {
    return condiciones.map(condicion => ({
      condicion: condicion.tipoCondicion || condicion.condicion,
      requiereTratamiento: condicion.esCritica || false,
      medicamentos: condicion.medicamentos,
      observaciones: condicion.descripcionEspecifica || condicion.observaciones
    }));
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl, index) => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Utilidades para validación
  hasFieldError(fieldPath: string): boolean {
    const field = this.registroForm.get(fieldPath);
    return !!(field?.errors && field.touched);
  }

  getFieldError(fieldPath: string): string {
    const field = this.registroForm.get(fieldPath);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['min']) return `Valor mínimo: ${field.errors['min'].min}`;
      if (field.errors['max']) return `Valor máximo: ${field.errors['max'].max}`;
    }
    return '';
  }

  cancelar() {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea cancelar? Se perderán todos los datos ingresados.',
      header: 'Confirmar Cancelación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.router.navigate(['/home']);
      }
    });
  }
}