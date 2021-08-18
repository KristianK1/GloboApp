import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/Order';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  currentDay: number = 1;
  days: Array<number>=[1,2,3,4,5];
  daysHrv: string[] = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
  daysNames: string[] = ["PON", "UTO", "SRI", "ČET", "PET"];

  orders: Array<Order> = [];
  searchedOrders: Array<Order> = [];
  //_orders: BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>(null);
  searchStr: string="";


  constructor(private restService: RestServiceService) {

  }

  ngOnInit() {
    this.currentDay=1;
    this.restService._orders.subscribe(val => {
     // console.log("promjena vrijednosti ordera", val);

      this.orders = val;
      this.orders = this.orders.filter(o => o.jelo.toLowerCase().includes(this.searchStr.toLowerCase()));
      
      this.orders = this.orders.filter(o => o.dan == this.daysHrv[this.currentDay-1]);  //zgazeno
      //console.log(this.orders.length);

    });
  }
  changeDay(d: number) {
    
    console.log(d);
    this.currentDay = d;
    this.orders = this.restService._orders.getValue();
    console.log("ovdje");
    if (this.orders != null) {
      this.orders = this.orders.filter(o => o.jelo.toLowerCase().includes(this.searchStr.toLowerCase()));
      this.orders=this.orders.filter(o => o.dan == this.daysHrv[this.currentDay-1]);
      console.log(this.orders);
    }
  }

  search(){
    this.changeDay(this.currentDay);
  }

}
