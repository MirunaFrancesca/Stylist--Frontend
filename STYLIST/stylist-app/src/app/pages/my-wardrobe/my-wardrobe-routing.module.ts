import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyWardrobePage } from './my-wardrobe.page';

const routes: Routes = [
  {
    path: '',
    component: MyWardrobePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyWardrobePageRoutingModule {}
