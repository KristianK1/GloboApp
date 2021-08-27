import { Component, OnInit } from '@angular/core';
import { DishDetail } from 'src/app/interfaces/dish-detail';
import { Order } from 'src/app/interfaces/order';
import { CartService } from 'src/app/services/cart/cart.service';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  myOrders: Array<DishDetail> = [];


  constructor(private cartService: CartService, private restService: RestServiceService) { }

  ngOnInit() {
    this.cartService.getMyOrders();

    this.cartService.myOrders.subscribe(val => {
      if(val){
      this.myOrders=val;
      this.myOrders=this.orderAddDescription(this.myOrders);
      console.log("nove vrijednosti myOrdersPagea");
      //console.log(val);
      }
    });
  }

  orderAddDescription(orders: Array<DishDetail>): Array<DishDetail>{
    let allDishes = this.restService._dishDetails.getValue();
    console.log(orders);
    for(let order of orders){
      for(let dish of allDishes){
        if(order.Name===dish.Name){
          order.des=dish.des;
          break;
        }
      }
    }
    return orders;
  }

}
