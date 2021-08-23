import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestourantPageRoutingModule } from './restourant-routing.module';

import { RestourantPage } from './restourant.page';
import { DashMealComponent } from 'src/app/components/dash-meal/dash-meal.component';
import { ComponentsModule } from 'src/app/components/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestourantPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RestourantPage]
})
export class RestourantPageModule {}
