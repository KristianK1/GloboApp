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
  day: number = 1;

  dani: string[] = ["Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];


  orders: Array<Order> = [];
  _orders: BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>(null);

  constructor(private restService: RestServiceService) {

  }

  ngOnInit() {
    this.restService._orders.subscribe(val => {
      console.log("promjena vrijednosti ordera", val);

      this.orders = val;
      this.orders=this.orders.filter(o => o.jelo == "Hamburger");  //zgazeno
      console.log(this.orders.length);

    });
  }
  ChangeDay(d: number) {
    this.day = d;
    this.orders = this._orders.getValue();

    this.orders.filter(o => o.dan == this.dani[this.day - 1]);
    console.log(this.orders.length);
  }


}
