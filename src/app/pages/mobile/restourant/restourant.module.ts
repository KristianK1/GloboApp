import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestourantPageRoutingModule } from './restourant-routing.module';

import { RestourantPage } from './restourant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestourantPageRoutingModule
  ],
  declarations: [RestourantPage]
})
export class RestourantPageModule {}
