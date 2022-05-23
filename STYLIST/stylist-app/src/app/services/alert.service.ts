import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  
  constructor(public toastController: ToastController) {}

  async presentToast(cssClass: string, message: string) {
    const toast = await this.toastController.create({
      cssClass: cssClass,
      message: message,
      animated: true,
      duration: 2000
    });
    toast.present();
  }
  
}
