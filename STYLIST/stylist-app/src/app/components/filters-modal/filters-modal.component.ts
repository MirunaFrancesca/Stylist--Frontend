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
  selectedColours: string[] = [];
  selectedTypes: string[] = [];
  hasChanges: boolean;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.types = this.getTypes();
    this.colours = this.getColours();
    this.selectedTypes = this.getSelectedTypes();
    this.selectedColours = this.getSelectedColours();
    if(this.selectedTypes.length === 0 && this.selectedColours.length === 0) this.hasChanges = false;
    else this.hasChanges = true;
  }

  getTypes(): string[] {
    return this.types;
  }

  getSelectedTypes(): string[] {
    return this.selectedTypes;
  }

  getColours(): string[] {
    return this.colours;
  }

  getSelectedColours(): string[] {
    return this.selectedColours;
  }

  selectType(type: string): void {
    if(this.isTypeSelected(type)) this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    else {
      this.hasChanges = true;
      this.selectedTypes.push(type);
    }
  }

  isTypeSelected(type: string): boolean {
    return this.selectedTypes.includes(type);
  }

  selectColour(colour: string): void {
    if(this.isColourSelected(colour)) this.selectedColours = this.selectedColours.filter(c => c !== colour);
    else {
      this.selectedColours.push(colour);
      this.hasChanges = true;
    }
  }

  isColourSelected(colour: string): boolean {
    return this.selectedColours.includes(colour);
  }

  clearFilters(): void {
    this.hasChanges = false;
    this.selectedColours = [];
    this.selectedTypes = [];
  }

  applyFilters(): void {
    console.log(this.selectedTypes);
    console.log(this.selectedColours);
    this.modalController.dismiss({types: this.selectedTypes, colours: this.selectedColours});
  }

}
