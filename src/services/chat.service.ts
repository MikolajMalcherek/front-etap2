import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, MessageResponse } from './message.service'
import { ApprulService } from './apprul.service';

export interface Chat {
  id: number;
  user1: { id: number, username: string };
  user2: { id: number, username: string };
  messages: MessageResponse[]; // Możesz zdefiniować dokładniejszy typ dla wiadomości
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl: string;

  constructor(private http: HttpClient,
    private appurlService: ApprulService,
  )
   { 
    this.apiUrl = appurlService.getActualBackendUrl() + 'api/chats/beginchat'
  }

  beginChat(user1Id: number, user2Id: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.apiUrl}?user1Id=${user1Id}&user2Id=${user2Id}`);
  }
}
