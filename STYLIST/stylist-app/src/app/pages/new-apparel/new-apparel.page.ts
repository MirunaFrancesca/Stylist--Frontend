import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from "@angular/forms";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { decode } from 'base64-arraybuffer';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ApparelService } from 'src/app/services/apparel.service';

@Component({
  selector: 'app-new-apparel',
  templateUrl: './new-apparel.page.html',
  styleUrls: ['./new-apparel.page.scss'],
})
export class NewApparelPage implements OnInit {
  public isSubmitted = false;
  public ionicForm: FormGroup;

  private _apparelUploadedImage: any;
  public apparelDefaultImage = "../../../assets/icon/apparel-default-image.png";
  public blob: Blob;
  public isUploaded: boolean = false;
  public uploadImageData = new FormData();

  public types = ["T-shirt", "Shirt", "Blouse", "Body", "Trousers", "Shorts", "Skirt", "Dress", "Overall"];
  public colours = ["white", "black", "red", "orange", "yellow", "green", "light blue", "dark blue", "purple", "pink", "brown", "gray"];

  constructor(
    public apparelService: ApparelService,
    public formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.ionicForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      colour: ['', [Validators.required]]
    })
  }

  public get errorControl() {
    return this.ionicForm.controls;
  }

  public submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } 
    else {
      this.apparelService.saveApparel(this.blob, this.ionicForm.value.type, this.ionicForm.value.colour)
      .subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            console.log(event.body.message);
          }
        },
        (err: any) => {
          console.log(err);

          if (err.error && err.error.message) {
            console.log(err.error.message);
          } else {
            console.log('Could not upload the file!');
          }
        });

    }
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

    this.isUploaded = true;
  }

  get apparelUploadedImage(): any {
    let objectURL = URL.createObjectURL(this.blob);
    this._apparelUploadedImage = objectURL;
    return this._apparelUploadedImage;
  }

}
