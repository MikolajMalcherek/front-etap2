import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login-click',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login-click.component.html',
  styleUrl: './login-click.component.scss'
})
export class LoginClickComponent {

  login() {
    window.location.href = `https://aplikacjachat.auth.us-east-1.amazoncognito.com/login?client_id=1gqfmkoltk4vqlqriqubp3pd5c&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback`;
  }
}
