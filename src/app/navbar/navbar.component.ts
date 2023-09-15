import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';
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
  //---------------------------------//
  siteName: string = environment.siteName;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any): void {
    const yOffset = window.scrollY || document.documentElement.scrollTop || 0;

    if (yOffset > 50 && yOffset <= 80) {
      const opacity = (yOffset - 50) / 30;
      this.changeColor(opacity);
    } else if (yOffset > 80) {
      this.changeColor(1);
    } else {
      this.changeColor(0);
    }
  }

  changeColor(opacity: number): void {
    const red = 255 * opacity;
    const green = 255 * opacity;
    const blue = 255 * opacity;
    const colorValue = `rgb(${red}, ${green}, ${blue})`;

    // Assuming you want to change the color of all direct child elements of the navbar
    const children = this.el.nativeElement.children;
    for (let i = 0; i < children.length; i++) {
      this.renderer.setStyle(children[i], 'color', colorValue);
    }
  }
}
