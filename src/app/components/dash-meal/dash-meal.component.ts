import { Component, Input, OnInit } from '@angular/core';
import { DishDetail } from 'src/app/interfaces/dish-detail';

@Component({
  selector: 'app-dash-meal',
  templateUrl: './dash-meal.component.html',
  styleUrls: ['./dash-meal.component.scss'],
})
export class DashMealComponent implements OnInit {
  @Input() order: DishDetail;
  @Input() dishSelected: boolean;

  imgSrc: string="";
  jeloName: string="";
  jeloDes: string="";


  constructor() { }

  ngOnInit() {
    this.imgSrc=this.order.des.split('|')[0];
    //this.imgSrc="assets/images/jelo1.png";
    this.jeloName=this.order.Name;
    this.jeloDes= "Salata: "+this.order.soup + "  Bread: " + this.order.bread +" Supa: " + this.order.soup;
  }

}
