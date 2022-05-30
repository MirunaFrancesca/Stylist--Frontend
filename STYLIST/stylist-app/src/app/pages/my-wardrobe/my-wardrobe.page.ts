import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { delay, finalize } from 'rxjs/operators';
import { Apparel } from 'src/app/model/apparel';
import { FiltersModalComponent } from 'src/app/components/filters-modal/filters-modal.component';
import { AlertService } from 'src/app/services/alert.service';
import { ApparelService } from 'src/app/services/apparel.service';
import { myTypes } from 'src/app/model/types.model';
import { myColours } from 'src/app/model/colours.model';

@Component({
  selector: 'app-my-wardrobe',
  templateUrl: './my-wardrobe.page.html',
  styleUrls: ['./my-wardrobe.page.scss'],
})
export class MyWardrobePage implements OnInit {
  public iconHanger = "../../../assets/icon/hanger.png";
  isLoaded: boolean = false;
  apparels: Array<Apparel> = [];
  types: string[] = myTypes;
  colours: string[] = myColours;

  constructor(
    private apparelService: ApparelService,
    public alertService: AlertService,
    public alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.subscribeToRefresh();
  }

  subscribeToRefresh() {
    this.apparelService.getWardrobeRefresh().subscribe(() => {
      this.fetchData();
    });
  }

  fetchData(): void {
    this.isLoaded = false;
    
    this.apparelService.getAllApparels()
    .pipe(
      delay(500),
      finalize(() => this.isLoaded = true)
    )
    .subscribe(res => {
      this.apparels = res.body;

      this.apparels.forEach(item =>{
        this.apparelService.getApparelImage(item.id).subscribe(res =>{
          const objectURL = URL.createObjectURL(res);
          item.imageUrl = objectURL;
        });
      })
    })
  }

  async presentAlertConfirm(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'confirmation-dialog',
      header: 'Confirm delete',
      message: 'Are you sure you want to delete this?',
      buttons: [
        {
          text: 'No',
          id: 'no-button',
          handler: () => {
          }
        }, 
        {
          text: 'Yes',
          id: 'yes-button',
          handler: () => {
            this.apparelService.deleteApparel(id).subscribe(
             (res) => {
              this.apparels = this.apparels.filter(item => item.id != id);
              this.alertService.presentToast("success-alert", "Item deleted successfully!");
             },
             (err) => {
              this.alertService.presentToast("error-alert", "Item could not be deleted!");
             });
          }
        }
      ]
    });

    await alert.present();
  }

  async openFiltersModal() {
    const modal = await this.modalController.create({
      component: FiltersModalComponent,
      breakpoints: [0, 0.5, 0.7, 1],
      initialBreakpoint: 0.5,
      handle: true,
      componentProps: {
        types: this.types,
        colours: this.colours
      }
    });

    await modal.present();

    const {data} = await modal.onWillDismiss();

    if (data) {
      //this.filterProducts(ProductsPage.categoryMapper(data.category));
    }
  }

}
