import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DishDetail } from 'src/app/interfaces/dish-detail';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  private shopCart: DishDetail[] = []; // ne treba mi?

  _shopCart: BehaviorSubject<Array<DishDetail>> = new BehaviorSubject<Array<DishDetail>>(null);

  constructor(private userService: UserService, private http: HttpClient, private storageService: StorageService) {
    this.getCart();
  }

  async getCart() {
    let rez = await this.storageService.getData("cart");
    console.log("naden cart");
    if(rez){
      console.log("naden cart2");
      this.shopCart = rez;
    }
    else{
      this.shopCart=[];
    }
    this._shopCart.next(this.shopCart);
  }

  async addToCart(meal: DishDetail){
    await this.getCart();
    this.shopCart.push(meal);
    this.storageService.setData("cart", this.shopCart);
    this._shopCart.next(this.shopCart);
    console.log("dodano");
    console.log(meal);
  }

  orderCart(){
    for(let order of this.shopCart){
      this.placeOrder(order.DishId, order.day);
    }
    this.shopCart=[];
    this._shopCart.next([]);

      //this.shopCart = this.shopCart.filter(o => o.DishId!=order.DishId && o.day!=order.day); //ne znam je valja uvjet
      //this._shopCart.next(this.shopCart);
  }

  placeOrder(dishID: number, day: number){
    this.placeOrderFinal(this.userService._user.getValue().userId, dishID, day);
  }

  placeOrderFinal(userID: number, dishID: number, day: number){
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
}
