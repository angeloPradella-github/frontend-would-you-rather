import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/util.css'],
})
export class RegisterComponent implements OnInit {
  userData = {
    name: '',
    surname: '',
    nationality: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  fieldTouched = {
    name: false,
    surname: false,
    nationality: false,
    email: false,
    password: false,
    confirmPassword: false,
  };

  errorMessages: string[] = [];

  nations: any[] | undefined = [];
  selectedNation: { name: string; code: string } | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getNationalities();
  }

  getNationalities() {
    const apiUrl = 'https://restcountries.com/v3.1/all';

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.nations = data.map((country: any) => {
          return { name: country.name.common, code: country.cca2 };
        });
      },
      (error) => {
        console.error("Errore durante la richiesta all'API", error);
        //fallback
        this.nations = [
          { name: 'Australia', code: 'AU' },
          { name: 'Brazil', code: 'BR' },
          { name: 'China', code: 'CN' },
          { name: 'Egypt', code: 'EG' },
          { name: 'France', code: 'FR' },
          { name: 'Germany', code: 'DE' },
          { name: 'India', code: 'IN' },
          { name: 'Japan', code: 'JP' },
          { name: 'Spain', code: 'ES' },
          { name: 'United States', code: 'US' },
        ];
      }
    );
  }

  submit() {
    // Verifica se ci sono campi obbligatori vuoti
    if (
      !this.userData.name ||
      !this.userData.surname ||
      !this.userData.email ||
      !this.userData.password ||
      !this.userData.confirmPassword ||
      !this.selectedNation
    ) {
      this.errorMessages = ['Fill all the required fields.'];
      this.messageService.add({
        severity: 'error',
        summary: 'Errore',
        detail: 'Fill all the required fields.',
      });
      return; // Non effettuare la chiamata POST se ci sono campi vuoti
    }
    // Metti la nazione selezionata nei dati dell'utente
    if (this.selectedNation && this.selectedNation.code) {
      this.userData.nationality = this.selectedNation.code;
    }

    // Effettua la chiamata POST
    this.http
      .post(
        'https://wouldyouratherbackend-production.up.railway.app/register',
        this.userData
      )
      .subscribe(
        (response: any) => {
          if (response) {
            console.log('registrazione riuscita');
            this.messageService.add({
              severity: 'success',
              summary: 'Login effettuato',
              detail: 'Benvenuto nella tua area personale',
            });

            this.router.navigate(['/login']);
          } else {
            this.errorMessages = ['Error'];

            this.messageService.add({
              severity: 'error',
              summary: 'Errore',
              detail: 'Errore durante la chiamata POST.',
            });
            console.error('Errore dal backend:', response);
          }
        },
        (error: any) => {
          if (error.status === 400) {
            // Gestisci l'errore di validazione dei campi nel backend
            const errorMessage = error.error.error; // Assumendo che il campo "error" contenga il messaggio di errore
            this.errorMessages = [errorMessage];

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMessage,
            });
            console.error('Errore durante la chiamata POST:', errorMessage);
          } else {
            // Gestisci altri errori
            this.errorMessages = ['Errore durante la chiamata POST'];
            this.messageService.add({
              severity: 'error',
              summary: 'Errore',
              detail: 'Errore durante la chiamata POST.',
            });
            console.error('Errore durante la chiamata POST:', error);
          }
        }
      );

    this.messageService.clear();
  }
}
