import axios from "axios";
import { APIs } from "../configs/config";

let apiUrls = new APIs();

export function adminSignIn(username, password) {
    return axios.post(apiUrls.adminLoginAPI, {
      username: username,
      password: password,
    });
  }

export function getUnapproved() {
  return axios.get(apiUrls.getUnapprovedAPI);
}

export function approveOne(unapproved: any) {
  return axios.post(apiUrls.adminApproveAPI, {
    username: unapproved.username,
  });
}

export function unapproveOne(unapproved: any) {
  return axios.post(apiUrls.adminUnapproveAPI, {
    username: unapproved.username,
  });
}