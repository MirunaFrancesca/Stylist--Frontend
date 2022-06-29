import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { Apparel } from 'src/app/model/apparel';
import { AlertService } from 'src/app/services/alert.service';
import { ApparelService } from 'src/app/services/apparel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  manequinImg = "../../../assets/icon/manequin.jpg";
  emptyHeartSvg = "../../../assets/icon/empty-heart.svg";
  fillHeartSvg = "../../../assets/icon/fill-heart-save.svg"
  apparelDefaultImage = "../../../assets/icon/apparel-default-image.png";
  plusIcon = "../../../assets/icon/plusIcon.png";

  outfit: Array<Apparel> = [];
  isLoaded: boolean = false;
  isSaved: boolean;

  constructor(
    private apparelService: ApparelService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.fetchOutfit();
  }

  fetchOutfit(): void {
    this.isLoaded = false;
    this.isSaved = false;

    this.apparelService.getRandomOufit()
    .pipe(
      delay(200),
      finalize(() => this.isLoaded = true)
    )
    .subscribe(res => {
      this.outfit = res.body;

      if(this.outfit.length == 0)
        this.alertService.presentToast("error-alert", "Please add more clothes to generate outfits!");

      this.outfit.forEach(item => {
        this.apparelService.getApparelImage(item.id).subscribe(res => {
          const objectURL = URL.createObjectURL(res);
          item.imageUrl = objectURL;
        });
      });

      let secondId;
      this.outfit[1] ? secondId = this.outfit[1].id : null;
      this.apparelService.isOutfitSaved(this.outfit[0].id, secondId).subscribe(res => {
          if(res.body) {
            this.isSaved = true;
          }
      });
    })
  }

  addToFavourites(): void {
    this.isSaved = true;
    let secondId;
    this.outfit[1] ? secondId = this.outfit[1].id : null;
    this.apparelService.saveOutfit(this.outfit[0].id, secondId)
    .subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          //this.apparelService.notifyWardrobe();
          this.alertService.presentToast(
            'success-alert',
            'Outfit added to favourites!'
          );
        }
      },
      (err: any) => {
        this.alertService.presentToast(
          'error-alert',
          'Could not add to favourites!'
        );
      }
    );
  }

  removeFromFavourites(): void {
    let secondId;
    this.outfit[1] ? secondId = this.outfit[1].id : null;
    this.apparelService.deleteOutfit(this.outfit[0].id, secondId)
    .subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          //this.apparelService.notifyWardrobe();
          this.isSaved = false;
          this.alertService.presentToast(
            'success-alert',
            'Outfit removed from favourites!'
          );
        }
      },
      (err: any) => {
        this.alertService.presentToast(
          'error-alert',
          'Could not remove from favourites!'
        );
      }
    );
  }

}
