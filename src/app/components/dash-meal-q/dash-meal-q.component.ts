import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-meal-q',
  templateUrl: './dash-meal-q.component.html',
  styleUrls: ['./dash-meal-q.component.scss'],
})
export class DashMealQComponent implements OnInit {
  imgSrc: string;
  jeloName: string;
  jeloDes: string;

  constructor() { }

  ngOnInit() {
    console.log("hello");
    this.imgSrc = "assets/images/jelo1.png";
    this.jeloName = "Čorba s Višnjama";
    this.jeloDes = "Lorem ipsun ipfg iofjgiodsfjjjjjjdf jhgkdf hgdrrrrrrrrrrrrrrrrrrg Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun";
  }
}
