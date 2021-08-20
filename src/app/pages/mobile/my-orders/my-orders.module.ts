import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOrdersPageRoutingModule } from './my-orders-routing.module';

import { MyOrdersPage } from './my-orders.page';
import { OrderComponent } from 'src/app/components/order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOrdersPageRoutingModule
  ],
  declarations: [MyOrdersPage, OrderComponent]
})
export class MyOrdersPageModule {}
