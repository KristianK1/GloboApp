import { Component, OnInit } from '@angular/core';
import { DishDetail } from 'src/app/interfaces/dish-detail';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  myOrders: Array<DishDetail> = [];


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getMyOrders();

    this.cartService.myOrders.subscribe(val => {
      this.myOrders=val;
      console.log("nove vrijednosti myOrdersPagea");
      console.log(val);
      
    });
  }

}
