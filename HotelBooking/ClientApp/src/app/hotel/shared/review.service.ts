import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from './review.model';

@Injectable({
    providedIn: 'root'
})
export class ReviewService {

    readonly rootURL = "https://localhost:44331";
    reviewList: Review[];
    formDataReview: Review;
    selectedReview: Review;
    updateBtnReviewClicked: boolean;


    constructor(private http: HttpClient) {}
  


  postReview(formReview: Review) {
    console.log(formReview);
    return this.http.post(this.rootURL + '/reviews', formReview);   // POST function returns Observable

  }



  getReviews() {
    return this.http.get<Review[]>(this.rootURL + '/reviews')
 
  }



  getReviewById(id) {
        console.log("id este " + id);
      return this.http.get<Review>(this.rootURL + '/reviews/' + id);
       
    }




  updateReview() {
    console.log(this.selectedReview);
    return this.http.put(this.rootURL + '/reviews/' + this.selectedReview.Id, this.selectedReview);

  }



  deleteReview(id) {
    return this.http.delete(this.rootURL + '/reviews/' + id);  
  
  }


}
