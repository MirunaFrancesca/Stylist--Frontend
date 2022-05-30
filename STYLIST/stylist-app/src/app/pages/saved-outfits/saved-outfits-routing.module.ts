import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedOutfitsPage } from './saved-outfits.page';

const routes: Routes = [
  {
    path: '',
    component: SavedOutfitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedOutfitsPageRoutingModule {}
