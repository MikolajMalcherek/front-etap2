import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import {HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApprulService } from '../../services/apprul.service';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent{
  isLoading = true; // Dodajemy zmienną do kontrolowania ładowania

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService,
    private tokenService: TokenService,
    private appurlService: ApprulService,
  ) { }

  ngOnInit(): void {
    console.log("Inside callback page");
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      console.log('Received code: ', code);
      if(code == null){
        console.log("Empty code!")
      }
      if (code) {
        const url = this.appurlService.getActualBackendUrl() + 'callback'
        this.http.get<TokenResponse>(url, {
          params: {code},
        })
          .subscribe(response => {
            console.log('Backend response: ', response);

            const token = response.access_token;
            const refresh_token = response.refresh_token;
            // console.log("Token: " + token);
            // console.log("RefreshToken: " + refresh_token);

            if (token) {
              // Sprawdzamy, czy jesteśmy w przeglądarce
                this.tokenService.setToken(token);

            } else {
              console.error('Token not found in response.');
              this.redirectToBadLogin();
            }

            const username = this.getUsernameFromToken(token);
            
            if (username) {
              const usercreateurl = this.appurlService.getActualBackendUrl() + 'api/users/create' 
              this.userService.setUsername(username);
              this.http.post<TokenResponse>(usercreateurl, {
                username: username
              })
              .subscribe(
                response => {
                  // Obsługuje odpowiedź
                  console.log("Token z session storage",this.tokenService.getToken())
                  console.log('User created:');
                },
                error => {
                  // Obsługuje błąd
                  console.error('User exists already');
                }
              );
            }

            this.router.navigate(['/main-view']);
            this.isLoading = false; // Wyłącz spinner po zakończeniu ładowania
          }, error => {
            console.error('Error during token exchange: ', error);
            // this.redirectToBadLogin();
            this.isLoading = false; // Wyłącz spinner po błędzie
          });
      } else {
        // this.redirectToBadLogin();
        this.isLoading = false; // Wyłącz spinner, jeśli brak kodu
      }
    });
  }

  private redirectToBadLogin(): void {
    const clientId = '4u16sf8bhgdvjdf01b3uccgo8u';
    const logoutUrl = `https://aplikacjachat.auth.us-east-1.amazoncognito.com/logout`;
    const redirectUri = this.appurlService.getActualFrontendUrl() + 'bad-login';

    if (isPlatformBrowser(this.platformId)) {
      const logoutUrl = 'https://aplikacjachat.auth.us-east-1.amazoncognito.com/logout?response_type=code&client_id=1gqfmkoltk4vqlqriqubp3pd5c&logout_uri=' + redirectUri;
      window.location.href = logoutUrl;
    }
  }

  getUsernameFromToken(token: string): string | null {
    try {
      const payload = token.split('.')[1]; // Część payload tokenu
      const decodedPayload = atob(payload); // Dekodowanie base64
      const parsedPayload = JSON.parse(decodedPayload); // Parsowanie JSON
  
      // Zwrócenie wartości pola "username"
      return parsedPayload.username || null;
    } catch (error) {
      console.error('Błąd podczas dekodowania tokenu', error);
      return null;
    }
  }
  
}
