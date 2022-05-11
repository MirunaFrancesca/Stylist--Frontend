import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewApparelPageRoutingModule } from './new-apparel-routing.module';

import { NewApparelPage } from './new-apparel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewApparelPageRoutingModule
  ],
  declarations: [NewApparelPage]
})
export class NewApparelPageModule {}
