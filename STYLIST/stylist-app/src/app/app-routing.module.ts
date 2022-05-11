import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './security/guard/auth.guard';
import { AutoLoginGuard } from './security/guard/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./security/login/login.module').then( m => m.LoginPageModule),
    //canActivate: [AutoLoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./security/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'new-apparel',
    loadChildren: () => import('./pages/new-apparel/new-apparel.module').then( m => m.NewApparelPageModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
