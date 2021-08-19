import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRIMARY_OUTLET } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DishDetail } from 'src/app/interfaces/dish-detail';
import { DishServiceService } from '../dishService/dish-service.service';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  private shopCart: DishDetail[] = []; // ne treba mi?

  _shopCart: BehaviorSubject<Array<DishDetail>> = new BehaviorSubject<Array<DishDetail>>(null);
  //myOrders: BehaviorSubject<Array<Dish

  constructor(private userService: UserService, private http: HttpClient, private storageService: StorageService, private toastControler: ToastController) {
    this.getCart();
    
  }

  async getCart() {
    

    let rez = await this.storageService.getData("cart");
    console.log("naden cart");
    if (rez) {
      console.log("naden cart2");
      this.shopCart = rez;
    }
    else {
      this.shopCart = [];
    }
    this._shopCart.next(this.shopCart);
  }

  addToCart(meal: DishDetail) {
    const x: DishDetail = Object.assign({}, meal);
    const tempOrders = this._shopCart.getValue();
    const index = tempOrders.findIndex(o => o.DishId === meal.DishId && o.day === meal.day);

    if (index === -1) {
      delete x.incart;
      tempOrders.push(x);

    }
    else {
      tempOrders.splice(index, 1);
    }
    this._shopCart.next(tempOrders);
    this.storageService.setData("cart", tempOrders);


    // await this.getCart();
    // this.shopCart.push(meal);
    // this.storageService.setData("cart", this.shopCart);
    // this._shopCart.next(this.shopCart);
    console.log("dodano");
    console.log(meal);

    return (index === -1);
  }

  orderCart() {
    for (let order of this._shopCart.getValue()) {
      this.placeOrder(order.DishId, order.day);
    }


    this.shopCart = [];
    this._shopCart.next([]);
    this.storageService.removeData("cart");

    this.presentToast("Order Confirmed");
    //this.shopCart = this.shopCart.filter(o => o.DishId!=order.DishId && o.day!=order.day); //ne znam je valja uvjet
    //this._shopCart.next(this.shopCart);
  }

  async presentToast(s :string) {
    const toast = await this.toastControler.create({
      message: s,
      duration: 2000,
      color: 'primary',
    })
    toast.present();
  }

  placeOrder(dishID: number, day: number) {
    this.placeOrderFinal(this.userService._user.getValue().userId, dishID, day);
    
    
  }

  async placeOrderFinal(userID: number, dishID: number, day: number) {
    console.log("trejtngdrkg");

    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spOrder",
          "params": {
            "userid": userID,
            "dishid": dishID,
            "day": day
          }
        }
      ]
    }).subscribe((res: any) => {
      console.log(res);
    });
  }

  makeOrderBody() {

  }

  getMyOrders() {
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spOrdersQuery",
          "params": {
            "action": "forUser",
            "userid": this.userService._user.getValue().userId,
          }
        }
      ]
    }).subscribe((res: any) => {
      console.log(("orders begin"));
      console.log(res);
      console.log("orders end");
      
    });
  }

  // async finishOrder(){
  //   const order = this._shopCart.getValue()[0];
  //   await this.http.post(this.url, {
  //     "db": "Food",
  //     "queries": [
  //       {
  //         "query": "spOrder",
  //           "params": {
  //               "userid": this.userService.user.userId,
  //               "dishid": order.DishId,
  //               "day": order.day,
  //           }
  //       }
  //     ]
  //   }).toPromise();
  // }
}
