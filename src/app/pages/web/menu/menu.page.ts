import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DishDetail } from 'src/app/interfaces/dish-detail';
import { GetAllMenusResult } from 'src/app/interfaces/get-all-menus-result';
import { Order } from 'src/app/interfaces/Order';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';
//import { DashMealComponent } from 'src/app/components/dash-meal/dash-meal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  currentDay: number = 1;
  days: Array<number> = [1, 2, 3, 4, 5];
  daysHrv: string[] = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
  daysNames: string[] = ["PON", "UTO", "SRI", "ČET", "PET"];

  searchStr: string = "";

  mealsGrid1: Array<Order> = [];
  mealsGrid2: Array<Order> = [];


  meals1: Array<DishDetail> = [];
  meals2: Array<DishDetail> = [];

  totalMeal: Array<DishDetail> = [];

  searchedMeals: Array<DishDetail> = [];

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  constructor(private restService: RestServiceService, private http: HttpClient) { }

  ngOnInit() {
    //podesit mealove odma
    this.restService._dishDetails.subscribe(val => {
      this.updateStuff(val);
    });
  }

  updateStuff(val: Array<DishDetail>) {
    if(val)
      this.totalMeal = val;

    this.searchedMeals = this.totalMeal.filter(o => o.Name.includes(this.searchStr));
    
    
    this.meals1 = [];
    //this.meals1 = this.meals1.filter(o => o.dan == this.daysHrv[this.currentDay]);  //zgazeno
    this.meals2 = this.searchedMeals.filter(o => o.day == this.currentDay);

    for (let i: number = 0; i < this.searchedMeals.length; i++) {
      let ima: boolean = false;

      for (let j: number = 0; j < this.meals1.length || this.meals1.length == 0; j++) {
        if (this.meals1.length == 0) {
          ima = false;
          break;
        }

        if (this.searchedMeals[i].DishId == this.meals1[j].DishId) {
          ima = true;
        }
      }
      for (let j: number = 0; j < this.meals2.length; j++) {

        if (this.searchedMeals[i].DishId == this.meals2[j].DishId) {
          ima = true;
        }
      }
      if (ima == false) {
        this.meals1.push(this.searchedMeals[i]);
        //break;
      }
    }
    this.meals1 = this.meals1.filter(o => o.day != this.currentDay);

    this.mealsGrid1 = this.meal2order(this.meals1);
    this.mealsGrid2 = this.meal2order(this.meals2);
  }

  changeDay(d: number) {

    console.log(d);
    this.currentDay = d;
    this.updateStuff(this.restService._dishDetails.getValue())
    // this.orders = this.restService._orders.getValue();
    // console.log("ovdje");
    // if (this.orders != null) {
    //   this.orders=this.orders.filter(o => o.dan == this.daysHrv[this.currentDay]);
    //   console.log(this.orders);
    // }
  }


  meal2order(meals: Array<DishDetail>): Array<Order> {
    let ret: Array<Order> = [];
    for (let meal of meals) {
      let temp: Order = {
        dan: null,
        restoranid: null,
        userurestoranuid: null,
        restoran: null,
        jelo: meal.Name,
        soup: meal.soup,
        Salad: meal.salad,
        bread: meal.bread,
        narucitelj: null,
        firmaid: null,
        naruciteljid: null,
        firma: null,
      }

      ret.push(temp);
    }
    return ret;
  }

  deleteDay(id: number) {
    console.log("brisem" + id);
    this.restService.deleteFromDay(id, this.currentDay);
    this.restService._dishDetails.getValue();
    //console.log(this.meals1);
    //console.log(this.meals2);
    //this.restService.initCompanyUsers();

  }

  addDay(id: number) {
    this.restService.addToDay(id, this.currentDay);
    this.restService._dishDetails.getValue();
    //this.restService.initCompanyUsers();
    //console.log(this.meals1);
    //console.log(this.meals2);

  }

  search() {
    console.log("search input changed" + this.searchStr);
    this.updateStuff(null);
  }
}