import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

import { HttpClient } from '@angular/common/http';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.page.html',
  styleUrls: ['./new-dish.page.scss'],
})
export class NewDishPage implements OnInit {

  name:string="";
  des:string="";
  salad: number=0;
  bread: number=0;
  soup: number=0;
  
  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";
  
  constructor(private http: HttpClient,private user:UserService, private resService: RestServiceService) { }
  
  
  ngOnInit() {
  }


  save(){
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spDishAzur",
          "params": {
              "action": "insert",
              "companyid": this.user.user.companyId,
              "name": this.name,
              "soup": this.soup,
              "salad": this.salad,
              "bread": this.bread,
              "description": this.des,
              "userid": this.user.user.userId
          }
      }
      ]
    }).subscribe((res: any) => {
      // console.log(res);
      // if (res.length == 1) {
      //   console.log("registriran");
      //   if (comp) {
      //     console.log("idem na kompaniju");
      //     console.log(res[0].userid);
      //     this.register_comp(res[0].userid, comp);
      //   }

      // }
      console.log("rez unos "+ res);
      this.resService.initCompanyUsers();
    });
  }
}
