import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apparel } from 'src/app/components/apparel/apparel';
import { ApparelService } from 'src/app/services/apparel.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-my-wardrobe',
  templateUrl: './my-wardrobe.page.html',
  styleUrls: ['./my-wardrobe.page.scss'],
})
export class MyWardrobePage implements OnInit {
  apparels: Array<Apparel> = [];

  constructor(
    private apparelService: ApparelService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.apparelService.getAllApparels()
    .subscribe(res => {
      this.apparels = res.body;
      this.apparels.forEach(item =>{
        this.apparelService.getApparelImage(item.id).subscribe(res =>{
          const objectURL = URL.createObjectURL(res);
          console.log(objectURL);
          item.imageUrl = objectURL;
        });
      })
    })
  }

  deleteOutfit(id: number): void {
    this.apparelService.deleteApparel(id).subscribe(() => {});
  }

}
