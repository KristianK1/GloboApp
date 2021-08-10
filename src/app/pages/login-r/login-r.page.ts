import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-r',
  templateUrl: './login-r.page.html',
  styleUrls: ['./login-r.page.scss'],
})
export class LoginRPage implements OnInit {
  mode: number=0;

  company: number=0;


  email_reg: string="";
  username_reg: string = "";
  pass_reg: string = "";
  comp_reg: string = "";


  email_login: string="";  
  pass_login: string = "";  //maximilian swartzmiller

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.mode=1;
    this.email_login="KK1"
    this.pass_login="*****"
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

    if(this.company==1 && this.comp_reg==""){
      console.log("prazni argumenti - company");
      return;
    }

    if(this.company==0){
      console.log(this.comp_reg, "BEZ KOMPANIJE");
      this.userService.register(this.email_reg, this.username_reg, this.pass_reg, "");
    }
    if(this.company==1){
      console.log(this.comp_reg, "SA KOMPANIJOM");
      this.userService.register(this.email_reg, this.username_reg, this.pass_reg, this.comp_reg);
    }
  }
}
