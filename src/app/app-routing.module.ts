import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { RestResolverService } from './resolvers/restResolver/rest-resolver.service';
import { RestServiceService } from './services/restService/rest-service.service';

const routes: Routes = [
  {
    path: 'mobile',
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('./pages/mobile/tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'restourant',
        loadChildren: () => import('./pages/mobile/restourant/restourant.module').then( m => m.RestourantPageModule)
      },
      
    ], resolve: {
      restourant: RestResolverService
    },
    canActivate: [AuthGuard]
  },
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

    ],
    resolve: {
      restourant: RestResolverService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-r/login-r.module').then(m => m.LoginRPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/login-r/login-r.module').then(m => m.LoginRPageModule)
  },
  {
    path: 'restourant',
    loadChildren: () => import('./pages/mobile/restourant/restourant.module').then( m => m.RestourantPageModule)
  },  {
    path: 'my-orders',
    loadChildren: () => import('./pages/mobile/my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
