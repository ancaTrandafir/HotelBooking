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
  


  postReview() {    
    return this.http.post(this.rootURL + '/reviews', this.formDataReview);   // POST function returns Observable

  }



  getReviews() {
    return this.http.get<Review[]>(this.rootURL + '/reviews')
 
  }



  getReviewById(id) {
        console.log("id este " + id);
      return this.http.get<Review>(this.rootURL + '/reviews/' + id);
       
    }




  updateReview(formData: Review) {
      return this.http.put(this.rootURL + '/reviews/' + formData.Id, this.formDataReview);

  }



  deleteReview(id) {
    return this.http.delete(this.rootURL + '/reviews/' + id);  
  
  }


}
