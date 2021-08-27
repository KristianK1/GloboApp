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

  imgSrc: string = "";
  jeloName: string = "";
  jeloDes: string = "";


  constructor() { }

  ngOnInit() {
    if (!!this.order.des) {
      this.imgSrc = this.order.des.split('|')[0];
    }
    if (this.imgSrc.includes("https") == false){
      this.imgSrc = "https://firebasestorage.googleapis.com/v0/b/globoapp-19383.appspot.com/o/filesStorage%2Fjelo1.png?alt=media&token=22185d0d-5374-47ba-8cf2-d52b1cd29f09";
    }
    this.jeloName = this.order.Name;
    this.jeloDes = "Salata: " + this.order.soup + "  Bread: " + this.order.bread + " Supa: " + this.order.soup;
  }

}
