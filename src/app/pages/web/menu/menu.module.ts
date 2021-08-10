import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';

import { DashMealComponent } from 'src/app/components/dash-meal/dash-meal.component';
import { WeekBarComponent } from 'src/app/components/week-bar/week-bar.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage, WeekBarComponent, DashMealComponent]
})
export class MenuPageModule {}
