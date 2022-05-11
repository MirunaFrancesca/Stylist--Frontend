import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {Storage} from '@capacitor/storage';
import { TOKEN_KEY } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleIntercept(req, next));
  }

  async handleIntercept(req: HttpRequest<any>,
                        next: HttpHandler){
    const idToken = await Storage.get({key: TOKEN_KEY});

    if (idToken && idToken.value) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + idToken.value)
      });
      return next.handle(cloned).toPromise();
    }
    else {
      return next.handle(req).toPromise();
    }
  }
}