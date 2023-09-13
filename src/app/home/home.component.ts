import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'; // Importa l'icona del pulsante di riproduzione

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  siteName: string = environment.siteName;
  playIcon = faPlayCircle;
}
