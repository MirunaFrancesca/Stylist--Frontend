import { Component, Input, OnInit } from '@angular/core';
import { Apparel } from '../../model/apparel';

@Component({
  selector: 'app-apparel',
  templateUrl: './apparel.component.html',
  styleUrls: ['./apparel.component.scss'],
})
export class ApparelComponent implements OnInit {
  @Input() apparel: Apparel;

  constructor() {}

  ngOnInit() {
  }
}
