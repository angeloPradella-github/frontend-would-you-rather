import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    // Invia la richiesta di login al server e gestisci la risposta
    return this.http
      .post('http://localhost:8084/loginWithCredentials', { email, password })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  register(user: any) {
    // Invia la richiesta di registrazione al server e gestisci la risposta
    return this.http.post('/api/register', user);
  }

  logout() {
    // Rimuovi il token dal localStorage o da qualsiasi altro meccanismo che stai usando per il salvataggio del token
    localStorage.removeItem('token');
    localStorage.removeItem('userData');

    // Esegui eventuali altre azioni di logout come reindirizzamento
    this.router.navigate(['/']);
    // Ricarica la pagina
    location.reload();
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return this.http.get<boolean>(
      `http://localhost:8084/validateToken?token=${token}`
    );
  }

  getExpiration(): Date {
    // Implementa la logica per ottenere la data di scadenza del token.
    const token = localStorage.getItem('token');
    // Esempio di estrazione della data di scadenza dal token JWT.
    const tokenData = JSON.parse(atob(token!.split('.')[1]));
    return new Date(tokenData.exp * 1000); // Converti da Unix timestamp a JavaScript Date
  }

  decodeToken(): any {
    // Implementa la logica per decodificare e verificare il token JWT.
    const token = localStorage.getItem('token');
    if (token) {
      return jwt_decode(token);
    } else {
      return null; // Gestisci il caso in cui non ci sia alcun token
    }
  }
}
