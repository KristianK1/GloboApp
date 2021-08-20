import { Component, Input, OnInit } from '@angular/core';
import { DishDetail } from 'src/app/interfaces/dish-detail';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  @Input() order: DishDetail;

  imgSrc: string="";
  jeloName: string="";
  jeloDes: string="";
  jeloDay: string="";

  daysName : string[] = ["PON","UTO","SRI", "ČET","PET"];
  
  constructor() { }

  ngOnInit() {
    this.imgSrc="assets/images/jelo1.png";
    this.jeloName=this.order.Name;
    this.jeloDes= "Salata: "+this.order.soup + "  Bread: " + this.order.bread +" Supa: " + this.order.soup;
    this.jeloDay=this.daysName[this.order.day-1];

  }

}
