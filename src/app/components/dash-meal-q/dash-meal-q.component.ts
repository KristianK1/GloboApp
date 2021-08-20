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
  jeloDes: string;

  constructor() { }

  ngOnInit() {
    console.log("hello");
    
    this.imgSrc = "assets/images/jelo1.png";
    this.jeloName = this.order.jelo;
    this.jeloDes = "Salata: "+this.order.Salad + "  Bread: " + this.order.bread +" Supa: " + this.order.soup;
  }
}
