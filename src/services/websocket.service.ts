import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { Client, StompConfig } from '@stomp/stompjs'; 
import { TokenService } from './token.service';
import { ApprulService } from './apprul.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient: Client | undefined;
  private messagesSubject: Subject<any> = new Subject<any>();
  

  constructor(private tokenService: TokenService,
    private appurlService: ApprulService
  ) {
 
  }

  connect(chatId: number): void {
    const token = this.tokenService.getToken(); // Pobranie tokena
    const socketUrl = this.appurlService.getActualBackendUrl() + 'websocket'; // Adres serwera WebSocket

    console.log("Inside connect function")

    if (this.stompClient && this.stompClient.connected) {
      console.warn('Already connected to WebSocket. Disconnecting first...');
      this.disconnect(); // Rozłączenie przed nowym połączeniem
    }

    // Inicjalizacja klienta STOMP
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS(socketUrl), // Połączenie SockJS
      connectHeaders: {
        Authorization: `Bearer ${token}`, // Przekazanie tokena
      },
      debug: (str) => console.log(str), // Debugowanie połączenia
      reconnectDelay: 5000, // Automatyczne ponowne połączenie
      onConnect: () => {
        console.log(`Connected to WebSocket`);
        this.subscribeToChat(chatId);
      },
      onStompError: (frame) => {
        console.error('STOMP Error:', frame);
      },
    });

    // Aktywacja klienta
    this.stompClient.activate();
  }

  sendMessage(chatId: number, senderId: number, receiverId: number, message: string) {
    const payload = {
      message,
      senderId,
      receiverId,
    };

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: `/app/sendmessage/${chatId}`,
        body: JSON.stringify(payload),
      });
    }
  }

  getMessages(): Observable<any> {
    return this.messagesSubject.asObservable();
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Disconnected from WebSocket');
    }
  }

  subscribeToChat(chatId: number) {
    if (this.stompClient) {
      console.log("Subribing chat...")
      this.stompClient.subscribe(`/topic/chat/${chatId}`, (message) => {
        console.log('New message for chat:', message.body);
        this.messagesSubject.next(JSON.parse(message.body));
      });
    }
  }
}