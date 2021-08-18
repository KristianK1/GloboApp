import { Component, OnInit } from '@angular/core';
import { DishDetail } from 'src/app/interfaces/dish-detail';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(private cartService: CartService) { }

  displayOrders: DishDetail[] = [];
  ngOnInit() {
    this.cartService._shopCart.subscribe(val =>{
      this.displayOrders = val;
    })
  }

}
