import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

interface Games {
  name: string;
  code: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  choices_games: Games[] | undefined;
  selectedChoiceGame: Games | undefined;
  //---------------------------------//
  countries: any[] | undefined;
  selectedCountry: { name: string; code: string } | undefined;
  //---------------------------------//
  quiz_games: Games[] | undefined;
  selectedQuizGame: Games | undefined;

  ngOnInit() {
    this.choices_games = [
      { name: 'Would You Rather', code: 'WYR' },
      { name: 'What would you do for...', code: 'WWYD' },
    ];

    //---------------------------------//
    this.countries = [
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
    //---------------------------------//
    this.quiz_games = [
      { name: 'Fact Check', code: 'FC' },
      { name: 'Riddle Me This', code: 'RMT' },
    ];
  }

  siteName: string = environment.siteName;
}
