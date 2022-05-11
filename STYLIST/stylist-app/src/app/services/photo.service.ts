import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = 'http://localhost:8080/';
  public uploadImageData = new FormData();
  
  constructor(
    private httpClient: HttpClient, 
    private router: Router,) {
    }

  upload(blob: Blob): Observable<HttpEvent<any>> {
    const file = new File([blob], "try");
    const formData: FormData = new FormData();

    formData.append('file', file); 

    const req = new HttpRequest('POST', `${this.apiUrl}file/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      withCredentials: true
    });

    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}file/files/35bbc851-8831-4a44-8905-6847ffc716f6`, {withCredentials: true, responseType: 'blob'});
  }
  

}
