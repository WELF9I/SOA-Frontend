import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  erreur: number= 0;
  user = new User();
  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  onLoggedin() {
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user);
    console.log("Is valid user:", isValidUser);
    if (isValidUser) {
      console.log("Attempting to navigate to /");
      this.router.navigate(['/']);
    } else {
      console.log("Login failed");
      this.erreur = 1;
    }
  }
}
