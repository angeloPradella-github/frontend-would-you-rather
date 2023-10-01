import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';

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
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit() {
    this.authService
      .login(this.userData.email, this.userData.password)
      .subscribe(
        (response) => {
          if (response) {
            // environment.userData = response.user;
            localStorage.setItem('userData', JSON.stringify(response.user));

            this.router.navigate(['/']);
          } else {
            // Gestisci il caso in cui non ci sia un token valido
            this.errorMessages = ['Credenziali errate. Riprova.'];
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Credenziali errate. Riprova.',
            });
          }
        },
        (error) => {
          // Gestisci gli errori di login
          this.errorMessages = ['Errore Chiamata POST'];
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Errore durante la chiamata POST.',
          });
          console.error('Errore durante la chiamata POST:', error);
        }
      );
  }
}
