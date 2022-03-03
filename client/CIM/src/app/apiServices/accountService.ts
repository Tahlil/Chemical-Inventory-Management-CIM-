import axios from "axios";
import { APIs } from "../configs/config";

let apiUrls = new APIs();

export function signUp(username: string, password: string, userType: string, firstName: string, lastName: string, position: string): Promise<any> {
    return axios.post(apiUrls.registerAPI, {
      username: username,
      password: password,
      userType: userType,
      firstName: firstName,
      lastName: lastName,
      position: position
    });
  }