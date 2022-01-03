import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewChemicalModalComponent } from '../modal/new-chemical-modal/new-chemical-modal.component';
import { AddChemicalModalComponent } from '../modal/add-chemical-modal/add-chemical-modal.component';
import { RemoveChemicalModalComponent } from '../modal/remove-chemical-modal/remove-chemical-modal.component';
import { getChemicals } from "../apiServices/chemicalService";
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  modals;
  chemicals;
  constructor(public modalController: ModalController) {
    this.modals = {
      "new": NewChemicalModalComponent,
      "add": AddChemicalModalComponent,
      "remove": RemoveChemicalModalComponent
    }
    getChemicals().then(res => {
      this.chemicals = res.data;
    }).catch(err => {
      console.log(err);
      this.chemicals = [];
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

}
