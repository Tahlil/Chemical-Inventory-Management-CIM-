import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-chemical-modal',
  templateUrl: './new-chemical-modal.component.html',
  styleUrls: ['./new-chemical-modal.component.scss'],
})
export class NewChemicalModalComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss('Cancel');
  }

}
