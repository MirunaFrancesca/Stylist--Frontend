import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  showConfirmPassword = false;
  isSubmitted = false;
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
      confirmPassword: ['', [Validators.required]]
    });
  }

  public get registerFormControls() {
    return this.registerForm.controls;
  }

  public passwordAndConfirmMatch(): boolean{
    console.log(this.registerForm.value.password);
    console.log(this.registerForm.value.confirmPassword);
    console.log(this.registerFormControls.confirmPassword.touched && !(this.registerForm.value.password === this.registerForm.value.confirmPassword));
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }

  async register() {
    this.isSubmitted = true;
    if (!this.registerForm.valid || !this.passwordAndConfirmMatch()) return false;

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
        this.alertService.presentToast(
          'error-alert',
          'Could not create account!'
        );
      }
    );
  }

}
