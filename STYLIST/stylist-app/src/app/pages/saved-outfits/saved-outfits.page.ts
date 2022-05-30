import { Component, OnInit } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { Apparel } from 'src/app/model/apparel';
import { slideOptions } from 'src/app/model/slide-options.model';
import { AlertService } from 'src/app/services/alert.service';
import { ApparelService } from 'src/app/services/apparel.service';

@Component({
  selector: 'app-saved-outfits',
  templateUrl: './saved-outfits.page.html',
  styleUrls: ['./saved-outfits.page.scss'],
})
export class SavedOutfitsPage implements OnInit {
  manequinImg = "../../../assets/icon/manequin.jpg";
  plusIcon = "../../../assets/icon/plusIcon.png";
  outfits: Array<Array<Apparel>> = [];
  isLoaded: boolean = false;
  viewEntered = false;

  slideOpts = slideOptions;

  ionViewDidEnter() {
    this.viewEntered = true;
  }

  constructor(
    private apparelService: ApparelService
  ) { }

  ngOnInit() {
    this.fetchFavourites();
  }

  fetchFavourites(): void {
    this.isLoaded = false;

    this.apparelService.getSavedOutfits()
    .pipe(
      finalize(() => this.isLoaded = true)
    )
    .subscribe(res => {
      this.outfits = res.body;

      for(let outfitPos in this.outfits){
        this.outfits[outfitPos].forEach(item => {
          this.apparelService.getApparelImage(item.id).subscribe(res => {
            const objectURL = URL.createObjectURL(res);
            item.imageUrl = objectURL;
          });
        })
      }
      console.log(this.outfits);
    })
  }

}
