import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from '../auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  showPassword = false;
  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    public alertService: AlertService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async register() {
    if (!this.registerForm.valid) return false;

    const newUser: User = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
    };

    this.authService.registerUser(newUser).subscribe(
      async (response) => {
        this.alertService.presentToast(
          'success-alert',
          'Account created successfully!'
        );
        this.router.navigateByUrl('/login', { replaceUrl: true });
      },
      async (errorResponse) => {
        console.log(errorResponse);
        this.alertService.presentToast(
          'error-alert',
          'Could not create account!'
        );
      }
    );
  }

}
