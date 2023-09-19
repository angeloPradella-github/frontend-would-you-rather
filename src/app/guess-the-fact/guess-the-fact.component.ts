import { Component } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guess-the-fact',
  templateUrl: './guess-the-fact.component.html',
  styleUrls: ['./guess-the-fact.component.css'],
})
export class GuessTheFactComponent {
  faCheck = faCircleCheck;
  faXCheck = faCircleXmark;
  selectedfactBoxID: string = '';
  page: HTMLElement | null = null;
  jsonData: any;
  factBoxes: NodeListOf<Element> | null = null;
  loading: boolean = false;
  confirmBtn: Element | null = null;
  nextQuestionsBtn: Element | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.page = document.querySelector('#gtfPage');
    this.factBoxes = document.querySelectorAll('.fact-box');
    this.getAnswersAndShow();
    this.confirmBtn = this.page!.querySelector('#confirmBtn');
    this.nextQuestionsBtn = this.page!.querySelector('#nextQuestionsBtn');
  }

  answerSelected(factID: string) {
    let factBox: HTMLElement = document.getElementById(factID)!;
    let oldFactBox: HTMLCollectionOf<Element> | null =
      document.getElementsByClassName('hold-answer');
    console.log(this.page);

    Array.from(oldFactBox).forEach((el) => {
      el.classList.remove('hold-answer');
    });

    factBox.classList.toggle('hold-answer');
    if (this.confirmBtn?.classList.contains('d-none'))
      this.confirmBtn?.classList.remove('d-none');
    this.selectedfactBoxID = factBox.id;
  }

  getAnswersAndShow() {
    this.loading = true;

    this.http
      .get(
        'http://localhst:8084/GetAIFourQuestions?language=english&topic=history'
      )
      .subscribe((data: any) => {
        this.jsonData = data;
        this.loading = false;
      });
  }

  confirmAnswer() {
    let correctAnsIndex: number = this.jsonData.right_answer;
    this.factBoxes!.forEach((el, i) => {
      if (i == correctAnsIndex - 1) el.classList.add('correct-answer');
      else el.classList.add('wrong-answer');
    });
    this.confirmBtn?.classList.toggle('d-none');
    this.nextQuestionsBtn?.classList.toggle('d-none');

    console.log(this.jsonData);
  }

  nextQuestions() {
    this.nextQuestionsBtn?.classList.toggle('d-none');
    this.jsonData = {};
    this.factBoxes?.forEach((el, i) => {
      if (el.classList.contains('hold-answer'))
        el.classList.remove('hold-answer');
      if (el.classList.contains('wrong-answer'))
        el.classList.remove('wrong-answer');
      if (el.classList.contains('correct-answer'))
        el.classList.remove('correct-answer');
    });
    this.getAnswersAndShow();
  }
}
