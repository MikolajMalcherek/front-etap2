import { Injectable } from '@angular/core';
import { User } from './user.service';

export interface Message {
  // id: number;
  message: string;
  senderId: number;
  receiverId: number;
  chatId: number;
}

// MessageResponse is used for a get chat response from backend
export interface MessageResponse {
  // id: number;
  message: string;
  sender: User;
  receiver: User;
  chatId: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
}
