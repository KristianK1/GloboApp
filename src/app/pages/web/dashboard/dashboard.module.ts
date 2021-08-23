import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';

import { DashMealQComponent } from 'src/app/components/dash-meal-q/dash-meal-q.component';
import { ComponentsModule } from 'src/app/components/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
