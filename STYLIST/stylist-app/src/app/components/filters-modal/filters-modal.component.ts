import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filters-modal',
  templateUrl: './filters-modal.component.html',
  styleUrls: ['./filters-modal.component.scss'],
})
export class FiltersModalComponent implements OnInit {
  types: string[];
  colours: string[];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.types = this.getTypes();
    this.colours = this.getColours();
  }

  selectFilter(selectedFilter) {
    //this.modalController.dismiss({filter: selectedFilter});
  }

  getTypes(): string[] {
    return this.types;
  }

  getColours(): string[] {
    return this.colours;
  }

}
