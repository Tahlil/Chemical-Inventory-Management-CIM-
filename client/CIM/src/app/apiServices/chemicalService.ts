import axios from "axios";
import { APIs } from "../configs/config";

export function getChemicals() {
  let apiUrls = new APIs();
  return axios.get(apiUrls.chemicalListAPI);
}