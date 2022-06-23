import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './security/guard/auth.guard';
import { AutoLoginGuard } from './security/guard/auto-login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./security/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./security/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-wardrobe',
    loadChildren: () => import('./pages/my-wardrobe/my-wardrobe.module').then( m => m.MyWardrobePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'new-apparel',
    loadChildren: () => import('./pages/new-apparel/new-apparel.module').then( m => m.NewApparelPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'new-apparel/:id',
    loadChildren: () => import('./pages/new-apparel/new-apparel.module').then( m => m.NewApparelPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'saved-outfits',
    loadChildren: () => import('./pages/saved-outfits/saved-outfits.module').then( m => m.SavedOutfitsPageModule),
    canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
