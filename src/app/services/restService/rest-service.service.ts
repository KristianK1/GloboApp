import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DishDetail } from 'src/app/interfaces/dish-detail';
import { DishForCompanyResult } from 'src/app/interfaces/dish-for-company-result';
import { DishMenuForCompanyResult } from 'src/app/interfaces/dish-menu-for-company-result';
import { GetAllMenusResult } from 'src/app/interfaces/get-all-menus-result';
import { Order } from 'src/app/interfaces/Order';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  constructor(private http: HttpClient, private userService: UserService) { }

  _orders: BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>(null);

  _dishDetails: BehaviorSubject<Array<DishDetail>> = new BehaviorSubject<Array<DishDetail>>(null);

  initCompanyUsers(): Promise<boolean> {
    return this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spOrdersQuery",
          "params": {
            "action": "forCompany",
            "restoranid": this.userService.user.companyId
          },
          tablename: 'allorders',
        },
        {
          "query": "spDishMenu",
          "params": {
            "action": "dish",
            "companyid": this.userService.user.companyId
          },
          tablename: 'everyMealComp'
        },
        {
          "query": "spDishMenu",
          "params": {
              "action": "menu",
              "companyid": this.userService.user.companyId
          },
          tablename: 'shortMenu'
      }
      ]
    }).toPromise().then((res: {
      allorders: Array<Order>,
      everyMealComp: Array<GetAllMenusResult>,
      shortMenu: Array<DishMenuForCompanyResult>,
    }) => {
      console.log(res);
      if (res != null) {
        //spojit dvije tablice u jednu
        this._orders.next(res.allorders);
        // console.log(res.everyMealComp);
        // console.log(res.shortMenu);
        
        this.combineTables(res.shortMenu, res.everyMealComp);
        
      }
      return true;
    });

  }

  addToDay(id: number, day: number){
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spMenuAzur",
          "params": {
              "action": "insert",
              "dishid": id,
              "day": day,
              "userid": this.userService.user.userId
          }
      }
      ]
    }).subscribe((res: any) => {  //user treba bit velikim slovom
      console.log("added meal" + res);
      
    this.initCompanyUsers();
    });
  }

  deleteFromDay(id: number, day: number){
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spMenuAzur",
          "params": {
              "action": "delete",
              "dishid": id,
              "day": day,
              "userid": this.userService.user.userId
          }
      }
      ]
    }).subscribe((res: any) => {  //user treba bit velikim slovom
      console.log("deleted meal" + res);
      this.initCompanyUsers();
      
    });


  }
  initCustomersUsers(): boolean {
    return true;
  }


  combined: Array<DishDetail> = new Array<DishDetail>(null);

  combineTables(smaller: Array<DishMenuForCompanyResult>, biggerDetailed: Array<DishForCompanyResult>){
    this.combined=[];
    for(let dish of biggerDetailed){
      for(let dish2 of smaller){
        
        if(dish2.DishId==dish.DishId)
        {
          let temp: DishDetail = {
            DishId: 0,
            day: 0,
            Name: "",
            des: "",
            soup: false,
            salad: false,
            bread: false,
          };          //da ne jede govna da je undefined

          temp.DishId=dish.DishId;
          temp.Name=dish.Name;
          temp.bread=dish.Bread;
          temp.salad=dish.Salad;
          temp.soup=dish.Soup;
          temp.des=dish.Description;
          temp.day=dish2.Day;

          this.combined.push(temp);
        }
      }
    } 

    for(let dish of biggerDetailed){
      let happens:boolean=false;
      for(let dish2 of smaller){
        
        if(dish2.DishId==dish.DishId)
        {
          happens=true;
          
        }
      }
      if(happens==false){
        let temp: DishDetail = {
          DishId: 0,
          day: 0,
          Name: "",
          des: "",
          soup: false,
          salad: false,
          bread: false,
        };          //da ne jede govna da je undefined

        temp.DishId=dish.DishId;
        temp.Name=dish.Name;
        temp.bread=dish.Bread;
        temp.salad=dish.Salad;
        temp.soup=dish.Soup;
        temp.des=dish.Description;
        temp.day=null;

        this.combined.push(temp);
      }
    } 
   
    this._dishDetails.next(this.combined);
  }

}
