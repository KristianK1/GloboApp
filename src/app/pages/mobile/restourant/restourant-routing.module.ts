import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestourantPage } from './restourant.page';

const routes: Routes = [
  {
    path: '',
    component: RestourantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestourantPageRoutingModule {}
