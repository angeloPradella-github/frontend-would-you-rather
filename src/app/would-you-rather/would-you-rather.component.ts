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
  currentChoices: string | undefined = 'ng';

  ngOnInit() {
    let endpoint: string = '';
    if (this.currentChoices == 'ng') {
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
    if (this.currentChoices == 'ng') {
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
    this.currentChoices = this.currentChoices === 'ai' ? 'ng' : 'ai';
    this.updateData();
  }

  getTooltipText(): string {
    if (this.currentChoices === 'ai') {
      return 'Switch to Normal Generation';
    } else {
      return 'Switch to AI Generation';
    }
  }
}
