import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  username = '';
  pw = '';

  constructor(
    private router: Router,
    private loginService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  goToRegister(): void{
    this.router.navigateByUrl('/register').then(r => console.log('navigated'));
  }

  async login(){
      this.loginService.loginUser(this.username, this.pw).subscribe(
      async (response) => {
        this.router.navigateByUrl('/my-wardrobe', {replaceUrl: true});
      },
      async (errorResponse) => {
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: errorResponse.error.error,
          buttons: ['OK'],
        });
      }
    );
  }
}
