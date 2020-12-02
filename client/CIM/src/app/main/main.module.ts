import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    TooltipModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
