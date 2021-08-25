import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDishPageRoutingModule } from './new-dish-routing.module';

import { NewDishPage } from './new-dish.page';
import { FilepippeModule } from 'src/app/components/filepippe/filepippe.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDishPageRoutingModule,
    FilepippeModule
  ],
  declarations: [NewDishPage]
})
export class NewDishPageModule {}
