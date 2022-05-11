import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  manequinImg = "../../../assets/icon/manequin.jpg"
  apparelDefaultImage = "../../../assets/icon/apparel-default-image.png";
  plusIcon = "../../../assets/icon/plusIcon.png";

  constructor() { }

  ngOnInit() {
  }

}
