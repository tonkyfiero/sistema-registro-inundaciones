import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'Admin' | 'Albergue' | 'Visitante';
  albergueId?: number;
  albergueNombre?: string;
  municipioNombre?: string;
  isActive: boolean;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  role: string;
  albergueId?: number;
  albergueNombre?: string;
  municipioNombre?: string;
  isActive: boolean;
  lastLogin?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Cargar usuario del localStorage si existe
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };
    
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, loginData)
      .pipe(
        map(response => {
          const user: User = {
            id: response.id,
            username: response.username,
            email: response.email,
            role: response.role as 'Admin' | 'Albergue' | 'Visitante',
            albergueId: response.albergueId,
            albergueNombre: response.albergueNombre,
            municipioNombre: response.municipioNombre,
            isActive: response.isActive
          };
          
          this.currentUserSubject.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }),
        catchError(error => {
          console.error('Error de login:', error);
          return of(false);
        })
      );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: 'Admin' | 'Albergue'): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    if (role === 'Admin') {
      return user.role === 'Admin';
    }
    
    if (role === 'Albergue') {
      return user.role === 'Admin' || user.role === 'Albergue';
    }
    
    return false;
  }

  canEdit(): boolean {
    return this.hasRole('Admin') || this.hasRole('Albergue');
  }
}