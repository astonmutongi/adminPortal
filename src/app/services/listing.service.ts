import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService  } from '../services/baseService';
export interface Video {
    title: string;
    embed: string;
}
export interface Competetion {
    name: string;
    id: string;
    medurlia: string;
}

export interface ListingView {
  listingId: string;
  title: string;
  description:string;
  createdate: string;
  coverimage:string;
  price:string;  
}

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  apiBaseURL: string = this.baseService.apiBaseURL;
  api: string = this.apiBaseURL + "Listing/newlist";

  constructor(private http: HttpClient, private baseService: BaseService) {  }

  getUsers(): Observable<ListingView[]> {

    return this.http.get<ListingView[]>(this.api)
  }
}
