import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { removeChemical } from 'src/app/apiServices/chemicalService';

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
    let removeQuantity = Math.min(parseFloat(this.quantity), this.chemical.quantity);
    let res = await removeChemical(this.chemical, removeQuantity);
    console.log(res);
    if(res.status == 200){
      this.chemical.quantity -= removeQuantity;
      await this.modalController.dismiss('Success');
    }

    await this.modalController.dismiss('Cancel');
  }

}
