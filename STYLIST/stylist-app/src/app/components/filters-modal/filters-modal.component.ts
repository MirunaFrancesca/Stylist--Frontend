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
  colourStyle: string = 'colour';
  selectedColours: string[] = [];

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

  selectColour(colour: string): void {
    // if(this.colourStyle == 'colour') this.colourStyle = 'selected-colour';
    // else this.colourStyle = 'colour';

    this.isColourSelected(colour) ? this.selectedColours = this.selectedColours.filter(col => col !== colour) : this.selectedColours.push(colour);
    console.log(this.selectedColours);
  }

  isColourSelected(colour: string): boolean {
    return this.selectedColours.includes(colour);
  }

}
