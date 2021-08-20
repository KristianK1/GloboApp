import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  Norders: number;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService._shopCart.subscribe((val:any) =>{
      if(val){
        this.Norders=val.length;
      }
    });

  }

}
