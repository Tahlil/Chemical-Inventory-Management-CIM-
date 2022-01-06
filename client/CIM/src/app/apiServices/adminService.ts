import axios from "axios";
import { APIs } from "../configs/config";

let apiUrls = new APIs();

export function adminSignIn(username, password) {
    return axios.post(apiUrls.adminLoginAPI, {
      username: username,
      password: password,
    });
  }