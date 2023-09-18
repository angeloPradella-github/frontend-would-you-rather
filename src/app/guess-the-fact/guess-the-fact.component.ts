import { Component } from '@angular/core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

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

  ngOnInit() {
    this.page = document.querySelector('#gtfPage');
  }

  answerSelected(factID: string) {
    let factBox: HTMLElement = document.getElementById(factID)!;
    let oldFactBox: HTMLCollectionOf<Element> | null =
      document.getElementsByClassName('hold-answer');
    console.log(this.page);
    let confirmBtn = this.page!.querySelector('#confirmBtn');

    Array.from(oldFactBox).forEach((el) => {
      el.classList.remove('hold-answer');
    });

    factBox.classList.toggle('hold-answer');
    if (confirmBtn?.classList.contains('d-none'))
      confirmBtn?.classList.remove('d-none');
    this.selectedfactBoxID = factBox.id;
  }
}
