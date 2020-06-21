import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HotelReview } from './hotelReview.model';


@Injectable({
    providedIn: 'root'
})

export class HotelReviewService {

    readonly rootURL = "https://localhost:44331";
  selectedHotel: HotelReview;

    constructor(private http: HttpClient) { }



    getHotelById(id) {             
        console.log("id este " + id);
        return this.http.get<HotelReview>(this.rootURL + '/hotels/' + id);

    }

}
