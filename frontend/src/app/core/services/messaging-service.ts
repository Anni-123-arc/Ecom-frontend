import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor() { }

  conversation = [
    { user: 'User', message: 'Hello, I need help with my order.' },
    { user: 'Support', message: 'Sure, I can help you with that. Can you provide your order ID?' }
  ];

  getConversation() {
    return this.conversation;
  }

  pushConvo(message: string) {
     axios.post('https://ecom-backend-ak0w.onrender.com/api/sendQuery', { userMessage: message })
  }

}
