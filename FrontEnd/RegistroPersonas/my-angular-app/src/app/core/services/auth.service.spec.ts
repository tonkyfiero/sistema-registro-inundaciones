import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, User } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    // Limpiar localStorage después de cada test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login admin user successfully', (done) => {
      const username = 'admin';
      const password = 'admin123';
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        usuario: {
          id: '1',
          nombreUsuario: username,
          rol: 'Admin'
        }
      };

      service.login(username, password).subscribe(success => {
        expect(success).toBe(true);
        expect(service.getCurrentUser()?.username).toBe(username);
        expect(service.getCurrentUser()?.role).toBe('Admin');
        expect(service.isAuthenticated()).toBe(true);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ nombreUsuario: username, contrasena: password });
      req.flush(mockResponse);
    });

    it('should login albergue user successfully', (done) => {
      const username = 'albergue1';
      const password = 'albergue123';
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        usuario: {
          id: '2',
          nombreUsuario: username,
          rol: 'Albergue'
        }
      };

      service.login(username, password).subscribe(success => {
        expect(success).toBe(true);
        expect(service.getCurrentUser()?.username).toBe(username);
        expect(service.getCurrentUser()?.role).toBe('Albergue');
        expect(service.isAuthenticated()).toBe(true);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should login visitante user successfully', (done) => {
      const username = 'visitante1';
      const password = 'visitante123';
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        usuario: {
          id: '3',
          nombreUsuario: username,
          rol: 'Visitante'
        }
      };

      service.login(username, password).subscribe(success => {
        expect(success).toBe(true);
        expect(service.getCurrentUser()?.username).toBe(username);
        expect(service.getCurrentUser()?.role).toBe('Visitante');
        expect(service.isAuthenticated()).toBe(true);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should fail login with invalid credentials', (done) => {
      const username = 'invalid';
      const password = 'invalid';
      const mockErrorResponse = {
        success: false,
        message: 'Credenciales inválidas'
      };

      service.login(username, password).subscribe(success => {
        expect(success).toBe(false);
        expect(service.getCurrentUser()).toBeNull();
        expect(service.isAuthenticated()).toBe(false);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockErrorResponse);
    });
  });

  describe('logout', () => {
    it('should clear user data on logout', (done) => {
      // First login
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        usuario: {
          id: '1',
          nombreUsuario: 'admin',
          rol: 'Admin'
        }
      };

      service.login('admin', 'admin123').subscribe(() => {
        expect(service.isAuthenticated()).toBe(true);
        
        // Then logout
        service.logout();
        expect(service.getCurrentUser()).toBeNull();
        expect(service.isAuthenticated()).toBe(false);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      req.flush(mockResponse);
    });
  });

  describe('role permissions', () => {
    it('should allow admin to edit', (done) => {
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        usuario: {
          id: '1',
          nombreUsuario: 'admin',
          rol: 'Admin'
        }
      };

      service.login('admin', 'admin123').subscribe(() => {
        expect(service.canEdit()).toBe(true);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      req.flush(mockResponse);
    });

    it('should allow albergue to edit', (done) => {
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        usuario: {
          id: '2',
          nombreUsuario: 'albergue1',
          rol: 'Albergue'
        }
      };

      service.login('albergue1', 'albergue123').subscribe(() => {
        expect(service.canEdit()).toBe(true);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      req.flush(mockResponse);
    });

    it('should not allow visitante to edit', (done) => {
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        usuario: {
          id: '3',
          nombreUsuario: 'visitante1',
          rol: 'Visitante'
        }
      };

      service.login('visitante1', 'visitante123').subscribe(() => {
        expect(service.canEdit()).toBe(false);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      req.flush(mockResponse);
    });

    it('should not allow edit when not authenticated', () => {
      expect(service.canEdit()).toBe(false);
    });
  });

  describe('persistence', () => {
    it('should persist user data in localStorage', (done) => {
      const mockUser: User = {
        id: 1,
        username: 'admin',
        email: 'admin@test.com',
        role: 'Admin',
        isActive: true
      };
      
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        usuario: {
          id: '1',
          nombreUsuario: 'admin',
          rol: 'Admin'
        }
      };

      service.login('admin', 'admin123').subscribe(() => {
        const storedUser = localStorage.getItem('currentUser');
        expect(storedUser).not.toBeNull();
        expect(JSON.parse(storedUser!)).toEqual(mockUser);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      req.flush(mockResponse);
    });

    it('should load user from localStorage on service creation', () => {
      const mockUser: User = {
        id: 1,
        username: 'admin',
        email: 'admin@test.com',
        role: 'Admin',
        isActive: true
      };
      
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      
      const newService = TestBed.inject(AuthService);
      expect(newService.getCurrentUser()).toEqual(mockUser);
      expect(newService.isAuthenticated()).toBe(true);
    });

    it('should handle invalid localStorage data gracefully', () => {
      localStorage.setItem('currentUser', 'invalid json');
      
      const newService = TestBed.inject(AuthService);
      
      expect(newService.getCurrentUser()).toBeNull();
      expect(newService.isAuthenticated()).toBe(false);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when user is logged in', (done) => {
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        usuario: {
          id: '1',
          nombreUsuario: 'admin',
          rol: 'Admin'
        }
      };

      service.login('admin', 'admin123').subscribe(() => {
        expect(service.isAuthenticated()).toBe(true);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      req.flush(mockResponse);
    });

    it('should return false when no user is logged in', () => {
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should return false after logout', (done) => {
      const mockResponse = {
        success: true,
        message: 'Login exitoso',
        usuario: {
          id: '1',
          nombreUsuario: 'admin',
          rol: 'Admin'
        }
      };

      service.login('admin', 'admin123').subscribe(() => {
        service.logout();
        expect(service.isAuthenticated()).toBe(false);
        done();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
      req.flush(mockResponse);
    });
  });
});