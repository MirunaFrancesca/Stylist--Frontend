import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AlertController} from '@ionic/angular';
import {filter, map, take} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private alertController: AlertController) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
       map(isAuthenticated => {
        if(!isAuthenticated){
          // this.alertController.create({
          //   header: 'Unauthorized',
          //   message: 'You are not allowed to access this page.',
          //   buttons: ['OK']
          // }).then(alert => alert.present());
          this.router.navigateByUrl('/login');

          return false;
        }
        else {
          return true;
        }
      })
    );
  }


}