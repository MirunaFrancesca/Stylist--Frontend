import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public pw: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
    ) { }

  ngOnInit() {
  }

  async register() {
    const newUser: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.pw
    };

    this.authService.registerUser(newUser).subscribe(
      async (response) => {
        this.router.navigateByUrl('/login', {replaceUrl: true});
      },
      async (errorResponse) => {
        const alert = await this.alertController.create({
          header: 'Register failed',
          message: errorResponse.error.error,
          buttons: ['OK'],
        });
      }
    );
  }

}
