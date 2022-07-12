import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apparel } from '../model/apparel';

@Injectable({
  providedIn: 'root',
})
export class ApparelService {
  private apiUrl = 'http://192.168.43.121:8080/apparel';
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

  private wardrobeNeedsRefresh = new BehaviorSubject<boolean>(null);
  
  constructor(private httpClient: HttpClient) {}

  saveApparel(id:number | undefined, blob: Blob, type: string, colour: string) {
    const file = new File([blob], type + " " + colour);
    const formData: FormData = new FormData();

    formData.append('file', file); 
    formData.append('type', type);
    formData.append('colour', colour);

    let req;

    if(!id) {
      req = new HttpRequest('POST', `${this.apiUrl}/save`, formData, {
        reportProgress: true,
        responseType: 'json',
        withCredentials: true
      });
    }
    else {
      req = new HttpRequest('PUT', `${this.apiUrl}/save/${id}`, formData, {
        reportProgress: true,
        responseType: 'json',
        withCredentials: true
      });
    }

    return this.httpClient.request(req);
  }

  deleteApparel(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.apiUrl + `/delete/${id}`, this.requestOptions);
  }

  getApparelById(id: number): Observable<Apparel> {
    return this.httpClient.get<Apparel>(this.apiUrl + `/get/${id}`, this.requestOptions);
  }

  getApparelImage(id: number): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/get-file/${id}`, { withCredentials: true, responseType: 'blob'});
  }

  getAllApparels(): Observable<HttpResponse<Apparel[]>> {      
      return this.httpClient.get<Apparel[]>(this.apiUrl + '/get-all', { observe: 'response', withCredentials: true });
  }

  getRandomOufit(): Observable<HttpResponse<Apparel[]>> {
    return this.httpClient.get<Apparel[]>(this.apiUrl + '/get-outfit', { observe: 'response', withCredentials: true });
  }

  notifyWardrobe(): void {
    this.wardrobeNeedsRefresh.next(true);
  }

  getWardrobeRefresh(): Observable<boolean> {
    return this.wardrobeNeedsRefresh.asObservable();
  }

  getSavedOutfits(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/get-saved-outfits', { observe:'response', withCredentials: true });  
  }

  saveOutfit(firstId: number, secondId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('idFirst', firstId.toString()); 
    if(secondId) formData.append('idSecond', secondId.toString());
    else formData.append('idSecond', "-1");

    let req = new HttpRequest('POST', `${this.apiUrl}/save-outfit`, formData, {
      reportProgress: true,
      responseType: 'text',
      withCredentials: true
    });

    return this.httpClient.request(req);
  }

  deleteOutfit(firstId: number, secondId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('idFirst', firstId.toString()); 
    if(secondId) formData.append('idSecond', secondId.toString());
    else formData.append('idSecond', "-1");

    let req = new HttpRequest('PUT', `${this.apiUrl}/delete-saved-outfit`, formData, {
      reportProgress: true,
      responseType: 'text',
      withCredentials: true
    });

    return this.httpClient.request(req);
  }

  isOutfitSaved(firstId: number, secondId: number): Observable<any> {
    let params;
    if(secondId) params = new HttpParams().set("idFirst", firstId).set("idSecond", secondId);
    else params = new HttpParams().set("idFirst", firstId).set("idSecond", -1); 

    return this.httpClient.get(`${this.apiUrl}/is-outfit-saved`, { observe:'response', withCredentials: true, params: params });

  }

}