import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { decode } from 'base64-arraybuffer';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ApparelService } from 'src/app/services/apparel.service';
import { myColours } from './colours.model';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-new-apparel',
  templateUrl: './new-apparel.page.html',
  styleUrls: ['./new-apparel.page.scss'],
})
export class NewApparelPage implements OnInit {
  public idApparel = null;
  public isSubmitted = false;
  public saveApparelForm: FormGroup;

  private _apparelUploadedImage =
    '../../../assets/icon/apparel-default-image.png';
  public blob: Blob;
  public isUploaded: boolean = false;
  private imageSourceChanged = new BehaviorSubject<any>(null);

  public types = [
    'T-shirt',
    'Top',
    'Shirt',
    'Blouse',
    'Body',
    'Pullover',
    'Trousers',
    'Shorts',
    'Skirt',
    'Dungarees',
    'Dress',
    'Overall',
  ];
  public colours = myColours;

  constructor(
    public apparelService: ApparelService,
    public formBuilder: FormBuilder,
    public alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idApparel = this.activatedRoute.snapshot.params.id;

    this.saveApparelForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      colour: ['', [Validators.required]],
    });

    if (this.idApparel) {
      this.apparelService.getApparelImage(this.idApparel).subscribe((res) => {
        this.blob = res;
        const objectURL = URL.createObjectURL(res);
        this._apparelUploadedImage = objectURL;
        this.isUploaded = true;
      });

      this.apparelService.getApparelById(this.idApparel).subscribe((item) => {
        this.saveApparelForm.controls['type'].setValue(item.type);
        this.saveApparelForm.controls['colour'].setValue(item.colour.name);
      });
    }

    this.imageSourceChanged.asObservable().subscribe((newBlob) => {
      if (newBlob) {
        let objectURL = URL.createObjectURL(newBlob);
        this._apparelUploadedImage = objectURL;
        this.isUploaded = true;
      }
    });
  }

  public get saveApparelFormControl() {
    return this.saveApparelForm.controls;
  }

  public submitForm() {
    this.isSubmitted = true;
    if (!this.saveApparelForm.valid || !this.blob) return false;
    
    this.apparelService
      .saveApparel(
        this.idApparel,
        this.blob,
        this.saveApparelForm.value.type,
        this.saveApparelForm.value.colour
      )
      .subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            this.isUploaded = this.isSubmitted = false;
            this.apparelService.notifyWardrobe();
            this.alertService.presentToast(
              'success-alert',
              'Apparel saved successfully!'
            );
            this.router.navigate(['/my-wardrobe']);
          }
        },
        (err: any) => {
          console.log(err);
          this.alertService.presentToast(
            'error-alert',
            'Could not save apparel!'
          );
        }
      );
  }

  public async addApparelPhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.blob = new Blob([new Uint8Array(decode(capturedPhoto.base64String))], {
      type: `image/${capturedPhoto.format}`,
    });

    this.imageSourceChanged.next(this.blob);
  }

  public get apparelUploadedImage(): any {
    return this._apparelUploadedImage;
  }
}
