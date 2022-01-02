import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewChemicalModalComponent } from '../modal/new-chemical-modal/new-chemical-modal.component';
import { AddChemicalModalComponent } from '../modal/add-chemical-modal/add-chemical-modal.component';
import { RemoveChemicalModalComponent } from '../modal/remove-chemical-modal/remove-chemical-modal.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  modals;
  constructor(public modalController: ModalController) {
    this.modals = {
      "new": NewChemicalModalComponent,
      "add": AddChemicalModalComponent,
      "remove": RemoveChemicalModalComponent
    }
  }

  ngOnInit() {
  }

  async openModal(modalType:string) {
    console.log("Opening modal: ");
    
    console.log(modalType);
    
    let ModalComponent = this.modals[modalType];
    const modal = await this.modalController.create({
      component: ModalComponent,
    });
    return await modal.present();
  }

}
