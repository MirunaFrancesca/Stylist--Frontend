import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AlertController, IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClothingItemDataService } from './services/clothing-item-data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutoLoginGuard } from './security/guard/auto-login.guard';
import { AuthGuard } from './security/guard/auth.guard';
import { AuthInterceptor } from './security/interceptor/auth-interceptor';
import { PhotoService } from './services/photo.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
  ],
  // providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  //   ClothingItemDataService
  // ],
  providers: [{ provide : RouteReuseStrategy, useClass: IonicRouteStrategy },
    ClothingItemDataService, PhotoService, AutoLoginGuard, AuthGuard, AlertController,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }], 
  bootstrap: [AppComponent],
})
export class AppModule {}
