import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular'
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menuCtrl: MenuController, private router: Router, private userService: UserService, private storageService: StorageService) {
    // this.router.navigate(['login']);
    console.log(this.router.url);
    this.appInit();
    
   
  }

  async appInit(){
    this.userService._user.subscribe(val =>{
      this.logiran=val != null;
      console.log("serbscribe");
    });
    let rez = await this.storageService.getData("user");
    console.log(rez);
    if(rez){
      this.userService.user=rez;
      this.userService._user.next(rez);
      this.router.navigate(['/web/dashboard'], {replaceUrl: true});
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
