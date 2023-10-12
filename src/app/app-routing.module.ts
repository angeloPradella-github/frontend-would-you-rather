import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WouldYouRatherComponent } from './would-you-rather/would-you-rather.component';
import { HomeComponent } from './home/home.component';
import { GuessTheFactComponent } from './guess-the-fact/guess-the-fact.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppLoginLayoutComponent } from './app-login-layout/app-login-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { GoogleAuthRedirectComponent } from './google-auth-redirect/google-auth-redirect.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'would-you-rather', component: WouldYouRatherComponent },
      { path: 'guess-the-fact', component: GuessTheFactComponent },
      {
        path: 'user-profile',
        component: GuessTheFactComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'login',
    component: AppLoginLayoutComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'register',
    component: AppLoginLayoutComponent,
    children: [{ path: '', component: RegisterComponent }],
  },
  {
    path: 'auth-redirect',
    component: GoogleAuthRedirectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
