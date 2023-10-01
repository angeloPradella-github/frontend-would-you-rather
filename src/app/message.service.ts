import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message: Message | null = null;

  addMessage(message: Message) {
    this.message = message;
  }

  clearMessage() {
    this.message = null;
  }
  constructor() {}
}
