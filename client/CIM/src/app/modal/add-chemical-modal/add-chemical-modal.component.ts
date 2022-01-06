import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { addChemical } from 'src/app/apiServices/chemicalService';
@Component({
  selector: 'app-add-chemical-modal',
  templateUrl: './add-chemical-modal.component.html',
  styleUrls: ['./add-chemical-modal.component.scss'],
})
export class AddChemicalModalComponent implements OnInit {

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

  async addChemical(){
    let response = await addChemical(this.chemical, this.quantity);
    if (response.status == 200) {
      this.chemical.quantity += parseFloat(this.quantity);
      await this.modalController.dismiss('Success');
      return;
    }
    await this.modalController.dismiss('Cancel');
  }

}
