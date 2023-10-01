import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';

import 'bootstrap/dist/js/bootstrap.js';
import { WouldYouRatherComponent } from './would-you-rather/would-you-rather.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FooterComponent } from './footer/footer.component';
import { GuessTheFactComponent } from './guess-the-fact/guess-the-fact.component';
import { LoginComponent } from './login/login.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AppLoginLayoutComponent } from './app-login-layout/app-login-layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { RegisterComponent } from './register/register.component';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    WouldYouRatherComponent,
    FooterComponent,
    GuessTheFactComponent,
    LoginComponent,
    AppLayoutComponent,
    AppLoginLayoutComponent,
    UserProfileComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ChipModule,
    FontAwesomeModule,
    HttpClientModule,
    TooltipModule,
    ProgressSpinnerModule,
    ButtonModule,
    MessagesModule,
    MenuModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
