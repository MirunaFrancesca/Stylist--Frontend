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
  public iconHanger = "../../../assets/icon/hanger-image.jpg";
  isLoaded: boolean = false;
  apparels: Array<Apparel> = [];
  filteredApparels: Array<Apparel> = [];
  types: string[] = myTypes;
  colours = myColours;
  filterTypes: string[] = [];
  filterColours: string[] = [];

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
      delay(100),
      finalize(() => this.isLoaded = true)
    )
    .subscribe(res => {
      this.apparels = res.body;

      this.apparels.forEach(item =>{
        this.apparelService.getApparelImage(item.id).subscribe(res =>{
          const objectURL = URL.createObjectURL(res);
          item.imageUrl = objectURL;
        });
      });
      
      this.filteredApparels = this.apparels;
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
              this.filteredApparels = this.apparels;
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
      initialBreakpoint: 1,
      handle: true,
      componentProps: {
        types: this.types,
        colours: this.colours,
        selectedTypes: this.filterTypes,
        selectedColours: this.filterColours
      }
    });

    await modal.present();

    const {data} = await modal.onWillDismiss();

    if (data) {
      console.log(data);
      this.filterClothes(data);
    }
  }

  filterClothes(filters: any): void {
    if(!filters) return;
    this.isLoaded = false;
    
    this.filteredApparels = this.apparels.filter(apparel => {
      if(filters.types.length > 0 && filters.colours.length > 0) return filters.types.includes(apparel.type) && filters.colours.includes(apparel.colour.name);
      if(filters.types.length > 0) return filters.types.includes(apparel.type);
      if(filters.colours.length > 0) filters.colours.includes(apparel.colour.name);
      return true;
    });

    console.log(this.filteredApparels);
    console.log(this.apparels);
    this.filterTypes = filters.types;
    this.filterColours = filters. colours;
    this.isLoaded = true;  
  }

}
