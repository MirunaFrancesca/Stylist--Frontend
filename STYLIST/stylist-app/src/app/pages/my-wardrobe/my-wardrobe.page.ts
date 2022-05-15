import { Component, OnInit } from '@angular/core';
import { Apparel } from 'src/app/components/apparel/apparel';
import { ApparelService } from 'src/app/services/apparel.service';

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
      console.log(this.apparels);

      this.apparels.forEach(item =>{
        this.apparelService.getApparelImage(item.id).subscribe(res =>{
          const objectURL = URL.createObjectURL(res);
          item.imageUrl = objectURL;
        });
      })
    })
  }

  deleteOutfit(id: number): void {
    this.apparelService.deleteApparel(id).subscribe(() => {});
  }

}
