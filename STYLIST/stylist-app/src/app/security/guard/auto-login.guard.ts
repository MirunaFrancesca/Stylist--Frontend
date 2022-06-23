import {Observable} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';
import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { AuthService } from '../auth.service';


@Injectable()
export class AutoLoginGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if(!isAuthenticated){
          return true;
        } else {
          this.router.navigateByUrl('/menu', {replaceUrl: true});
          return true;
        }
      })
    );
  }
}