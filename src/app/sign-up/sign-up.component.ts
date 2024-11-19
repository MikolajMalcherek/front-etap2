import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class SignUpComponent {
  // username: string = '';
  // password: string = '';
  // errorMessage: string = '';

  // constructor(private authService: AuthService, private router: Router) {}

  // signUp() {
  //   this.authService.signUp(this.username, this.password)
  //     // .then(() => {
  //     //   this.router.navigate(['/login']); // Po rejestracji przekierowanie do logowania
  //     // })
  //     .catch((err) => {
  //       this.errorMessage = err.message || err;
  //     });
  // }
}
