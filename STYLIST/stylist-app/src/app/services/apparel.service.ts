import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apparel } from '../components/apparel/apparel';

@Injectable({
  providedIn: 'root',
})
export class ApparelService {
  private apiUrl = 'http://localhost:8080/apparel';
  private headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*'
    }

  private requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
    withCredentials: true
  };

  constructor(private httpClient: HttpClient) {}

  saveApparel(blob: Blob, type: string, colour: string) {
    const file = new File([blob], type + " " + colour);
    const formData: FormData = new FormData();

    formData.append('file', file); 
    formData.append('type', type);
    formData.append('colour', colour);

    const req = new HttpRequest('POST', `${this.apiUrl}/save`, formData, {
      reportProgress: true,
      responseType: 'json',
      withCredentials: true
    });

    return this.httpClient.request(req);
  }

  deleteApparel(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.apiUrl + `/delete/${id}`, this.requestOptions);
  }

  getApparelById(id: number): Observable<Apparel> {
    return this.httpClient.get<Apparel>(this.apiUrl + `/get/${id}`, this.requestOptions);
  }

  getApparelImage(id: number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/get-file/${id}`, {withCredentials: true, responseType: 'blob'});
  }

  getAllApparels(): Observable<HttpResponse<Apparel[]>> {      
      return this.httpClient.get<Apparel[]>(this.apiUrl + '/get-all', { observe: 'response', withCredentials: true });
  }

  getRandomOufit(): Observable<HttpResponse<Apparel[]>> {
    return this.httpClient.get<Apparel[]>(this.apiUrl + '/get-outfit', { observe: 'response', withCredentials: true });
  }

}