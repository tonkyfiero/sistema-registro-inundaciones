import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { ProgressBarModule } from 'primeng/progressbar';

import { MessageService, ConfirmationService } from 'primeng/api';
import { AlberguesService } from '../../../core/services/albergues.service';
import { MunicipiosService } from '../../../core/services/municipios.service';
import { Albergue, CreateAlbergueRequest } from '../../../domain/entities/albergue.entity';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-albergues',
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CardModule,
    TableModule,
    DialogModule,
    InputTextareaModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    MultiSelectModule,
    ChipsModule,
    ProgressBarModule,
    BreadcrumbComponent
  ],
  templateUrl: './albergues.component.html',
  styleUrl: './albergues.component.scss'
})
export class AlberguesComponent implements OnInit {
  albergues: Albergue[] = [];
  showDialog = false;
  albergueForm!: FormGroup;
  isEditing = false;
  editingId?: number;
  
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Albergues', icon: 'pi pi-home' }
  ];

  estadisticas = {
    total: 0,
    activos: 0,
    llenos: 0,
    ocupacion: 0
  };

  // Opciones para dropdowns
  municipioOptions: {label: string, value: string}[] = [];
  asentamientoOptions: {label: string, value: string}[] = [];
  
  serviciosDisponibles = [
    { label: 'Alimentos', value: 'Alimentos' },
    { label: 'Agua potable', value: 'Agua potable' },
    { label: 'Atención médica básica', value: 'Atención médica básica' },
    { label: 'Atención psicológica', value: 'Atención psicológica' },
    { label: 'Medicamentos', value: 'Medicamentos' },
    { label: 'Comunicaciones', value: 'Comunicaciones' },
    { label: 'Transporte', value: 'Transporte' },
    { label: 'Cuidado infantil', value: 'Cuidado infantil' },
    { label: 'Aseo personal', value: 'Aseo personal' },
    { label: 'Lavandería', value: 'Lavandería' }
  ];

  constructor(
    private fb: FormBuilder,
    private alberguesService: AlberguesService,
    private municipiosService: MunicipiosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadData();
  }

  private createForm() {
    this.albergueForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      municipio: ['', Validators.required],
      asentamiento: ['', Validators.required],
      capacidadMaxima: ['', [Validators.required, Validators.min(1)]],
      servicios: [[], Validators.required],
      contacto: this.fb.group({
        responsable: ['', [Validators.required, Validators.minLength(3)]],
        telefono: ['', Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)],
        email: ['', Validators.email]
      }),
      ubicacion: this.fb.group({
        latitud: [''],
        longitud: ['']
      })
    });

    // Watcher para municipio
    this.albergueForm.get('municipio')?.valueChanges.subscribe(municipio => {
      if (municipio) {
        this.loadAsentamientos(municipio);
        this.albergueForm.get('asentamiento')?.setValue('');
      }
    });
  }

  private loadData() {
    // Cargar albergues
    this.alberguesService.getAllAlbergues().subscribe(albergues => {
      this.albergues = albergues;
    });

    // Cargar estadísticas
    this.alberguesService.getEstadisticas().subscribe(stats => {
      this.estadisticas = stats;
    });

    // Cargar municipios
    this.municipiosService.getMunicipiosList().subscribe(municipios => {
      this.municipioOptions = municipios;
    });
  }

  private loadAsentamientos(municipio: string) {
    this.municipiosService.getAsentamientosListByMunicipio(municipio).subscribe(asentamientos => {
      this.asentamientoOptions = asentamientos;
    });
  }

  openNewDialog() {
    this.isEditing = false;
    this.editingId = undefined;
    this.albergueForm.reset();
    this.showDialog = true;
  }

  openEditDialog(albergue: Albergue) {
    this.isEditing = true;
    this.editingId = albergue.id;
    
    this.albergueForm.patchValue({
      nombre: albergue.nombre,
      direccion: albergue.direccion,
      municipio: albergue.municipio,
      asentamiento: albergue.asentamiento,
      capacidadMaxima: albergue.capacidadMaxima,
      servicios: albergue.servicios,
      contacto: albergue.contacto,
      ubicacion: albergue.ubicacion
    });

    // Cargar asentamientos para el municipio seleccionado
    if (albergue.municipio) {
      this.loadAsentamientos(albergue.municipio);
    }

    this.showDialog = true;
  }

  saveAlbergue() {
    if (this.albergueForm.valid) {
      const formData = this.albergueForm.value as CreateAlbergueRequest;

      if (this.isEditing && this.editingId) {
        // Actualizar
        this.alberguesService.updateAlbergue(this.editingId, formData).subscribe(result => {
          if (result) {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Albergue actualizado correctamente'
            });
            this.loadData();
            this.showDialog = false;
          }
        });
      } else {
        // Crear nuevo
        this.alberguesService.createAlbergue(formData).subscribe(result => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Albergue creado correctamente'
          });
          this.loadData();
          this.showDialog = false;
        });
      }
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos'
      });
    }
  }

  deleteAlbergue(albergue: Albergue) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar el albergue "${albergue.nombre}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.alberguesService.deleteAlbergue(albergue.id).subscribe(success => {
          if (success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Albergue eliminado correctamente'
            });
            this.loadData();
          }
        });
      }
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.albergueForm.controls).forEach(key => {
      const control = this.albergueForm.get(key);
      control?.markAsTouched();
      
      if (control?.hasError && control instanceof FormGroup) {
        Object.keys(control.controls).forEach(subKey => {
          control.get(subKey)?.markAsTouched();
        });
      }
    });
  }

  getSeverity(estado: string): 'success' | 'warning' | 'danger' {
    switch (estado) {
      case 'Activo': return 'success';
      case 'Lleno': return 'warning';
      default: return 'danger';
    }
  }

  getOcupacionColor(albergue: Albergue): string {
    const porcentaje = (albergue.capacidadActual / albergue.capacidadMaxima) * 100;
    if (porcentaje < 50) return 'success';
    if (porcentaje < 80) return 'warning';
    return 'danger';
  }

  cancelDialog() {
    this.showDialog = false;
    this.albergueForm.reset();
  }

  hasFieldError(fieldPath: string): boolean {
    const field = this.albergueForm.get(fieldPath);
    return !!(field?.errors && field.touched);
  }

  getFieldError(fieldPath: string): string {
    const field = this.albergueForm.get(fieldPath);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['min']) return `Valor mínimo: ${field.errors['min'].min}`;
      if (field.errors['email']) return 'Email no válido';
      if (field.errors['pattern']) return 'Formato no válido (ej: 782-123-4567)';
    }
    return '';
  }
}