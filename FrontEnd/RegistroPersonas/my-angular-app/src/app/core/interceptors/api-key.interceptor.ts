import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  private readonly API_KEY = environment.apiKey;

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Solo agregar API Key para requests al backend
    if (req.url.includes(environment.apiUrl) || req.url.includes('registro-inundaciones-api')) {
      const apiKeyReq = req.clone({
        headers: req.headers.set('X-API-Key', this.API_KEY)
      });
      return next.handle(apiKeyReq);
    }
    
    return next.handle(req);
  }
}