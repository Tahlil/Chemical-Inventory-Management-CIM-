import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { importChemicals } from 'src/app/apiServices/chemicalService';

@Component({
  selector: 'app-add-csv-modal',
  templateUrl: './add-csv-modal.component.html',
  styleUrls: ['./add-csv-modal.component.scss'],
})
export class AddCsvModalComponent implements OnInit {

  private file: File;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss('Cancel');
  }

  onFileChange(event:any){
    this.file = event.target.files[0];  
  }

  async submitCsv(){
    let formData = new FormData();
    formData.append('file', this.file);
    let res = await importChemicals(formData);
    if (res.status == 200) {
      await this.modalController.dismiss('Success');
      window.location.reload();
    }
    await this.modalController.dismiss('Cancel');
  }

}
