import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/Order';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";

  constructor(private http: HttpClient, private userService: UserService) { }

  _orders: BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>(null);

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
        // {
        //   "query": "spOrdersQuery",
        //   "params": {
        //     "action": "forCompany",
        //     "restoranid": this.userService.user.companyId
        //   },
        //   tablename: 'neko drugo ime',
        // }
      ]
    }).toPromise().then((res: {
      allorders :  Array<Order>
    }) => {
      console.log(res);
      if (res != null) {
        this._orders.next(res.allorders);
      }
      return true;
    });

  }

  initCustomersUsers(): boolean {
    return true;
  }

}
