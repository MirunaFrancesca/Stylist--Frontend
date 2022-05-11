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

  //this is for blob handling 

  // this.getFileService
  //     .getFile(this.method, this.appUserId)
  //     .subscribe((blob: any) => {
  //       let objectURL = URL.createObjectURL(blob);
  //       this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //       this.hasProfileImage = true;
  //     });

  // public sendData(blob: Blob) {
  //   const url = this.apiUrl + 'upload-image';
  //   const fileObj = new File([blob], "try");
  //   this.uploadImageData.append('imageFile', fileObj, fileObj.name);

  //   const headerDict = {
  //     'Accept': '*',
  //     'Access-Control-Allow-Headers': '*',
  //     'Access-Control-Allow-Origin': '*'
  //   }

  //   const requestOptions = {                                                                                                                                                                                 
  //     //headers: new HttpHeaders(headerDict), 
  //     withCredentials: true
  //   };

  //   console.log(this.uploadImageData);

  //   this.httpClient.post(url, this.uploadImageData, requestOptions).subscribe(
  //     (response) => {
  //       alert("good");
  //     },
  //     (error) => {
  //       alert("bad");
  //     }
  //   )
  // }

  // public getImage(id: number){
  //   const url = this.apiUrl + 'get-image';

  //   this.httpClient.get(url + id)
  //       .subscribe(
  //         res => {
  //           // this.base64Data = res.picByte;
  //           // this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //         }
  //       );
  // }


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
