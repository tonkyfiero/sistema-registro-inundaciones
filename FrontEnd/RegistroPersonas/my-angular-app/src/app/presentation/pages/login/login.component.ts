import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ButtonModule, 
    InputTextModule, 
    PasswordModule, 
    DropdownModule, 
    CardModule,
    MessageModule,
    MessagesModule,
    CheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  roles = [
    { label: 'Administrador', value: 'Admin' },
    { label: 'Responsable de Albergue', value: 'Albergue' },
    { label: 'Visitante', value: 'Visitante' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['Visitante', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const formData = this.loginForm.value;
      
      // Simulación de login (aquí conectarías con tu servicio de autenticación)
      setTimeout(() => {
        this.isLoading = false;
        
        // Simulación de validación
        if (formData.username === 'admin' && formData.password === 'admin') {
          // Guardar información de sesión
          localStorage.setItem('currentUser', JSON.stringify({
            username: formData.username,
            role: formData.role
          }));
          
          // Redireccionar según el rol
          switch (formData.role) {
            case 'Admin':
              this.router.navigate(['/dashboard']);
              break;
            case 'Albergue':
              this.router.navigate(['/albergues']);
              break;
            default:
              this.router.navigate(['/home']);
          }
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es requerido`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${requiredLength} caracteres`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      username: 'Usuario',
      password: 'Contraseña',
      role: 'Rol'
    };
    return labels[fieldName] || fieldName;
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }
}