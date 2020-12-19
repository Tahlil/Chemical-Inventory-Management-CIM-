import { Injectable } from "@angular/core";
import { APIs } from "../configs/config";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor(private apiURLs: APIs, private http: HttpClient) {}

  getApprovalRequest(){
    console.log("API::");
    
    console.log(this.apiURLs.adminGetUnapprovedAPI);
    
    return this.http.get(this.apiURLs.adminGetUnapprovedAPI);
  }

  requestApproval(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    position: string,
    userType: string
  ) {
    const data = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      position: position,
      userType: userType,
    };
    const config = {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    };
    return this.http.post(this.apiURLs.reqApprovalAPI, data, config);
  }

  login(username: string, password: string) {
    const data = { username: username, password: password };
    const config = {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    };
    return this.http.post(this.apiURLs.loginAPI, data, config);
  }

  adminLogin() {}
}
