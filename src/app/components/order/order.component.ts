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
  options: string ="";

  daysName : string[] = ["PON","UTO","SRI", "ČET","PET"];
  
  constructor() { }

  ngOnInit() {
    console.log(this.order);
    
    if(this.order.des){
      this.imgSrc=this.order.des.split('|')[0];
      this.jeloDes=this.order.des.split('|')[1];
    }
      if(this.imgSrc.includes("https")==false){
        this.imgSrc="https://firebasestorage.googleapis.com/v0/b/globoapp-19383.appspot.com/o/filesStorage%2Fjelo1.png?alt=media&token=22185d0d-5374-47ba-8cf2-d52b1cd29f09";
        this.jeloDes=this.order.des;
    }

    this.jeloName=this.order.Name;
    
    if (!!this.order.bread) this.options += " kruh,"
    if (!!this.order.soup) this.options += " juha,"
    if (!!this.order.salad) this.options += " salata,";
    

      if (this.options != "") this.options = "Uz jelo ide" + this.options;
    this.jeloDay=this.daysName[this.order.day-1];

  }

}
