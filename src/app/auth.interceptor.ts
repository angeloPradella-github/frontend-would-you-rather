import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Ottieni il token JWT dal servizio di autenticazione utilizzando decodeToken()
    const tokenData = this.authService.decodeToken();

    // Aggiungi il token alle intestazioni della richiesta se è disponibile
    if (tokenData) {
      const token = tokenData.token; // Sostituisci 'token' con il nome corretto della proprietà del token JWT
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Prosegui con la richiesta
    return next.handle(req);
  }
}
