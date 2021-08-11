import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
interface rezultat_registracije {
  userid: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food";
  logiran: boolean = false;
  user: user;
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
    console.log(id, comp);
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
    }).subscribe(() => {
      console.log("registrirana kompanija");

    });
  }

  login(username: string, pass: string) {
    console.log("username: ", username, " password: ", pass);

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
    }).subscribe((res: Array<user>) => {  //user treba bit velikim slovom
      console.log(res);
      if (res.length == 1) {
        console.log("logiran");
        this.user = res[0];
        console.log(this.user);
        this.router.navigate(['/web/dashboard'], {replaceUrl: true});
      }
    });
  }

  logout() {
    this.user = null;
  }


}
