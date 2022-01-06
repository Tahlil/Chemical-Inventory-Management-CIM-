import axios from "axios";
import { APIs } from "../configs/config";

let apiUrls = new APIs();

export function getChemicals() {
  
  return axios.get(apiUrls.chemicalListAPI);
}

export function addChemical(chemical, addQuantity) {
  return axios.post(apiUrls.chemicalAddAPI, {
    casNumber: chemical.casNumber,
    place: chemical.place,
    quantity: parseFloat(addQuantity),
  });
}

export function removeChemical(chemical, removeQuantity) {
  return axios.post(apiUrls.chemicalTakeAPI, {
    casNumber: chemical.casNumber,
    place: chemical.place,
    quantity: parseFloat(removeQuantity),
  });
}

export function deleteChemical(chemical) {
  return axios.post(apiUrls.chemicalRemoveAPI, chemical);
}

export function importChemicals(formData) {
  return axios.post(apiUrls.chemicalCSVImportAPI, formData, {headers: {'Content-Type': 'multipart/form-data'}});
}

export function newChemical(chemical) {
  return axios.post(apiUrls.chemicalCreateAPI, chemical);
}