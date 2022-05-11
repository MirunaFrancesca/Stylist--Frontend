import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ClothingItemComponent } from './clothing-item/clothing-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ClothingItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ClothingItemComponent
  ]
})
export class SharedComponentsModule { }
