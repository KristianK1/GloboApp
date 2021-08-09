import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'web',
    children: [
      {
        path: 'menu',
        loadChildren: () => import('./pages/web/menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/web/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'new-dish',
        loadChildren: () => import('./pages/web/new-dish/new-dish.module').then(m => m.NewDishPageModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-r/login-r.module').then(m => m.LoginRPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
