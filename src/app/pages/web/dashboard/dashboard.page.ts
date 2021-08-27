import { Component, OnInit } from '@angular/core';
import { DishDetail } from 'src/app/interfaces/dish-detail';
import { Order } from 'src/app/interfaces/order';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';
import { __rest } from 'tslib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  currentDay: number = 1;
  days: Array<number> = [1, 2, 3, 4, 5];
  daysHrv: string[] = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
  daysNames: string[] = ["PON", "UTO", "SRI", "ČET", "PET"];

  orders: Array<Order> = [];
  tempOrders: Array<Order> = [];
  searchedOrders: Array<Order> = [];
  searchStr: string = "";


  constructor(private restService: RestServiceService) {

  }

  ngOnInit() {
    this.currentDay = 1;
    this.restService._orders.subscribe(val=> {
      // console.log("promjena vrijednosti ordera", val);
      this.makeOrdersForDisplay(val);
    });
  }

  changeDay(d: number) {

    this.currentDay = d;
    this.tempOrders = this.restService._orders.getValue();

    if (this.tempOrders != null) {
      this.makeOrdersForDisplay(this.tempOrders);
      return;
    }
    this.orders = [];
  }

  search() {
    this.changeDay(this.currentDay);
  }


  makeOrdersForDisplay(allOrders: Array<Order>) {
    allOrders= this.orderAddDescription(allOrders);
    allOrders = allOrders.filter(o => o.jelo.toLowerCase().includes(this.searchStr.toLowerCase()));
    allOrders = allOrders.filter(o => o.dan == this.daysHrv[this.currentDay - 1]);


    for (let order of allOrders) order.quantity = 1;

    for (let i = 0; i < allOrders.length; i++) {
      //allOrders[i].quantity=1;
      for (let j = i + 1; j < allOrders.length; j++) {
        if (allOrders[i].dan == allOrders[j].dan &&
          allOrders[i].naruciteljid == allOrders[j].naruciteljid &&
          allOrders[i].restoranid == allOrders[j].restoranid &&
          allOrders[i].jelo == allOrders[j].jelo) {

          allOrders[i].quantity = allOrders[i].quantity + allOrders[j].quantity;
          allOrders.splice(j, 1);
          j--;
        }
      }
    }


    this.orders = allOrders; //orders se ispisuje sa ngfor
  }

  orderAddDescription(orders: Array<Order>): Array<Order>{
    let ret: Array<DishDetail>=[];
    let allDishes = this.restService._dishDetails.getValue();

    for(let order of orders){
      for(let dish of allDishes){
        if(order.jelo===dish.Name){
          order.des=dish.des;
          break;
        }
      }
    }
    return orders;
  }
}
