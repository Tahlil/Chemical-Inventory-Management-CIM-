import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-chemical-modal',
  templateUrl: './new-chemical-modal.component.html',
  styleUrls: ['./new-chemical-modal.component.scss'],
})
export class NewChemicalModalComponent implements OnInit {

  name: string;
  casNumber: string;
  sds: string;
  unitType: string;
  quantity: number;
  place: string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss('Cancel');
  }
  // event:any,value:any){
  //   console.log(event.detail.data)
  onNameChange(event:any){
    this.name = event.detail.value;  
  }

  onCASNumberChange(event:any){
    this.casNumber = event.detail.value;  
  }

  onSDSChange(event:any){
    this.sds = event.detail.value;  
  }

  onUnitTypeChange(event:any){
    this.unitType = event.detail.value;  
  }

  onQuantityChange(event:any){
    this.quantity = event.detail.value;  
  }

  onPlaceChange(event:any){
    this.place = event.detail.value;  
  }

  async addNewChemical() {
    console.log("Adding new chemical.");
    console.log(this.name, this.casNumber, this.sds, this.unitType, this.quantity, this.place);
    await this.modalController.dismiss('Cancel');
  }

}
