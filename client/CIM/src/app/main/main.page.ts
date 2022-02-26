import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewChemicalModalComponent } from '../modal/new-chemical-modal/new-chemical-modal.component';
import { AddChemicalModalComponent } from '../modal/add-chemical-modal/add-chemical-modal.component';
import { RemoveChemicalModalComponent } from '../modal/remove-chemical-modal/remove-chemical-modal.component';
import { AddCsvModalComponent } from '../modal/add-csv-modal/add-csv-modal.component';
import { getChemicals } from "../apiServices/chemicalService";
import { APIs } from '../configs/config';
import { deleteChemical } from "../apiServices/chemicalService";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  modals;
  chemicals;
  filteredChemicals: any[];
  searchText: string;
  constructor(public modalController: ModalController) {
    this.modals = {
      "new": NewChemicalModalComponent,
      "add": AddChemicalModalComponent,
      "remove": RemoveChemicalModalComponent,
      "add-csv": AddCsvModalComponent,
    }
    getChemicals().then(res => {
      this.chemicals = res.data;
      this.filteredChemicals = res.data;
    }).catch(err => {
      console.log(err);
      this.chemicals = [];
      this.filteredChemicals = [];
    });
  }

  ngOnInit() {
  }

  async openModal(modalType:string, chemical) {
    console.log("Opening modal: ");
    
    console.log(modalType);
    console.log(chemical);
    
    
    let ModalComponent = this.modals[modalType];
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {chemical: chemical}
    });
    return await modal.present();
  }

  async deleteChemical(chemical){
    let response  = await deleteChemical(chemical);
    if(response.status == 200){
      this.chemicals = this.chemicals.filter(c => c.casNumber != chemical.casNumber);
      let searchText = this.searchText;
      if (searchText == ""){
        this.filteredChemicals = this.chemicals;
      }
      this.filteredChemicals = this.chemicals.filter(chemical => {
        return chemical.casNumber.includes(searchText) || chemical.name.includes(searchText) || chemical.place.includes(searchText);
      });
    }
  }

  search(event: any){
    let searchText = event.detail.value;
    if (searchText == ""){
      this.filteredChemicals = this.chemicals;
    }
    this.filteredChemicals = this.chemicals.filter(chemical => {
      return chemical.casNumber.includes(searchText) || chemical.name.includes(searchText) || chemical.place.includes(searchText);
    });
  }

  async exportCSV() {
    let api = new APIs();
    let url = api.chemicalCSVExportAPI;
    window.location.href = url;
  }

}
