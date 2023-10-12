import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-google-auth-redirect',
  templateUrl: './google-auth-redirect.component.html',
  styleUrls: ['./google-auth-redirect.component.css'],
})
export class GoogleAuthRedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log("Parametri ricevuti nell'URL:", params);

      const data = JSON.parse(params['data']);
      console.log("Dati JSON ricevuti nell'URL:", data);

      // Esegui l'elaborazione dei dati e salvali nel localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      console.log(
        'Dati salvati nel localStorage:',
        localStorage.getItem('token'),
        localStorage.getItem('userData')
      );

      // Esegui eventuali altre azioni di logout come reindirizzamento
      this.router.navigate(['/']);
      // Ricarica la pagina
      // location.reload();
    });
  }
}
