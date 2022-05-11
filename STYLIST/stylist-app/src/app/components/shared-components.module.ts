import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ApparelComponent } from './apparel/apparel.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ApparelComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ApparelComponent
  ]
})
export class SharedComponentsModule { }
