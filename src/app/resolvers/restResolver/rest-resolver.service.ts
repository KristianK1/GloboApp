import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { RestServiceService } from 'src/app/services/restService/rest-service.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RestResolverService implements Resolve<boolean> {

  constructor(private userService: UserService, private restService: RestServiceService) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean>{
    if(this.userService.isCompany()!==2){
      return await this.restService.initCompanyUsers();
    }
    else  this.restService.initCustomersUsers();
  }
}
