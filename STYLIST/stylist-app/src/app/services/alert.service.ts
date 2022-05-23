import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
    
  constructor(public alertController: AlertController) {}

  async presentAlert(cssClass, header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: cssClass,
      header: header,
      message: message,
    });

    await alert.present();
  }
  
}
