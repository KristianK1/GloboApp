import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginRPageRoutingModule } from './login-r-routing.module';

import { LoginRPage } from './login-r.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRPageRoutingModule
  ],
  declarations: [LoginRPage]
})
export class LoginRPageModule {}
