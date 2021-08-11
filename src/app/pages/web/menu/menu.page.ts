import { Component, OnInit } from '@angular/core';
//import { DashMealComponent } from 'src/app/components/dash-meal/dash-meal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  polje: number[] = [1,2,3];

  constructor() { }

  ngOnInit() {
  
  }
}