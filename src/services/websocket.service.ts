import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient: Stomp.Client | undefined;
  private messagesSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/websocket');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
      if (this.stompClient) {
        this.stompClient.subscribe('/user/queue/messages', (message) => {
          this.messagesSubject.next(JSON.parse(message.body));
        });
      }
    });
  }

  sendMessage(chatId: number, senderId: number, receiverId: number, message: string) {
    const payload = {
      message,
      senderId,
      receiverId,
    };

    if (this.stompClient) {
      this.stompClient.send(`/app/sendmessage/${chatId}`, {}, JSON.stringify(payload));
    }
  }

  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected from WebSocket');
      });
    }
  }

    // Subscribe specific chat
    subscribeToChat(chatId: number) {
      if (this.stompClient) {
        this.stompClient.subscribe(`/chat/${chatId}`, (message) => {
          console.log('New message for chat:', message.body);
          this.messagesSubject.next(JSON.parse(message.body));
        });
      }
    }

}
