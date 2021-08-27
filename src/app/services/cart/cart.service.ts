import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DishDetail } from 'src/app/interfaces/dish-detail';
import { MyOrdersResult } from 'src/app/interfaces/my-orders-result';
import { MyOrdersPageRoutingModule } from 'src/app/pages/mobile/my-orders/my-orders-routing.module';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  private shopCart: DishDetail[] = []; // ne treba mi?

  nOffOrders: number = -1;

  _shopCart: BehaviorSubject<Array<DishDetail>> = new BehaviorSubject<Array<DishDetail>>(null);

  myOrders: BehaviorSubject<Array<DishDetail>> = new BehaviorSubject<Array<DishDetail>>(null);

  promises: Array<Promise<any>> = [];

  constructor(private userService: UserService, private http: HttpClient, private storageService: StorageService, private toastControler: ToastController) {
    this.getCart();

    userService._user.subscribe(val =>{
      if(val==null) {
        this.myOrders.next([]);
        this.shopCart=[];
        this._shopCart.next([]);
        this.myOrders.next([]); //kad se izlogira nestane sve u cartu (nemog drugacije zbog kruznih ovisnosti - ne moze se u userservice dodat cartservice)
        console.log("brisem sve");
        
      }
    });
  }
  

  async getCart() {


    let rez = await this.storageService.getData("cart");
    if (rez) {
      this.shopCart = rez;
    }
    else {
      this.shopCart = [];
    }
    this._shopCart.next(this.shopCart);
    this.nOffOrders = this._shopCart.getValue().length;
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
    console.log('gotov');

    Promise.all(this.promises).then((x) => {



      this.getMyOrders(); //stavit u ng init ordersa
      this.shopCart = [];
      this._shopCart.next([]);
      this.storageService.removeData("cart");

      this.presentToast("Order Confirmed");
    });
    //this.shopCart = this.shopCart.filter(o => o.DishId!=order.DishId && o.day!=order.day); //ne znam je valja uvjet
    //this._shopCart.next(this.shopCart);
  }

  async presentToast(s: string) {
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

    this.promises.push(this.http.post(this.url, {
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
    }).toPromise());
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
    }).subscribe((res: Array<MyOrdersResult>) => {
      console.log(res);
      if (res) {
        this.myOrders.next(this.userOrdersToDishDetails(res));
      }
    });
  }

  userOrdersToDishDetails(data: Array<MyOrdersResult>): Array<DishDetail> {
    let ret: Array<DishDetail> = [];
    for (let order of data) {
      let temp: DishDetail = {
        DishId: null,
        day: order.day,

        Name: order.dishName,
        des: null,
        soup: order.soup,
        salad: order.salad,
        bread: order.bread,
      }
      ret.push(temp);
    }

    return ret;
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
