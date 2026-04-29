import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { AuthService, User } from '../../../core/services/auth.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    BreadcrumbModule,
    ButtonModule,
    AvatarModule,
    BadgeModule
  ],
  template: `
    <div class="navbar-container">
      <!-- Main Navigation Bar -->
      <p-menubar [model]="menuItems" class="main-navbar">
        <ng-template pTemplate="start">
          <div class="navbar-brand" (click)="navigateToHome()">
            <i class="pi pi-home text-2xl text-primary"></i>
            <span class="font-bold ml-2 text-primary">Sistema Registro</span>
          </div>
        </ng-template>
        
        <ng-template pTemplate="end">
          <div class="navbar-user-section" *ngIf="currentUser; else loginButton">
            <div class="user-info">
              <p-avatar 
                [label]="getUserInitials()" 
                [style]="{'background-color': getUserColor(), 'color': '#ffffff'}"
                size="normal" 
                shape="circle">
              </p-avatar>
              <div class="user-details ml-2">
                <div class="font-semibold text-sm">{{ currentUser.username }}</div>
                <div class="text-xs text-500">{{ getRoleLabel(currentUser.role) }}</div>
              </div>
              <p-badge 
                *ngIf="currentUser.role === 'Admin'" 
                value="Admin" 
                severity="success" 
                class="ml-2">
              </p-badge>
              <p-badge 
                *ngIf="currentUser.role === 'Albergue'" 
                value="Albergue" 
                severity="info" 
                class="ml-2">
              </p-badge>
            </div>
            <p-button 
              icon="pi pi-sign-out" 
              severity="secondary" 
              [text]="true"
              (onClick)="logout()"
              pTooltip="Cerrar Sesión"
              tooltipPosition="bottom">
            </p-button>
          </div>
          
          <ng-template #loginButton>
            <p-button 
              label="Iniciar Sesión" 
              icon="pi pi-sign-in"
              severity="primary"
              (onClick)="navigateToLogin()">
            </p-button>
          </ng-template>
        </ng-template>
      </p-menubar>
      
    </div>
  `,
  styles: [`
    .navbar-container {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .main-navbar {
      border: none;
      border-radius: 0;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .navbar-brand:hover {
      background-color: var(--surface-100);
    }

    .navbar-user-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      align-items: center;
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .breadcrumb-container {
      background-color: var(--surface-50);
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--surface-200);
    }

    .custom-breadcrumb {
      background: transparent;
      border: none;
      padding: 0;
    }

    @media (max-width: 768px) {
      .user-details {
        display: none;
      }
      
      .navbar-brand span {
        display: none;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  menuItems: MenuItem[] = [];
  breadcrumbs: MenuItem[] = [];
  homeItem: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscribirse a cambios de usuario
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
      this.updateMenuItems();
    });

    // Suscribirse a cambios de ruta para actualizar breadcrumbs
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router)
      )
      .subscribe(() => {
        this.updateBreadcrumbs();
      });

    // Inicializar breadcrumbs
    this.updateBreadcrumbs();
  }

  updateMenuItems() {
    this.menuItems = [];

    if (this.currentUser) {
      // Menú para usuarios autenticados
      this.menuItems = [
        {
          label: 'Inicio',
          icon: 'pi pi-home',
          routerLink: ['/']
        },
        {
          label: 'Personas',
          icon: 'pi pi-users',
          items: [
            {
              label: 'Registrar',
              icon: 'pi pi-user-plus',
              routerLink: ['/registro-persona'],
              visible: this.authService.canEdit()
            },
            {
              label: 'Buscar',
              icon: 'pi pi-search',
              routerLink: ['/busqueda']
            }
          ]
        }
      ];

      // Agregar menú de albergues solo para Admin y Albergue
      if (this.currentUser.role === 'Admin' || this.currentUser.role === 'Albergue') {
        this.menuItems.push({
          label: 'Albergues',
          icon: 'pi pi-building',
          routerLink: ['/albergues']
        });
      }

      // Menú de administración solo para Admin
      if (this.currentUser.role === 'Admin') {
        this.menuItems.push({
          label: 'Administración',
          icon: 'pi pi-cog',
          items: [
            {
              label: 'Usuarios',
              icon: 'pi pi-users',
              routerLink: ['/admin/usuarios']
            },
            {
              label: 'Reportes',
              icon: 'pi pi-chart-bar',
              routerLink: ['/admin/reportes']
            }
          ]
        });
      }
    }
  }

  updateBreadcrumbs() {
    const url = this.router.url;
    const urlSegments = url.split('/').filter(segment => segment);
    
    this.breadcrumbs = [];

    // Mapear rutas a breadcrumbs
    const routeMap: { [key: string]: string } = {
      'registro-persona': 'Registrar Persona',
      'busqueda': 'Buscar Personas',
      'albergues': 'Gestión de Albergues',
      'login': 'Iniciar Sesión',
      'admin': 'Administración',
      'usuarios': 'Usuarios',
      'reportes': 'Reportes'
    };

    let currentPath = '';
    urlSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      this.breadcrumbs.push({
        label: routeMap[segment] || this.capitalizeFirst(segment),
        routerLink: index === urlSegments.length - 1 ? undefined : currentPath
      });
    });
  }

  getUserInitials(): string {
    if (!this.currentUser) return '';
    const names = this.currentUser.username.split(' ');
    return names.map(name => name.charAt(0).toUpperCase()).join('').substring(0, 2);
  }

  getUserColor(): string {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    if (!this.currentUser) return colors[0];
    
    const hash = this.currentUser.username
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    return colors[hash % colors.length];
  }

  getRoleLabel(role: string): string {
    const roleLabels: { [key: string]: string } = {
      'Admin': 'Administrador',
      'Albergue': 'Gestor de Albergue',
      'Visitante': 'Visitante'
    };
    return roleLabels[role] || role;
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}