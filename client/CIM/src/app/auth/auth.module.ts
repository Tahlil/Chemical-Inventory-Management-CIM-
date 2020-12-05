import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { SignUpPage } from './signup.page';
import { SignInPage } from './signin.page';
import { AdminSignInPage } from './admin.signin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule
  ],
  declarations: [SignUpPage, SignInPage, AdminSignInPage]
})
export class AuthPageModule {}
