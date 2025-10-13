import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./presentation/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./presentation/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'registro-persona',
    loadComponent: () => import('./presentation/pages/registro-persona/registro-persona.component').then(m => m.RegistroPersonaComponent)
  },
  {
    path: 'albergues',
    loadComponent: () => import('./presentation/pages/albergues/albergues.component').then(m => m.AlberguesComponent)
  },
  {
    path: 'busqueda',
    loadComponent: () => import('./presentation/pages/busqueda/busqueda.component').then(m => m.BusquedaComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
