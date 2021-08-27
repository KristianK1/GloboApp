import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-dash-meal-q',
  templateUrl: './dash-meal-q.component.html',
  styleUrls: ['./dash-meal-q.component.scss'],
})
export class DashMealQComponent implements OnInit {
  @Input() order: Order;

  imgSrc: string ="";
  jeloName: string ="";
  jeloDes: string = "";
  KompIme: string="";
  quantity: string = "";

  
  options: string ="";

  constructor() { }

  ngOnInit() {
    
    if(this.order.des){
      this.imgSrc=this.order.des.split('|')[0];
      this.jeloDes=this.order.des.split('|')[1];
    }
      if(this.imgSrc.includes("https")==false){
        this.imgSrc="https://firebasestorage.googleapis.com/v0/b/globoapp-19383.appspot.com/o/filesStorage%2Fjelo1.png?alt=media&token=22185d0d-5374-47ba-8cf2-d52b1cd29f09";
        this.jeloDes=this.order.des;
    }
    //this.imgSrc = "assets/images/jelo1.png";
    this.jeloName = this.order.jelo;

    if (!!this.order.bread) this.options += " kruh,"
    if (!!this.order.soup) this.options += " juha,"
    if (!!this.order.Salad) this.options += " salata,";
    

      if (this.options != "") this.options = "Uz jelo ide" + this.options;

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
