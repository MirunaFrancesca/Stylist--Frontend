import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClothingItem } from '../components/clothing-item/clothing-item.model';

@Injectable({
  providedIn: 'root',
})
export class ClothingItemDataService {
  private apiUrl = 'http://localhost:8080/outfits/';
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

  getAllOutfits(): Observable<ClothingItem[]> {      
      return this.httpClient.get<ClothingItem[]>(this.apiUrl + 'all-outfits', this.requestOptions);
  }

  getPicture(): Observable<any> {
      const url = this.apiUrl + 'get-photo';
      return this.httpClient.get(
          url, {
              responseType: 'blob',
          });            
  }

  deleteOutfit(id: number): Observable<boolean>{
      return this.httpClient.delete<boolean>(this.apiUrl + 'delete-outfit' +`/${id}`, this.requestOptions);
  }

}