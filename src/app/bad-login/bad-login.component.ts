import { Component } from '@angular/core';

@Component({
  selector: 'app-bad-login',
  standalone: true,
  imports: [],
  templateUrl: './bad-login.component.html',
  styleUrl: './bad-login.component.scss'
})
export class BadLoginComponent {

  login() {
    window.location.href = `https://aplikacjachat.auth.us-east-1.amazoncognito.com/login?client_id=1gqfmkoltk4vqlqriqubp3pd5c&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fcallback`;
  }

}
