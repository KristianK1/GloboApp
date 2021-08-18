import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
interface rezultat_registracije {
  userid: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) { }

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";
  logiran: boolean = false;
  user: User;  //svaki user zamjenit sa _user u ostalim fajlovima
  _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  isMobile: boolean;

  tempID: number = -1;

  register(email: string, username: string, pass: string, comp?: string) {
    console.log(`email: ${email}, username: ${username}, pass: ${pass}`);

    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spUsersAzur",
          "params": {
            "action": "insert",
            "name": username,
            "email": email,
            "password": pass,
          }
        }
      ]
    }).subscribe((res: Array<rezultat_registracije>) => {
      console.log(res);
      if (res.length == 1) {
        console.log("registriran");
        if (comp) {
          console.log("idem na kompaniju");
          console.log(res[0].userid);
          this.register_comp(res[0].userid, comp);
        }

      }

    });
  }

  register_comp(id: number, comp: string) {
    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spCompanyAzur",
          "params": {
            "action": "insert",
            "name": comp,
            "status": "1",
            "userid": id,
          }
        }
      ]
    }).subscribe((res: string) => {
      console.log("registrirana kompanija");
      console.log(res);
    });
  }

  login(username: string, pass: string) {

    this.http.post(this.url, {
      "db": "Food",
      "queries": [
        {
          "query": "spUsersAzur",
          "params": {
            "action": "login",
            "email": username,
            "password": pass,
          }
        }
      ]
    }).subscribe((res: Array<User>) => {  //user treba bit velikim slovom
      
      if (res.length == 1) {
        
        if (!this.isMobile && !res[0].companyId) {
          alert("Niste prijavljeni kao restoran");
          return;
        }
        console.log("logiran");
        this.user = res[0];
        this._user.next(res[0]);

        this.storageService.setData("user", this.user);

        this.router.navigate(['/' + (this.isMobile ? 'mobile/tabs' : 'web') + '/dashboard'], { replaceUrl: true });

      }
    });
  }

  logout() {
    this.storageService.removeData("user");
    this.storageService.removeData("cart");

    this._user.next(null);
    this.user = null;
  }

  isCompany(): number {
    if (this.user != null) {
      if (this.user.companyId != null) return 98;
    }
    return 99;
  }

}
