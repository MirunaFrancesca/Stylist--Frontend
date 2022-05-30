import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ApparelComponent } from './apparel/apparel.component';
import { FiltersModalComponent } from './filters-modal/filters-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    ApparelComponent,
    FiltersModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    ApparelComponent,
    FiltersModalComponent
  ]
})
export class SharedComponentsModule { }
