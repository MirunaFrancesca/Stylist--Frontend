import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isSubmitted = false;
  showPassword = false;
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    public alertService: AlertService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public get loginFormControls() {
    return this.loginForm.controls;
  }

  goToRegister(): void {
    this.router
      .navigateByUrl('/register')
      .then((r) => console.log('navigated'));
  }

  async login() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) return false;

    this.authService
      .loginUser(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        async (response) => {
          this.alertService.presentToast(
            'success-alert',
            'Logged in successfully!'
          );
          this.router.navigateByUrl('/my-wardrobe', { replaceUrl: true });
        },
        async (errorResponse) => {
          console.log(errorResponse);
          this.alertService.presentToast('error-alert', 'Wrong credentials!');
        }
      );
  }
}
