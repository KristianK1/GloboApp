import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishDetail } from 'src/app/interfaces/dish-detail';
import { CartService } from 'src/app/services/cart/cart.service';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';

@Component({
  selector: 'app-restourant',
  templateUrl: './restourant.page.html',
  styleUrls: ['./restourant.page.scss'],
})
export class RestourantPage implements OnInit {

  currentDay: number = 1;
  days: Array<number> = [1, 2, 3, 4, 5];
  daysHrv: string[] = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
  daysNames: string[] = ["PON", "UTO", "SRI", "ČET", "PET"];

  currentRestID: number;
  currentRestName: string;

  allDishes: DishDetail[] = [];
  dishesDay: DishDetail[] = [];

  cartField : DishDetail[] = [];

  constructor(private route: ActivatedRoute, private restService: RestServiceService, private cartService: CartService) { }

  ngOnInit() {
    // this.days=Days;
    this.route.queryParams.subscribe(params => {
      console.log(params.id);
      this.currentRestID = params.id;
      this.currentRestName = this.getRestName();

      this.cartService._shopCart.subscribe(storage =>{
        this.cartField=storage;
        console.log(this.cartField);
      });
      //ovdje mozda se subscribat na cartService behavrial
    });
    this.allDishes = this.cartService._shopCart.getValue(); //idk makni ovo u slucaju bugova
    this.askforDishDetail();

    this.restService._dishDetails.subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.allDishes = res;
        this.setTodayArray();
      }
    });
  }

  askforDishDetail() {
    this.restService.getDishesCompany(this.currentRestID);  //ovo izade na subscribe od dishdetalisa. (nginit)
  }




  changeDay(d: number) {
    this.currentDay = d;
    this.setTodayArray();
  }

  setTodayArray() {
    this.dishesDay = this.allDishes.filter(o => o.day == this.currentDay);
    this. dishesDay = this.dishesDay.map(dish =>{
      dish.incart = !!this.cartField.find(o => o.day === dish.day && o.DishId === dish.DishId);
      return dish;
    });
    //console.log(this.allDishes);
    //console.log(this.dishesDay);
  }

  getRestName(): string {
    return this.restService._allRestaurants.getValue().filter(o => o.companyId == this.currentRestID)[0].name;
  }

  addToCart(dish: DishDetail) {
    console.log(dish);
    dish.incart=this.cartService.addToCart(dish);
  }


  
}
