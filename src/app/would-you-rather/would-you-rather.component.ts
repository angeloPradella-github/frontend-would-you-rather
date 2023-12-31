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
  loading: boolean = false;

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

  async updateData(questionText: number) {
    if (this.isUpdating) return;

    this.isUpdating = true;

    // Start animation
    this.incrementElementValueOverTime();

    // Font size adjustment
    const divs = this.el.nativeElement.querySelectorAll(
      '.percentage-container'
    );
    const screenWidth = window.innerWidth;

    divs.forEach((div: HTMLElement) => {
      const span = div.querySelector('span');
      if (screenWidth <= 724) {
        this.renderer.setStyle(span, 'font-size', '2.3rem');
      } else {
        this.renderer.setStyle(span, 'font-size', '3.5rem');
      }
    });
    //----------showing the number of people
    const agreeingH3s = this.el.nativeElement.querySelectorAll('.agreeing-tot');
    if (questionText == 1) {
      agreeingH3s[0].innerText = `${this.jsonData.time_selected_first_question} People Agree`;
      agreeingH3s[1].innerText = `${this.jsonData.time_selected_second_question} People Disagree`;
    } else if (questionText == 2) {
      agreeingH3s[0].innerText = `${this.jsonData.time_selected_first_question} People Disgree`;
      agreeingH3s[1].innerText = `${this.jsonData.time_selected_second_question} People Agree`;
    }

    setTimeout(() => {
      agreeingH3s.forEach((h3: HTMLElement) => {
        this.renderer.setStyle(h3, 'transform', 'scale(1)');
      });
    }, 1000);
    //--------------------------------------

    // Add a 2-second delay before making the HTTP request
    if (this.currentChoices == 'ng')
      await new Promise((resolve) => setTimeout(resolve, 2000));

    setTimeout(() => {
      divs.forEach((div: HTMLElement) => {
        const span = div.querySelector('span');
        this.renderer.setStyle(span, 'font-size', '0rem');
      });
      agreeingH3s.forEach((h3: HTMLElement) => {
        this.renderer.setStyle(h3, 'transform', 'scale(0)');
      });

      let endpoint: string = '';
      if (this.currentChoices == 'ng') {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        endpoint = environment.normalEndpoint + randomNumber;

        //------------salvataggio scelta nel db----------------
        this.updatePercentageDb(questionText);
      } else if (this.currentChoices == 'ai') {
        const lang = 'italian';
        endpoint = environment.aiEndpoint + lang;
      }

      // Set loading to true right before making the HTTP call
      this.loading = true;

      this.http.get(endpoint).subscribe((data: any) => {
        this.jsonData = data;
        // Set loading to false after the data is retrieved
        this.loading = false;
        // Reset the flag at the end of the operation
        this.isUpdating = false;
      });
    }, 2000);
  }

  updatePercentageDb(questionText: number) {
    const questionIdParam: number = this.jsonData.questionId; // Replace with your desired value
    const questionTextParam: number = questionText; // Replace with your desired value

    const endpoint = `https://wouldyouratherbackend-production.up.railway.app/GetQuestions?questionId=${questionIdParam}&questionText=${questionTextParam}`;

    this.http.put(endpoint, {}).subscribe((data: any) => {
      console.log(data);
    });
  }

  switchChoicesType() {
    if (this.currentChoices === 'ai') {
      this.currentChoices = 'ng';
      //--------------------

      const divs = this.el.nativeElement.querySelectorAll(
        '.percentage-container'
      );
      divs.forEach((div: HTMLElement) => {
        const span = div.querySelector('span');
        this.renderer.setStyle(span, 'display', 'block');
      });

      //reshow the tot people as well
      const agreeingH3s =
        this.el.nativeElement.querySelectorAll('.agreeing-tot');
      agreeingH3s.forEach((h3: HTMLElement) => {
        this.renderer.setStyle(h3, 'display', 'block');
      });
    } else if (this.currentChoices === 'ng') {
      this.currentChoices = 'ai';
      //--------------------
      const divs = this.el.nativeElement.querySelectorAll(
        '.percentage-container'
      );
      divs.forEach((div: HTMLElement) => {
        const span = div.querySelector('span');
        this.renderer.setStyle(span, 'display', 'none');
      });
      //cancel the tot people as well
      const agreeingH3s =
        this.el.nativeElement.querySelectorAll('.agreeing-tot');
      agreeingH3s.forEach((h3: HTMLElement) => {
        this.renderer.setStyle(h3, 'display', 'none');
      });
    }

    //this.updateData();
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
