import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-r',
  templateUrl: './login-r.page.html',
  styleUrls: ['./login-r.page.scss'],
})
export class LoginRPage implements OnInit {
  mode: number=0;

  company: boolean;


  email_reg: string="";
  username_reg: string = "";
  pass_reg: string = "";
  comp_reg: string = "";


  email_login: string="";  
  pass_login: string = "";  //maximilian swartzmiller

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.mode=1;
    this.email_login="vedran.prpic1@gmail.com"
    this.pass_login="lozinka"
    // this.email_login="Kristian";
    // this.pass_login="Kristian";
  } 


  clicked_login(){
    if(this.email_login=="" || this.pass_login==""){
      console.log("prazni argumenti");
      return;
    }
    
    
      this.userService.login(this.email_login, this.pass_login);

  }

  clicked_reg(){
    if(this.email_reg=="" || this.username_reg=="" || this.pass_reg==""){
      console.log("prazni argumenti");
      return;
    }

    if(this.company && this.comp_reg==""){
      console.log("prazni argumenti - company");
      return;
    }

    if(!this.company){
      console.log(this.comp_reg, "BEZ KOMPANIJE");
      this.userService.register(this.email_reg, this.username_reg, this.pass_reg);
    }
    if(this.company){
      console.log(this.comp_reg, "SA KOMPANIJOM");
      this.userService.register(this.email_reg, this.username_reg, this.pass_reg, this.comp_reg);
    }
  }
}
