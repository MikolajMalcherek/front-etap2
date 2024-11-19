import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component'
import { LoginClickComponent } from './login-click/login-click.component';
import { MainViewComponent } from './main-view/main-view.component';
import { BadLoginComponent } from './bad-login/bad-login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    { path: 'loginclick', component: LoginClickComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'main-view', component: MainViewComponent },
    {path: 'bad-login', component:BadLoginComponent},
    {path: 'signup', component: SignUpComponent},
];
