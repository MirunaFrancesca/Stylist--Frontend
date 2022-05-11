import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClothingItem } from 'src/app/components/clothing-item/clothing-item.model';
import { ClothingItemDataService } from 'src/app/services/clothing-item-data.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-my-wardrobe',
  templateUrl: './my-wardrobe.page.html',
  styleUrls: ['./my-wardrobe.page.scss'],
})
export class MyWardrobePage implements OnInit {

  items: Array<ClothingItem> = [
    {id: 1, name : "Outfit no.1", imgUrl : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/index-1607454775.jpg?crop=0.296xw:0.593xh;0.353xw,0.00326xh&resize=640:*" },
    {id: 2, name : "Outfit no.2", imgUrl : "https://cdn.cliqueinc.com/posts/271084/all-white-winter-outfits-271084-1540851894674-square.700x0c.jpg" },
    {id: 3, name : "Outfit no.3", imgUrl : "https://www.stylevore.com/wp-content/uploads/2019/04/1554112193_575_40-All-White-Outfit-Ideas-for-Women.jpg" },
    {id: 4, name : "Outfit no.4", imgUrl : "https://i.pinimg.com/474x/c7/d8/43/c7d8438d9ffcd95f84865d6c19821876.jpg" },
    {id: 5, name : "Outfit no.5", imgUrl : "https://www.mjackets.com/wp-content/uploads/2020/10/Beth-Harmon-White-Coat-600x706-1.jpg" },
    {id: 6, name : "Outfit no.6", imgUrl : "https://themoodpalette.com/ezoimgfmt/i.pinimg.com/564x/8e/4a/06/8e4a06490bbae573134ec7bcba9aa8bd.jpg?ezimgfmt=rs:371x497/rscb7/ng:webp/ngcb7" },
    {id: 7, name : "Outfit no.7", imgUrl : "http://www.onesmallblonde.com/wp-content/uploads/2020/01/all-white-workwear-1-2-1200x1800.jpg" },
    {id: 8, name : "Outfit no.8", imgUrl : "https://www.stylishbelles.com/wp-content/uploads/2020/02/Casual-outfits-for-women-in-winter-season.jpg" },
    {id: 9, name : "Outfit no.9", imgUrl : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/therese-hellstroem-wears-sunglasses-a-white-wool-turtleneck-news-photo-1607299238.?crop=1xw:1xh;center,top&resize=480:*" }
  ];

  public imageUrl: any;

  public fileInfos?: Observable<any>;
  public objectURL;

  constructor(
    private clothingItemDataService: ClothingItemDataService,
    private photoService: PhotoService
    ) {}

  ngOnInit(): void {
    this.fetchData();
    this.photoService.getFiles().subscribe(
      (response) =>
      { 
        console.log(response);
        this.objectURL = URL.createObjectURL(response);
      }
    );
  }

  fetchData(): void{
    this.clothingItemDataService.getAllOutfits().subscribe((data)=>{
      this.items = data;
      console.log(this.items);
    })
  }



  deleteOutfit(id: number): void {
    this.clothingItemDataService.deleteOutfit(id).subscribe(() => {});
  }

}
