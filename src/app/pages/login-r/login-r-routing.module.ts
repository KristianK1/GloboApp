import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRPage } from './login-r.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRPageRoutingModule {}
