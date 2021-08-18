import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestourantPageRoutingModule } from './restourant-routing.module';

import { RestourantPage } from './restourant.page';
import { DashMealComponent } from 'src/app/components/dash-meal/dash-meal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestourantPageRoutingModule
  ],
  declarations: [RestourantPage, DashMealComponent]
})
export class RestourantPageModule {}
