import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Components
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';

import { Persona } from '../../../domain/entities/persona.model';
import { PersonasService } from '../../../core/services/personas.service';
import { MunicipiosService } from '../../../core/services/municipios.service';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    TagModule,
    PaginatorModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    DialogModule,
    PanelModule,
    BreadcrumbComponent
  ],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.scss'
})
export class BusquedaComponent implements OnInit {
  personas: Persona[] = [];
  personasFiltradas: Persona[] = [];
  loading = false;
  
  // Para el modal de detalles
  mostrarDetalles = false;
  personaSeleccionada: Persona | null = null;
  detallesCompletos: any = null;
  miembrosFamilia: any[] = [];
  
  // Breadcrumb items
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Búsqueda de Personas', icon: 'pi pi-search' }
  ];
  
  // Filtros
  filtroTexto = '';
  filtroMunicipio = '';
  filtroSexo = '';
  filtroEdadMin = null;
  filtroEdadMax = null;
  filtroFechaDesde: Date | null = null;
  filtroFechaHasta: Date | null = null;

  // Opciones para filtros
  municipiosOptions = [
    { label: 'Todos', value: '' },
    { label: 'Poza Rica de Hidalgo', value: 'Poza Rica de Hidalgo' },
    { label: 'Álamo Temapache', value: 'Álamo Temapache' },
    { label: 'Tuxpan', value: 'Tuxpan' }
  ];

  sexoOptions = [
    { label: 'Todos', value: '' },
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
    { label: 'Otro', value: 'O' },
    { label: 'Prefiero no decir', value: 'N' }
  ];

  // Columnas de la tabla
  cols = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'apellidoPaterno', header: 'Apellido Paterno' },
    { field: 'apellidoMaterno', header: 'Apellido Materno' },
    { field: 'edad', header: 'Edad' },
    { field: 'sexo', header: 'Sexo' },
    { field: 'municipioNombre', header: 'Municipio' },
    { field: 'coloniaNombre', header: 'Colonia' },
    { field: 'nombreAlbergue', header: 'Albergue' },
    { field: 'albergueMunicipioNombre', header: 'Municipio Albergue' },
    { field: 'fechaHoraLlegada', header: 'Fecha Llegada' },
    { field: 'esCabezaFamilia', header: 'Cabeza Familia' }
  ];

  constructor(
    private personasService: PersonasService,
    private municipiosService: MunicipiosService
  ) {}

  ngOnInit() {
    this.loadPersonas();
  }

  // Cargar todas las personas desde el backend
  private loadPersonas() {
    this.loading = true;
    
    this.personasService.getAllPersonas().subscribe({
      next: (personas: any[]) => {
        console.log('Respuesta RAW del backend:', personas);
        this.personas = this.mapPersonasFromService(personas);
        this.loadMunicipios(); // Cargar municipios después de tener las personas
        this.aplicarFiltros();
        this.loading = false;
        console.log('Personas mapeadas para la tabla:', this.personas);
      },
      error: (error: any) => {
        console.error('Error al cargar personas:', error);
        this.loading = false;
        // En caso de error, cargar datos de ejemplo como fallback
        this.loadPersonasEjemplo();
      }
    });
  }

  // Mapear las personas del servicio al formato esperado por el componente
  private mapPersonasFromService(personas: any[]): Persona[] {
    console.log('Datos del backend antes del mapeo:', personas);
    return personas.map(persona => {
      console.log('Procesando persona:', persona);
      return {
      id: persona.id.toString(),
      codigoPersona: persona.numeroIdentificacion || 'N/A',
      nombre: persona.primerNombre,
      apellidoPaterno: persona.primerApellido,
      apellidoMaterno: persona.segundoApellido || '',
      edad: persona.edad || 0,
      sexo: persona.genero,
      municipioId: persona.municipioOrigen,
      municipioNombre: persona.municipioOrigen,
      coloniaNombre: persona.asentamientoOrigen || '',
      fechaHoraLlegada: persona.fechaRegistro,
      fechaHoraSalida: undefined,
      ultimaActualizacion: new Date(),
      esCabezaFamilia: persona.grupoFamiliar?.observaciones === "Jefe de familia",
      grupoFamiliarId: persona.grupoFamiliar?.id || null,
      albergueId: persona.albergueId || null,
      nombreAlbergue: persona.albergueNombre || 'Sin asignar',
      albergueMunicipioNombre: persona.albergueMunicipioNombre || 'N/A',
      condicionesMedicas: persona.condicionesMedicas?.map((cm: any) => ({
        tipo: cm.condicion,
        descripcion: cm.observaciones || cm.condicion
      })) || []
      };
    });
  }

  // Cargar municipios de albergues para el filtro
  private loadMunicipios() {
    // Extraer municipios únicos de los albergues de las personas cargadas
    const municipiosUnicos = [...new Set(
      this.personas
        .map(persona => persona.albergueMunicipioNombre)
        .filter(municipio => municipio && municipio !== 'N/A')
    )].sort() as string[];

    this.municipiosOptions = [
      { label: 'Todos', value: '' },
      ...municipiosUnicos.map(municipio => ({
        label: municipio,
        value: municipio
      }))
    ];
  }

  // Fallback: Cargar datos de ejemplo si falla el servicio
  private loadPersonasEjemplo() {
    this.personas = [
      {
        id: '1',
        nombre: 'Juan Carlos',
        apellidoPaterno: 'González',
        apellidoMaterno: 'López',
        edad: 45,
        sexo: 'M',
        municipioId: 'Poza Rica de Hidalgo',
        municipioNombre: 'Poza Rica de Hidalgo',
        coloniaNombre: 'Centro',
        fechaHoraLlegada: new Date('2024-01-15T14:30:00'),
        fechaHoraSalida: undefined,
        ultimaActualizacion: new Date(),
        esCabezaFamilia: true,
        condicionesMedicas: []
      },
      {
        id: '2',
        nombre: 'María Elena',
        apellidoPaterno: 'Martínez',
        apellidoMaterno: 'Rodríguez',
        edad: 32,
        sexo: 'F',
        municipioId: 'Tuxpan',
        municipioNombre: 'Tuxpan',
        coloniaNombre: 'Las Flores',
        fechaHoraLlegada: new Date('2024-01-16T09:15:00'),
        fechaHoraSalida: undefined,
        ultimaActualizacion: new Date(),
        esCabezaFamilia: false,
        condicionesMedicas: [
          { tipo: 'Diabetes', descripcion: 'Diabetes tipo 2' }
        ]
      },
      {
        nombre: 'José Antonio',
        apellidoPaterno: 'Hernández',
        apellidoMaterno: 'García',
        edad: 28,
        sexo: 'M',
        municipioId: 'Álamo Temapache',
        municipioNombre: 'Álamo Temapache',
        coloniaNombre: 'El Progreso',
        fechaHoraLlegada: new Date('2024-01-14T16:45:00'),
        fechaHoraSalida: undefined,
        ultimaActualizacion: new Date(),
        esCabezaFamilia: true,
        condicionesMedicas: []
      }
    ];
  }

  aplicarFiltros() {
    this.personasFiltradas = this.personas.filter(persona => {
      // Filtro por texto general (sin acentos)
      const textoCompleto = `${persona.nombre} ${persona.apellidoPaterno} ${persona.apellidoMaterno} ${persona.coloniaNombre}`;
      const cumpleFiltroTexto = this.filtroTexto === '' || 
        this.removeAccents(textoCompleto.toLowerCase()).includes(this.removeAccents(this.filtroTexto.toLowerCase()));

      // Filtro por municipio albergue
      const cumpleFiltroMunicipio = this.filtroMunicipio === '' || 
        persona.albergueMunicipioNombre === this.filtroMunicipio;

      // Filtro por sexo
      const cumpleFiltroSexo = this.filtroSexo === '' || 
        persona.sexo === this.filtroSexo;

      // Filtro por edad
      const cumpleFiltroEdad = (this.filtroEdadMin === null || persona.edad >= this.filtroEdadMin) &&
        (this.filtroEdadMax === null || persona.edad <= this.filtroEdadMax);

      // Filtro por fecha
      const fechaLlegada = new Date(persona.fechaHoraLlegada);
      const cumpleFiltroFecha = (this.filtroFechaDesde === null || fechaLlegada >= this.filtroFechaDesde) &&
        (this.filtroFechaHasta === null || fechaLlegada <= this.filtroFechaHasta);

      return cumpleFiltroTexto && cumpleFiltroMunicipio && cumpleFiltroSexo && cumpleFiltroEdad && cumpleFiltroFecha;
    });
  }

  // Función para remover acentos
  private removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  limpiarFiltros() {
    this.filtroTexto = '';
    this.filtroMunicipio = '';
    this.filtroSexo = '';
    this.filtroEdadMin = null;
    this.filtroEdadMax = null;
    this.filtroFechaDesde = null;
    this.filtroFechaHasta = null;
    this.aplicarFiltros();
  }

  // Método público para refrescar la lista de personas
  refrescarPersonas() {
    this.loadPersonas();
  }

  getSexoLabel(sexo: string): string {
    const option = this.sexoOptions.find(opt => opt.value === sexo);
    return option ? option.label : sexo;
  }

  // Verificar si una persona tiene grupo familiar
  tieneGrupoFamiliar(persona: Persona): boolean {
    return persona.grupoFamiliarId !== null && 
           persona.grupoFamiliarId !== undefined;
  }

  // Formatear texto de edad
  getEdadTexto(edad: number | undefined): string {
    if (edad === undefined || edad === null) {
      return 'N/A';
    }
    if (edad === 0) {
      return 'Menos de 1 año';
    }
    if (edad === 1) {
      return '1 año';
    }
    return `${edad} años`;
  }

  formatFecha(fecha: Date | undefined): string {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Métodos para el modal de detalles
  verDetalles(persona: Persona) {
    this.personaSeleccionada = persona;
    this.mostrarDetalles = true;
    if (persona.id) {
      this.cargarDetallesCompletos(persona.id);
    }
  }

  cerrarDetalles() {
    this.mostrarDetalles = false;
    this.personaSeleccionada = null;
    this.detallesCompletos = null;
    this.miembrosFamilia = [];
  }

  private cargarDetallesCompletos(personaId: string) {
    // Cargar detalles completos de la persona
    this.personasService.getPersonaById(personaId).subscribe({
      next: (detalles: any) => {
        this.detallesCompletos = detalles;
        
        // Si tiene grupo familiar, cargar los miembros
        if (detalles.grupoFamiliar?.id) {
          this.cargarMiembrosFamilia(detalles.grupoFamiliar.id);
        }
      },
      error: (error: any) => {
        console.error('Error al cargar detalles:', error);
      }
    });
  }

  private cargarMiembrosFamilia(grupoFamiliarId: number) {
    this.personasService.getMiembrosFamilia(grupoFamiliarId).subscribe({
      next: (miembros: any[]) => {
        this.miembrosFamilia = miembros.map(miembro => ({
          id: miembro.id,
          codigoPersona: miembro.numeroIdentificacion,
          nombre: miembro.primerNombre,
          apellidoPaterno: miembro.primerApellido,
          apellidoMaterno: miembro.segundoApellido || '',
          esCabezaFamilia: miembro.grupoFamiliar?.observaciones === "Jefe de familia"
        }));
      },
      error: (error: any) => {
        console.error('Error al cargar miembros familia:', error);
        this.miembrosFamilia = [];
      }
    });
  }
}