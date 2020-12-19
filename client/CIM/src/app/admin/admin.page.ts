import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../services/auth-service.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  unapproved:[];
  constructor(authServiceService:AuthServiceService) { 
    this.getUnapproved()
  }

  ngOnInit() {
  }

  getUnapproved(){
    // this.AuthServiceService.getApprovalRequest().subscribe(data =>{
    //   console.log("Unapproved: ");
      
    //   console.log(data);
      
    // });    
  }

}
