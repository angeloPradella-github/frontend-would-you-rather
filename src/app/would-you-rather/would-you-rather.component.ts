import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-would-you-rather',
  templateUrl: './would-you-rather.component.html',
  styleUrls: ['./would-you-rather.component.css'],
})
export class WouldYouRatherComponent implements OnInit {
  jsonData: any;
  currentChoices: string | undefined = 'ai';

  ngOnInit() {
    let endpoint: string = '';
    if (this.currentChoices == 'normal') {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      endpoint = environment.normalEndpoint + randomNumber;
    } else if (this.currentChoices == 'ai') {
      const lang = 'italian';
      endpoint = environment.aiEndpoint + lang;
    }
    this.http.get(endpoint).subscribe((data: any) => {
      this.jsonData = data;
    });
  }
  constructor(private http: HttpClient) {}

  updateData() {
    let endpoint: string = '';
    if (this.currentChoices == 'normal') {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      endpoint = environment.normalEndpoint + randomNumber;
    } else if (this.currentChoices == 'ai') {
      const lang = 'italian';
      endpoint = environment.aiEndpoint + lang;
    }
    this.http.get(endpoint).subscribe((data: any) => {
      this.jsonData = data;
    });
  }

  switchChoicesType() {
    // Cambia il valore corrente di currentChoices
    this.currentChoices = this.currentChoices === 'ai' ? 'normal' : 'ai';
    // Aggiorna i dati in base alla nuova scelta
    this.updateData();
  }
}
