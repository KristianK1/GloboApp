import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  displayName: string="";
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log("hehe");

    this.userService._user.subscribe(val =>{
      this.displayName = val.name;
    })
  }

}
