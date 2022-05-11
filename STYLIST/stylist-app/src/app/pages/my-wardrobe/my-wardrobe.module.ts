import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyWardrobePageRoutingModule } from './my-wardrobe-routing.module';

import { MyWardrobePage } from './my-wardrobe.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyWardrobePageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [MyWardrobePage]
})
export class MyWardrobePageModule {}
