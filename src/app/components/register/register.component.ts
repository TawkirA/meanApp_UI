import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TokenPayload } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    email: "",
    name: "",
    password: ""
  }

  constructor(private authServ: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.authServ.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl("/profile");
    }, 
    err => {
      console.log(err);
    });
  }

}
