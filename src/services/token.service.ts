import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private TOKEN_KEY = 'accessToken';

  constructor() {}


  public setToken(token: string): void {
    this.TOKEN_KEY = token;
  }

  // Pobierz token z sessionStorage
  public getToken(): string | null {
    return this.TOKEN_KEY
  }

  // Usuń token z sessionStorage
  public removeToken(): void {
    this.TOKEN_KEY = ''
  }
}
