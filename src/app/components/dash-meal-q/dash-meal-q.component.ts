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
  jeloDes: string ="";
  KompIme: string;
  constructor() { }

  ngOnInit() {
    console.log("hello");
    
    this.imgSrc = "assets/images/jelo1.png";
    this.jeloName = this.order.jelo;
    if(!!this.order.Salad) this.jeloDes +=" Salata: " + this.order.Salad;
    if(!!this.order.bread) this.jeloDes +=" Bread: "  + this.order.bread;
    if(!!this.order.soup) this.jeloDes +=" Supa: "   + this.order.soup;

    if(!!this.order.firma){
      this.KompIme="Kompanija: "+this.order.firma;
    }
    else if(!!this.order.narucitelj){
      this.KompIme="Ime naručitelja: "+this.order.narucitelj;
    }
  }
}
