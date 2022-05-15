import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewApparelPageRoutingModule } from './new-apparel-routing.module';

import { NewApparelPage } from './new-apparel.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewApparelPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [NewApparelPage]
})
export class NewApparelPageModule {}
