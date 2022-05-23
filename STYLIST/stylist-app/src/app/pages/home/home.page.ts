import { Component, OnInit } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { Apparel } from 'src/app/components/apparel/apparel';
import { AlertService } from 'src/app/services/alert.service';
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
    private apparelService: ApparelService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.fetchOutfit();
  }

  fetchOutfit(): void {
    this.isLoaded= false;

    this.apparelService.getRandomOufit()
    .pipe(
      delay(200),
      finalize( ()=> this.isLoaded = true)
    )
    .subscribe(res => {
      this.outfit = res.body;
      // this.outfit = [];

      if(this.outfit.length == 0)
        this.alertService.presentToast("error-alert", "Please add more clothes to generate outfits!");

      this.outfit.forEach(item => {
        this.apparelService.getApparelImage(item.id).subscribe(res => {
          const objectURL = URL.createObjectURL(res);
          item.imageUrl = objectURL;
        });
      })
    })
  }

}
