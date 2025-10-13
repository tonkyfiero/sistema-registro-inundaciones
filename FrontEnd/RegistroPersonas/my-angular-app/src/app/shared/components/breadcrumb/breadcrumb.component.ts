import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PrimeNG Components
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

export interface BreadcrumbItem {
  label: string;
  route?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule
  ],
  template: `
    <div class="breadcrumb-container">
      <nav class="simple-breadcrumb">
        <a routerLink="/home" class="breadcrumb-home" title="Ir al inicio">
          <i class="pi pi-home"></i>
          <span>Inicio</span>
        </a>
        <span class="breadcrumb-separator">
          <i class="pi pi-angle-right"></i>
        </span>
        <span class="breadcrumb-current" *ngFor="let item of items">
          <i [class]="item.icon" *ngIf="item.icon"></i>
          <span>{{ item.label }}</span>
        </span>
      </nav>
    </div>
  `,
  styles: [`
    .breadcrumb-container {
      margin-bottom: 1.5rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .simple-breadcrumb {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .breadcrumb-home {
      color: #3b82f6;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: 0.375rem;
      transition: all 0.2s ease;
      font-weight: 500;
    }
    
    .breadcrumb-home:hover {
      background-color: #eff6ff;
      color: #1d4ed8;
      transform: translateY(-1px);
    }
    
    .breadcrumb-home i {
      font-size: 0.875rem;
    }
    
    .breadcrumb-separator {
      color: #9ca3af;
      margin: 0 0.25rem;
      font-size: 0.75rem;
    }
    
    .breadcrumb-current {
      color: #374151;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      background-color: #f9fafb;
      border-radius: 0.375rem;
      border: 1px solid #e5e7eb;
    }
    
    .breadcrumb-current i {
      font-size: 0.875rem;
      color: #6b7280;
    }
    
    /* PrimeNG Styles (cuando se habilite) */
    :host ::ng-deep .p-breadcrumb {
      background: transparent !important;
      border: none !important;
      padding: 0.5rem 0 !important;
    }
    
    :host ::ng-deep .p-breadcrumb .p-breadcrumb-list {
      margin: 0;
      padding: 0;
    }
    
    :host ::ng-deep .p-breadcrumb .p-menuitem-link {
      color: #6366f1;
      text-decoration: none;
      font-weight: 500;
    }
    
    :host ::ng-deep .p-breadcrumb .p-menuitem-link:hover {
      color: #4f46e5;
    }
    
    :host ::ng-deep .p-breadcrumb .p-breadcrumb-chevron {
      margin: 0 0.5rem;
      color: #9ca3af;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];

  homeItem: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/home',
    tooltip: 'Inicio'
  };

  get breadcrumbItems(): MenuItem[] {
    return this.items.map(item => ({
      label: item.label,
      routerLink: item.route,
      icon: item.icon
    }));
  }
}