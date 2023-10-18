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
      { name: 'Animals', code: 'ANK' },
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
        `https://wouldyouratherbackend-production.up.railway.app/GetAIFourQuestions?language=${language}&topic=${this.selectedTopic?.name}`
      )
      .subscribe((data: any) => {
        // Creare un array con le domande
        let questionsArray = [
          data.question_text1,
          data.question_text2,
          data.question_text3,
          data.question_text4,
        ];
        let newCorrectIndex = Math.floor(Math.random() * 4);

        let temp = questionsArray[newCorrectIndex];
        questionsArray[newCorrectIndex] = questionsArray[0];
        questionsArray[0] = temp;

        // Assegnare le domande mescolate alle variabili
        this.jsonData = data;
        this.jsonData.question_text1 = questionsArray[0];
        this.jsonData.question_text2 = questionsArray[1];
        this.jsonData.question_text3 = questionsArray[2];
        this.jsonData.question_text4 = questionsArray[3];
        this.jsonData.right_answer = newCorrectIndex;

        //console.log(this.jsonData);
        this.loading = false;
      });
  }

  confirmAnswer() {
    let correctAnsIndex: number = this.jsonData.right_answer;
    this.factBoxes!.forEach((el, i) => {
      if (i == correctAnsIndex) el.classList.add('correct-answer');
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
