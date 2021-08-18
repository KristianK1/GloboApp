import { Component, OnInit } from '@angular/core';
import { Restourant } from 'src/app/interfaces/restourant';
import { RestServiceService } from 'src/app/services/restService/rest-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  allRestt: Restourant[] = [];
  filtered: Restourant[] = [];
  
  searchStr: string="";

  constructor(private restService: RestServiceService) { }
  
  ngOnInit() {
    this.restService._allRestaurants.subscribe( value => {
      if(value.length){
        this.allRestt=value;
        this.showRest();
        
      }
    });
  }

  search(){
    this.showRest();
  }

  showRest(){
    this.filtered = this.allRestt.filter(o => o.name.toLowerCase().includes(this.searchStr.toLowerCase()));
   
    this.setImages();
  }

  setImages(){
    this.filtered.forEach(r => {
      const random = Math.floor(Math.random()*5+1);
      r.image = `url(assets/restorani/restoran${random}.jpg)`;
    })
    
  }
}
