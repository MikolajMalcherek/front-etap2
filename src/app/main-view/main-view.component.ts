import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import { ChatService, Chat } from '../../services/chat.service';
import { Message, MessageResponse } from '../../services/message.service';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service';
import { TokenService } from '../../services/token.service';
import {HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, AfterViewInit{
  
  users: User[] = [];
  username: string | null = null;
  userid: number | null = null;
  chat: Chat | null = null;
  messages: MessageResponse[] = [];
  newMessage: string | null = null;
  selectedUser: User | null = null;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private chatService: ChatService,
    private websocketService: WebsocketService,
    private tokenService: TokenService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}


  ngOnInit(): void {
    console.log("Inside main view");
    // console.log("Token in main view: ", this.tokenService.getToken())

    this.userService.getUsername().subscribe((username) => {
      this.username = username;
      console.log('Username in other view:', this.username);
    });

    this.loadUsers();

    if (this.username) {
      // console.log('Returned user:');
      this.userService.getUser(this.username).subscribe(
        (user) => {
          // Once the user is found, assign the user id to this.userid
          this.userid = user.id;
          console.log('Returned user:', user);
        },
        (error) => {
          console.error('User not found:', error);
          // You can handle the error here (e.g., showing a notification)
        }
      );
    }

    console.log('Logged in user ID:', this.userid);
    
      // Subskrypcja wiadomości przychodzących
  this.websocketService.getMessages().subscribe((newMessage) => {
    console.log('New message received:', newMessage);
    if (this.chat?.id === newMessage.chatId) {
      // Jeśli wiadomość dotyczy aktualnego czatu, dodaj ją do listy wiadomości
      const messageResponse: MessageResponse = {
        message: newMessage.message,
        sender: {
          id: newMessage.senderId,
          username: newMessage.senderUsername,
        },
        receiver: {
          id: newMessage.receiverId,
          username: newMessage.receiverUsername,
        },
        chatId: newMessage.chatId,
      };
      this.messages.push(messageResponse);
    }
  });
  }


  ngAfterViewInit(): void {
    console.log('After init...');
  }
  

  beginChat(user: User): void {
    this.websocketService.disconnect();
    console.log("Clicked user:", user.username);
    console.log("Username: ", user.username);
    console.log("id: ", user.id);

    if (this.userid && user.id) {
      this.chatService.beginChat(this.userid, user.id).subscribe(
        (chat) => {
          console.log('Chat started successfully:', chat);
          // Handle the new chat here (e.g., navigate to the chat screen, display chat details)
          this.chat = chat;
          this.messages = this.chat.messages;
          this.selectedUser = user;
          console.log("Messages for selected chat: ",this.messages);

          this.websocketService.subscribeToChat(this.chat.id);
        },
        (error) => {
          console.error('Error starting chat:', error);
        }
      );
    } else {
      console.error('User ID or logged-in ID is missing');
    }
    this.websocketService.connect();
    console.log("Token in sessionStorage: ",this.tokenService.getToken())
  }

  sendMessage(): void {
    if (this.chat?.id && this.userid && this.selectedUser && this.newMessage && this.username) {
      const sender: User = {
        id: this.userid,
        username: this.username
      }
      const receiver = {
        id: this.selectedUser.id,
        username: this.selectedUser.username,
      }
      const addMessage: MessageResponse = {
        message: this.newMessage,
        sender: sender,
        receiver: receiver,
        chatId: this.chat.id
      }
      this.websocketService.sendMessage(this.chat.id, this.userid, this.selectedUser.id, this.newMessage);
          // Dodanie nowej wiadomości do tablicy messages
      // this.messages.push(addMessage);

      // Czyszczenie pola nowej wiadomości
      this.newMessage = null;
      
    } else {
      console.error('Required data is missing to send the message');
    }
    

  }

  logout(): void {
    const logoutUrl = 'https://aplikacjachat.auth.us-east-1.amazoncognito.com/logout?response_type=code&client_id=1gqfmkoltk4vqlqriqubp3pd5c&logout_uri=http://localhost:4200/loginclick';
      window.location.href = logoutUrl;
      this.tokenService.removeToken();
  }
  

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Users from backend:', data); // Wyświetlanie odpowiedzi z backendu
      },
      error: (err) => console.error('Error fetching users:', err),
    })
  }

  

}
