import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApprulService } from '../../services/apprul.service';

@Component({
  selector: 'app-login-click',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login-click.component.html',
  styleUrl: './login-click.component.scss'
})
export class LoginClickComponent {
  private redirect_uri: string;

  constructor(private appurlService: ApprulService){
    this.redirect_uri = appurlService.getActualFrontendUrl() + 'callback'
  }


  login() {
    console.log("Redirect_uri: " + this.redirect_uri)
    window.location.href = `https://aplikacjachat.auth.us-east-1.amazoncognito.com/login?client_id=1gqfmkoltk4vqlqriqubp3pd5c&response_type=code&scope=email+openid+phone&redirect_uri=` + this.redirect_uri;
  }
}
