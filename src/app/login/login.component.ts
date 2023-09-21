import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './util.css'],
})
export class LoginComponent {
  userData = {
    email: '',
    password: '',
  };

  errorMessages: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.http
      .post('http://localhost:8084/loginWithCredentials', this.userData)
      .subscribe(
        (response: any) => {
          if (response && response.token) {
            // Salva il token JWT nel localStorage
            localStorage.setItem('jwtToken', response.token);
            environment.isLoggedIn = true;

            console.log('Login riuscito.');
            this.router.navigate(['/']);
          } else {
            this.errorMessages = ['Credenziali errate. Riprova.'];

            this.messageService.add({
              severity: 'error',
              summary: 'Errore',
              detail: 'Credenziali errate. Riprova.',
            });
            console.error('Credenziali non valide.');
          }
        },
        (error) => {
          this.errorMessages = ['Errore Chiamata POST'];

          this.messageService.add({
            severity: 'error',
            summary: 'Errore',
            detail: 'Errore durante la chiamata POST.',
          });
          console.error('Errore durante la chiamata POST:', error);
        }
      );

    this.messageService.clear();
  }
}
