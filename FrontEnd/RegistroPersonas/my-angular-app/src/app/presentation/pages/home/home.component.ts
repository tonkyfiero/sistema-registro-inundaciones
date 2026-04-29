import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/auth.service';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CarouselModule, CardModule, DividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  images = [
    {
      src: '/assets/images/poza-rica.png',
      alt: 'Inundación en Poza Rica de Hidalgo',
      title: 'Poza Rica de Hidalgo',
      description: 'Afectaciones por inundaciones en el municipio de Poza Rica'
    },
    {
      src: '/assets/images/tuxpan.jpg',
      alt: 'Inundación en Tuxpan',
      title: 'Tuxpan',
      description: 'Familias afectadas por las inundaciones en Tuxpan'
    },
    {
      src: '/assets/images/alamo.jpeg',
      alt: 'Inundación en Álamo',
      title: 'Álamo Temapache',
      description: 'Comunidades evacuadas debido a las inundaciones'
    }
  ];

  statistics = [
    { label: 'Personas Registradas', value: '0', icon: 'pi pi-users' },
    { label: 'Albergues Activos', value: '0', icon: 'pi pi-home' },
    { label: 'Familias Atendidas', value: '0', icon: 'pi pi-heart' },
    { label: 'Municipios Cubiertos', value: '3', icon: 'pi pi-map-marker' }
  ];

  ngOnInit() {
    // Aquí cargarías las estadísticas reales desde el servicio
  }

  navigateToRegistro() {
    if (this.authService.canEdit()) {
      // Usuario tiene permisos, ir directamente
      this.router.navigate(['/registro-persona']);
    } else {
      // Redirigir al login
      this.router.navigate(['/login']);
    }
  }

  navigateToGestionar() {
    if (this.authService.isAuthenticated()) {
      // Usuario está autenticado, ir a albergues
      this.router.navigate(['/albergues']);
    } else {
      // Redirigir al login con returnUrl hacia albergues
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/albergues' } });
    }
  }

  // Método para cancelar y regresar a home (será usado desde login)
  cancelLogin() {
    this.router.navigate(['/home']);
  }

  get appName() {
    return environment.appName;
  }

  get appVersion() {
    return environment.version;
  }
}