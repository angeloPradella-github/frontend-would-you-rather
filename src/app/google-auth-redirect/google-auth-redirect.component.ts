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
      if (params) {
        const data = JSON.parse(params['data']);

        // Esegui l'elaborazione dei dati e salvali nel localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));

        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
