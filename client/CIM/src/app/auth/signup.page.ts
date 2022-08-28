import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

import { signUp } from '../apiServices/accountService';



@Component({
  selector: 'app-auth',
  templateUrl: './signup.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class SignUpPage implements OnInit {
  selectedType: string;
  firstName: string;
  lastName: string;
  position: string;
  password: string;
  username: string;
  
  constructor(private router: Router) { 
    this.selectedType = "";
    this.firstName = "";
    this.lastName = "";
    this.position = "";
    this.password = "";
    this.username = "";
  }

  ngOnInit() {
    
  }

  async signUp() {
    let response = await signUp(this.username, this.password, this.selectedType, this.firstName, this.lastName, this.position);
    if (response.status == 200) {
      this.router.navigate(["/home"]);
    }
  }

}
