import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, CarouselModule, CardModule, DividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  images = [
    {
      src: '/assets/images/inundacion-poza-rica.svg',
      alt: 'Inundación en Poza Rica de Hidalgo',
      title: 'Poza Rica de Hidalgo',
      description: 'Afectaciones por inundaciones en el municipio de Poza Rica'
    },
    {
      src: '/assets/images/inundacion-tuxpan.svg',
      alt: 'Inundación en Tuxpan',
      title: 'Tuxpan',
      description: 'Familias afectadas por las inundaciones en Tuxpan'
    },
    {
      src: '/assets/images/inundacion-alamo.svg',
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
}