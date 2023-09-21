import { NavbarComponent } from './../navbar/navbar.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/util.css'],
})
export class RegisterComponent implements OnInit {
  userData = {
    firstName: '',
    lastName: '',
    nationality: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  errorMessages: string[] = [];

  nations: any[] | undefined = [];

  ngOnInit(): void {
    this.nations = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ];
  }

  onSubmit() {
    // Qui puoi inserire la logica per gestire la sottomissione del modulo
  }
}
