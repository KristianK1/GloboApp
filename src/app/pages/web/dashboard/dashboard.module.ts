import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

import { DashMealComponent } from 'src/app/components/dash-meal/dash-meal.component';
import { WeekBarComponent } from 'src/app/components/week-bar/week-bar.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage, DashMealComponent, WeekBarComponent],
})
export class DashboardPageModule {}
