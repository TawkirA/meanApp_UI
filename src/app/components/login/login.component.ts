import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TokenPayload } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: ''
  }

  constructor(private authServ: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authServ.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl("/profile");
    }, 
    err => {
      console.log(err);
    });
  }

}
