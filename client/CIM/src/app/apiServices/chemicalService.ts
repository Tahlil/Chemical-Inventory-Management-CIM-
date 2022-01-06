import axios from "axios";
import { APIs } from "../configs/config";

export function getChemicals() {
  let apiUrls = new APIs();
  return axios.get(apiUrls.chemicalListAPI);
}

export function addChemical(chemical, addQuantity) {
  let apiUrls = new APIs();
  return axios.post(apiUrls.chemicalAddAPI, {
    casNumber: chemical.casNumber,
    place: chemical.place,
    quantity: parseFloat(addQuantity),
  });
}