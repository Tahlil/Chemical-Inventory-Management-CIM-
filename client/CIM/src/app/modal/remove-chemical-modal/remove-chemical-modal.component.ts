import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-remove-chemical-modal',
  templateUrl: './remove-chemical-modal.component.html',
  styleUrls: ['./remove-chemical-modal.component.scss'],
})
export class RemoveChemicalModalComponent implements OnInit {

  quantity: number;

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
    console.log(this.quantity);
    
    await this.modalController.dismiss('Cancel');
  }

}
