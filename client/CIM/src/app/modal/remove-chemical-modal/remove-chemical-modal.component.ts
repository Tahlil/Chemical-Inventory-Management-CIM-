import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { removeChemical } from 'src/app/apiServices/chemicalService';
import { APIs } from '../../configs/config';
@Component({
  selector: 'app-remove-chemical-modal',
  templateUrl: './remove-chemical-modal.component.html',
  styleUrls: ['./remove-chemical-modal.component.scss'],
})
export class RemoveChemicalModalComponent implements OnInit {

  quantity: string;

  @Input('chemical') chemical;
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss('Cancel');
  }

  onQuantityChange(event:any){
    this.quantity = event.detail.value;  
  }

  async removeChemical(){
    let api = new APIs();
    let url = api.chemicalRemoveAPI + `?casNumber=${this.chemical.casNumber}&quantity=${this.quantity}&place=${this.chemical.place}`;
    window.open(url, '_blank');
    this.chemical.quantity += parseFloat(this.quantity);
    await this.modalController.dismiss('Cancel');
  }

}
