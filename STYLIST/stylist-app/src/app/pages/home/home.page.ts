import { Component, OnInit } from '@angular/core';
import { Apparel } from 'src/app/components/apparel/apparel';
import { ApparelService } from 'src/app/services/apparel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  manequinImg = "../../../assets/icon/manequin.jpg"
  apparelDefaultImage = "../../../assets/icon/apparel-default-image.png";
  plusIcon = "../../../assets/icon/plusIcon.png";
  outfit: Array<Apparel> = [];
  isLoaded: boolean = false;

  constructor(
    private apparelService: ApparelService
  ) { }

  ngOnInit() {
    this.fetchOutfit();
  }

  fetchOutfit(): void {
    this.isLoaded= false;

    this.apparelService.getRandomOufit().subscribe(res => {
      this.outfit = res.body;
      if(this.outfit[0].bottom) {
        let aux = this.outfit[0];
        this.outfit[0] = this.outfit[1];
        this.outfit[1] = aux; 
      }

      console.log(this.outfit);

      this.outfit.forEach(item => {
        this.apparelService.getApparelImage(item.id).subscribe(res => {
          const objectURL = URL.createObjectURL(res);
          item.imageUrl = objectURL;
        });
      })
      this.isLoaded = true;
    })
  }

}
