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
  chemicals = [
    {
      name: 'Carbon',
      casNumber: '7440-44-0',
      place: "A3 S1 R11",
      quantity: '11 g',
      sds: 'https://www.osha.gov/sites/default/files/publications/OSHA3514.pdf'
    },
    {
      name: 'Zinc Salfate',
      casNumber: '7446-19-7',
      place: "D3 S1 R11",
      quantity: '2.2 ml',
      sds: 'https://www.osha.gov/sites/default/files/publications/OSHA3514.pdf'
    },
    {
      name: 'Carbon di oxide',
      casNumber: '7440-44-0',
      place: "C3 S1 R1",
      quantity: '11 g',
      sds: 'https://www.osha.gov/sites/default/files/publications/OSHA3514.pdf'
    },
    {
      name: 'Carbon (Graphite)',
      casNumber: '7440-44-0',
      place: "B3 S1 R11",
      quantity: '11.3 g',
      sds: 'https://www.osha.gov/sites/default/files/publications/OSHA3514.pdf'
    },
    {
      name: 'Carbon',
      casNumber: '7440-44-0',
      place: "C3 S1 R11",
      quantity: '13.5 g',
      sds: 'https://www.osha.gov/sites/default/files/publications/OSHA3514.pdf'
    },
    // 
  ];
  constructor(public modalController: ModalController) {
    this.modals = {
      "new": NewChemicalModalComponent,
      "add": AddChemicalModalComponent,
      "remove": RemoveChemicalModalComponent
    }
    // this.chemicals= await
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
