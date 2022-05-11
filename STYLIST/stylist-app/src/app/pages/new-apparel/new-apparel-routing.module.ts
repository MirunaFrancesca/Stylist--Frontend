import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewApparelPage } from './new-apparel.page';

const routes: Routes = [
  {
    path: '',
    component: NewApparelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewApparelPageRoutingModule {}
