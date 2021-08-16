import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restourant',
  templateUrl: './restourant.page.html',
  styleUrls: ['./restourant.page.scss'],
})
export class RestourantPage implements OnInit {
  days: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
   // this.days=Days;
    this.route.queryParams.subscribe(params =>{
      console.log(params.id);
    })
  }

}
