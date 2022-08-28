import { Component, OnInit } from '@angular/core';
import { adminSignIn } from '../apiServices/adminService';

@Component({
  selector: 'app-auth',
  templateUrl: './admin.signin.page.html',
  styleUrls: ['./admin.signin.page.scss'],
})
export class AdminSignInPage implements OnInit {
  constructor() { }
  username: string;
  password: string;

  onUsernameChange(event: any) {
    this.username = event.detail.value;
  }

  onPasswordChange(event: any) {
    this.password = event.detail.value;
  }

  async signIn() {
    let res = await adminSignIn(this.username, this.password);
    if (res.status === 200) {
      window.location.href = "/admin";
    }
  }

  ngOnInit() {
  }

}
