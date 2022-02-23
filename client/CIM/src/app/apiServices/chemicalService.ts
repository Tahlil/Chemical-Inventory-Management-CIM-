import axios from "axios";
import { APIs } from "../configs/config";

let apiUrls = new APIs();

export function getChemicals() {
  
  return axios.get(apiUrls.chemicalListAPI);
}

export function addChemical(chemical: any, addQuantity: any) {
  return axios.get(apiUrls.chemicalAddAPI, {
    params: {
      casNumber: chemical.casNumber,
      place: chemical.place,
      quantity: parseFloat(addQuantity),
    }
  });
}

export function removeChemical(chemical: any, removeQuantity: any) {
  return axios.get(apiUrls.chemicalTakeAPI, {
    params: {
      casNumber: chemical.casNumber,
      place: chemical.place,
      quantity: parseFloat(removeQuantity),
    }
  });
}

export function deleteChemical(chemical: any) {
  return axios.post(apiUrls.chemicalRemoveAPI, chemical);
}

export function importChemicals(formData: any) {
  return axios.post(apiUrls.chemicalCSVImportAPI, formData, {headers: {'Content-Type': 'multipart/form-data'}});
}

export function newChemical(chemical: any) {
  return axios.post(apiUrls.chemicalCreateAPI, chemical);
}