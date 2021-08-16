import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular'
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menuCtrl: MenuController, private router: Router, private userService: UserService, private storageService: StorageService, private platform: Platform) {
    // this.router.navigate(['login']);
    console.log(this.router.url);
    this.appInit();
    
   
  }

  isMobileX: Boolean = false;

  async appInit(){
    this.userService.isMobile=this.platform.is('mobileweb') || this.platform.is('mobile');
    this.isMobileX=this.userService.isMobile;

    this.userService._user.subscribe(val =>{
      this.logiran=val != null;
      console.log("serbscribe");
    });
    let rez = await this.storageService.getData("user");
    console.log(rez);
    if(rez){
      this.userService.user=rez;
      this.userService._user.next(rez);
      this.router.navigate(['/' + (this.userService.isMobile? 'mobile/tabs'  : 'web') + '/dashboard'], {replaceUrl: true});
      //this.router.navigate(['/web/dashboard'], {replaceUrl: true});
    }
  }

  logiran : boolean
  async openMenu(){
    await this.menuCtrl.open();
  }

  closeMenu(){
    this.menuCtrl.close();
  }

  logout(){
    this.userService.logout();
    this.closeMenu();
    this.router.navigate(['/login']);
  }
}
