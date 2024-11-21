import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient: Stomp.Client | undefined;
  private messagesSubject: Subject<any> = new Subject<any>();

  constructor(private tokenService: TokenService) {
    this.connect();
  }

  connect() {
    const token = this.tokenService.getToken() // Ensure the token is fetched
    const socket = new SockJS('http://localhost:8080/websocket');
    this.stompClient = Stomp.over(socket);
    // console.log("Token in socket:", token);

    this.stompClient.connect(
      {
        Authorization: `Bearer ${token}`,  // Send token with the WebSocket connection
      },
      () => {
        console.log('Connected to WebSocket');
        // If you want to subscribe to a chat, you can do that after connection
        // this.subscribeToChat(chatId);
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );
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
        this.stompClient.subscribe(`/topic/chat/${chatId}`, (message) => {
          console.log('New message for chat:', message.body);
          this.messagesSubject.next(JSON.parse(message.body));
        });
      }
    }

}
