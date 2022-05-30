import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedOutfitsPageRoutingModule } from './saved-outfits-routing.module';

import { SavedOutfitsPage } from './saved-outfits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedOutfitsPageRoutingModule
  ],
  declarations: [SavedOutfitsPage]
})
export class SavedOutfitsPageModule {}
