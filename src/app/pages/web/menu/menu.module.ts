import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';

import { DashMealComponent } from 'src/app/components/dash-meal/dash-meal.component';
import { ComponentsModule } from 'src/app/components/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
