import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashMealComponent } from '../dash-meal/dash-meal.component';
import { DashMealQComponent } from '../dash-meal-q/dash-meal-q.component';
import { OrderComponent } from '../order/order.component';


@NgModule({
  declarations: [
    DashMealComponent,
    DashMealQComponent,
    OrderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashMealComponent,
    DashMealQComponent,
    OrderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
