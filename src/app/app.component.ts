import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menuCtrl: MenuController, private router: Router) {
    this.router.navigate(['login']);
  }

  async openMenu(){
    await this.menuCtrl.open();
  }

  closeMenu(){
    this.menuCtrl.close();
  }
}
