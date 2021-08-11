import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-meal',
  templateUrl: './dash-meal.component.html',
  styleUrls: ['./dash-meal.component.scss'],
})
export class DashMealComponent implements OnInit {
  imgSrc: string;
  jeloName: string;
  jeloDes: string;

  constructor() { }

  ngOnInit() {
    this.imgSrc="assets/images/jelo1.png";
    this.jeloName="Čorba s Višnjama";
    this.jeloDes="Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun Lorem fhgdsfhdsfklg jfg iofjgiodsfjjjjjjjjjjjjjjjjjif   g dfuhgduhg dhgdfk ghjdf jhgkdf hgdrrrrrrrrrrrrrrrrrrg Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun Lorem ipsun Lorem dsf dsf fdsfdsgr gdfs hgipsun Lorem ipsun Lorem ipsun";
  }

}