import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-dash-meal-q',
  templateUrl: './dash-meal-q.component.html',
  styleUrls: ['./dash-meal-q.component.scss'],
})
export class DashMealQComponent implements OnInit {
  @Input() order: Order;

  imgSrc: string;
  jeloName: string;
  jeloDes: string = "";
  KompIme: string;
  quantity: string = "";
  constructor() { }

  ngOnInit() {
    console.log(this.order);
    
    //this.imgSrc=this.order..split('|')[0];
    
    //this.imgSrc = "assets/images/jelo1.png";
    this.jeloName = this.order.jelo;


    if (!!this.order.bread) this.jeloDes += " kruh,"
    if (!!this.order.soup) this.jeloDes += " juha,"
    if (!!this.order.Salad) this.jeloDes += " salata,";

    if (this.jeloDes != "") this.jeloDes = "Uz jelo ide" + this.jeloDes;

    if (!!this.order.firma) {
      this.KompIme = "Kompanija: " + this.order.firma;
    }
    else if (!!this.order.narucitelj) {
      this.KompIme = "Ime naručitelja: " + this.order.narucitelj;
    }

    this.quantity = this.order.quantity.toString();

    if (this.order.quantity == 1 || (this.order.quantity > 20 && this.order.quantity % 10 == 1)) {
      this.quantity += " narudžba";
    }
    else if (this.order.quantity % 10 >= 5 || this.order.quantity%10==0 || (this.order.quantity>=10 && this.order.quantity<=20)) {
      this.quantity += " narudžbi";
    }
    else if (this.order.quantity % 10 >= 1 && this.order.quantity % 10 < 5) {
      this.quantity += " narudžbe";
    }
    
  }
}
