import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
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
  isUpdating: boolean = false;

  displayedPercentage1: number = 0;
  displayedPercentage2: number = 0;

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
  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  async updateData() {
    if (this.isUpdating) return;

    this.isUpdating = true;

    // Start animation
    this.incrementElementValueOverTime();

    // Font size adjustment
    const divs = this.el.nativeElement.querySelectorAll(
      '.percentage-container'
    );
    divs.forEach((div: HTMLElement) => {
      const span = div.querySelector('span');
      this.renderer.setStyle(span, 'font-size', '3.5rem');
    });

    // Add a 2-second delay before making the HTTP request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setTimeout(() => {
      divs.forEach((div: HTMLElement) => {
        const span = div.querySelector('span');
        this.renderer.setStyle(span, 'font-size', '0rem');
      });

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
        this.displayedPercentage1 = 0; // or whatever the starting value should be
        this.displayedPercentage2 = 0; // or whatever the starting value should be
        this.isUpdating = false;
      });
    }, 2000);
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
  //---------------Increment function
  incrementElementValueOverTime(): void {
    let targetNumber1: number =
      this.jsonData?.percentage_selected_first_question || 0;
    let targetNumber2: number =
      this.jsonData?.percentage_selected_second_question || 0;

    const timeInterval1 = 2000 / targetNumber1;
    const timeInterval2 = 2000 / targetNumber2;

    this.displayedPercentage1 = 0;
    this.displayedPercentage2 = 0;

    const intervalId1 = setInterval(() => {
      this.displayedPercentage1++;

      if (this.displayedPercentage1 >= targetNumber1) {
        clearInterval(intervalId1);
      }
    }, timeInterval1);

    const intervalId2 = setInterval(() => {
      this.displayedPercentage2++;

      if (this.displayedPercentage2 >= targetNumber2) {
        clearInterval(intervalId2);
      }
    }, timeInterval2);
  }
}
