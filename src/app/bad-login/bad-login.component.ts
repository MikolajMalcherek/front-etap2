import { Component } from '@angular/core';
import { ApprulService } from '../../services/apprul.service';

@Component({
  selector: 'app-bad-login',
  standalone: true,
  imports: [],
  templateUrl: './bad-login.component.html',
  styleUrl: './bad-login.component.scss'
})
export class BadLoginComponent {
  private redirect_uri: string;

  constructor(private appurlService: ApprulService){
    this.redirect_uri = appurlService.getActualFrontendUrl() + 'callback'
  }

  login() {
    console.log("Sdsdsdsdsdsdsd")
    window.location.href = `https://aplikacjachat.auth.us-east-1.amazoncognito.com/login?client_id=1gqfmkoltk4vqlqriqubp3pd5c&response_type=code&scope=email+openid+phone&redirect_uri=` + this.redirect_uri;
  }

}
