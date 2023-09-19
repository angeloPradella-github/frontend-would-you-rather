import { Component } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

interface Topic {
  name: string;
  code: string;
}

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
  explanationBox: Element | null = null;

  topics: Topic[] | undefined;
  selectedTopic: Topic | undefined;

  languages: any[] | undefined;
  selectedLanguage: { name: string; code: string } | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.languages = [
      { name: 'Italian', code: 'IT' },
      { name: 'English', code: 'GB' },
      { name: 'French', code: 'FR' },
      { name: 'German', code: 'DE' },
      { name: 'Spanish', code: 'ES' },
    ];

    this.topics = [
      { name: 'History', code: 'HS' },
      { name: 'Coding', code: 'CD' },
      { name: 'Languages', code: 'LGS' },
      { name: 'Food', code: 'FD' },
      { name: 'Fitness', code: 'FTN' },
      { name: 'Animal Kingdom', code: 'ANK' },
      { name: 'Cinema', code: 'CNM' },
    ];

    const strtingTopic: Topic = {
      name: 'History',
      code: 'HS',
    };

    this.selectedTopic = strtingTopic;

    this.page = document.querySelector('#gtfPage');
    this.factBoxes = document.querySelectorAll('.fact-box');
    this.getAnswersAndShow();
    this.confirmBtn = this.page!.querySelector('#confirmBtn');
    this.nextQuestionsBtn = this.page!.querySelector('#nextQuestionsBtn');
    this.explanationBox = this.page!.querySelector('#explanation');
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
    let language;
    if (this.selectedLanguage == undefined) language = 'english';
    else language = this.selectedLanguage.name;

    this.http
      .get(
        `http://localhost:8084/GetAIFourQuestions?language=${language}&topic=${this.selectedTopic?.name}`
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
    this.explanationBox?.classList.toggle('scale-transition');
    console.log(this.jsonData);
  }

  nextQuestions() {
    this.nextQuestionsBtn?.classList.toggle('d-none');
    this.explanationBox?.classList.toggle('scale-transition');

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
