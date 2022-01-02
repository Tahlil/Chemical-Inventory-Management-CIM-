import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-chemical-modal',
  templateUrl: './add-chemical-modal.component.html',
  styleUrls: ['./add-chemical-modal.component.scss'],
})
export class AddChemicalModalComponent implements OnInit {

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

  async addChemical(){
    console.log(this.quantity);
    
    await this.modalController.dismiss('Cancel');
  }

}
