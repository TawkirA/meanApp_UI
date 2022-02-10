import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details!: UserDetails;
  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.authServ.getProfile().subscribe(
      user => {
      this.details = user;
    },
    err => {
      console.log(err);
    });
  }

}
