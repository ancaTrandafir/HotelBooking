import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/shared/user.service';
import { User } from '../../user/shared/user.model';
import { Review } from '../shared/review.model';
import { HotelReview } from '../shared/hotelReview.model';
import { HotelReviewService } from '../shared/hotelReview.service';
import { ReviewService } from '../shared/review.service';


@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styles: []
})

export class HotelDetailsComponent implements OnInit {

  public reviews: Review[];
  public idReviewSelected: number;
  public reviewToBeUpdated: Review;
  public copyOfSelectedReview: HotelReview;
  private userLoggedIn;
  private hotelId: number;


  constructor(private hotelReviewService: HotelReviewService,   
              private reviewService: ReviewService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private location: Location) { }






  ngOnInit(): void {

    this.hotelId = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log("id din URL" + this.hotelId);

    this.userLoggedIn = this.userService.currentUserValue;

    this.getHotelById();
  
    this.resetForm();   

  }





  getHotelById(): void {

    this.hotelReviewService.getHotelById(this.hotelId)   

      .toPromise()
      .then(response => {     
        this.hotelReviewService.selectedHotel = response as HotelReview;
     
        this.copyOfSelectedReview = this.hotelReviewService.selectedHotel;
        console.log(this.copyOfSelectedReview);
      });

  
  }






  resetForm(formReview?: NgForm) {    

    if (formReview!= null)
      formReview.form.reset();  

    this.reviewService.formDataReview = {  
      Id: 0,
      HotelId: 0,
      UserId: 0,
      Text: '',
      Rating: 0
    }


    this.reviewToBeUpdated = { 
      Id: 0,
      HotelId: 0,
      UserId: 0,
      Text: '',
      Rating: 0
    }

    this.reviewService.formDataReview.Id = 0; 

  }




  onSubmit(formReview: NgForm) {


    if (this.reviewService.formDataReview.Id == 0)
      this.insertRecord(formReview);

    else  
      this.updateRecord(formReview);

  }





  insertRecord(formReview: NgForm) {

    formReview.value.Id = this.reviewToBeUpdated.Id;
    formReview.value.HotelId = this.hotelId;
    formReview.value.UserId = this.userLoggedIn.Id;

    console.log(formReview.value);

    this.reviewService.postReview(formReview.value)      
      .toPromise()
      .then(
        response => {    
         // console.log(this.reviewService.formReview);
          this.resetForm(formReview);
          this.getHotelById();   
        },

        error => {
          console.log(error)
        })
  }





  
  updateRecord(formReview: NgForm) {

    formReview.value.Id = this.reviewToBeUpdated.Id;
    formReview.value.HotelId = this.hotelId;
    formReview.value.UserId = this.userLoggedIn.Id;

    console.log(formReview.value);

    this.reviewService.selectedReview = formReview.value;

    this.reviewService.updateReview()
      .toPromise()
      .then(response => {   
         this.resetForm(formReview);
          this.getHotelById();
          this.reviewService.updateBtnReviewClicked = false;
          console.log("Update review successfully");
      },

        error => {
          console.log(error)
        })

    //this.resetForm(formReview);
    //this.getHotelById();
    //this.reviewService.updateBtnReviewClicked = false;

  }







 
  populateForm(r) {
                       
    console.log(this.copyOfSelectedReview);
    console.log(this.reviewService.getReviewById(r.Id));

    this.reviewService.getReviewById(r.Id)
      .toPromise()
      .then(result => {
        this.reviewService.selectedReview = result;

        console.log("review selectat este " + this.reviewService.selectedReview.Text);

        this.reviewToBeUpdated.Id = this.reviewService.selectedReview.Id;     
        this.reviewToBeUpdated.HotelId = this.reviewService.selectedReview.HotelId;       
        this.reviewToBeUpdated.Text = this.reviewService.selectedReview.Text
        this.reviewToBeUpdated.Rating = this.reviewService.selectedReview.Rating;

        console.log(this.reviewToBeUpdated);

      }, error => console.error(error));


    this.reviewService.formDataReview = this.reviewToBeUpdated;    

    console.log(this.reviewService.formDataReview.Text);
  }         








 




  onDelete(id) {
    console.log(id);
    this.reviewService.deleteReview(id)
      .subscribe(response => {
        console.log("successfully deleted");
        this.getHotelById(); 
      },
        error => {
          console.log(error);
        });

  }





  goBack(): void {
    this.location.back();
  }
}














