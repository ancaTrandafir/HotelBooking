import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/shared/user.service';
import { User } from '../../user/shared/user.model';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../shared/reservation.model';


@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styles: []
})

export class ReservationDetailsComponent implements OnInit {

  public userThatAdeed: User;
  private copyOfSelectedReservation: Reservation;


  constructor(private reservationService: ReservationService,   
              private userService: UserService,  
              private activatedRoute: ActivatedRoute,
              private location: Location) { }







  ngOnInit(): void {

    this.getReservationById();

  }





  getReservationById(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log("id din details " + id);

    this.reservationService.getReservationById(id)    
      .toPromise()
      .then(response => {     
        this.reservationService.selectedReservation = response as Reservation;

        this.copyOfSelectedReservation = this.reservationService.selectedReservation;
      });

    //this.userService.getUserById(id)
    //  .toPromise()
    //  .then(response => {
    //    this.userThatAdeed = response as User;
    //  });

    console.log(this.userService.currentUserValue);
    console.log(this.reservationService.selectedReservation);
    console.log(this.reservationService.selectedReservation.User.FirstName);
    console.log(this.copyOfSelectedReservation);
  }









  goBack(): void {
    this.location.back();
  }
}














