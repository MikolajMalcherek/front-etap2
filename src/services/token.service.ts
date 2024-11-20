import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private TOKEN_KEY = 'accessToken';

  constructor() {}

  // Zapisz token do sessionStorage
  public setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  // Pobierz token z sessionStorage
  public getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  // Usuń token z sessionStorage
  public removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
