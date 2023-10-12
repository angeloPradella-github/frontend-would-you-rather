import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-google-auth-redirect',
  templateUrl: './google-auth-redirect.component.html',
  styleUrls: ['./google-auth-redirect.component.css'],
})
export class GoogleAuthRedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(
        "Dati ricevuti nell'endpoint di reindirizzamento:",
        params['data']
      );

      const data = JSON.parse(params['data']);

      // Esegui l'elaborazione dei dati e salvali nel localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      console.log(
        'Dati salvati nel localStorage:',
        localStorage.getItem('token'),
        localStorage.getItem('userData')
      );

      // Reindirizza l'utente alla pagina principale o ad un'altra pagina desiderata
    });
  }
}
