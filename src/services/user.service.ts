import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApprulService } from './apprul.service';

export interface User {
  id: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string;

  // BehaviorSubject do przechowywania i udostępniania username
  private usernameSource = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient,
              private appUrlService: ApprulService
  ) { 
      this.apiUrl = this.appUrlService.getActualBackendUrl() + 'api/users'
  }



  getAllUsers(): Observable<User[]> {
    console.log('Sending request to backend to adress: ', this.apiUrl);
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(username: string): Observable<User> {
    const url = `${this.apiUrl}/getuser?username=${username}`;
    console.log('Sending request to backend to adress: ', url)
    return this.http.get<User>(url);
  }

  setUsername(username: string): void {
    this.usernameSource.next(username);
  }

  // Funkcja do pobierania username
  getUsername() {
    return this.usernameSource.asObservable();
  }
}
