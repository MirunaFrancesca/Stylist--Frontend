import { Component, Input, OnInit } from '@angular/core';
import { ClothingItem } from './clothing-item.model';

@Component({
  selector: 'app-clothing-item',
  templateUrl: './clothing-item.component.html',
  styleUrls: ['./clothing-item.component.scss'],
})
export class ClothingItemComponent implements OnInit {
  @Input() clothingItem: ClothingItem;

  constructor() {
    console.log(this.clothingItem);
  }

  ngOnInit() {
    console.log(this.clothingItem);
  }
}
