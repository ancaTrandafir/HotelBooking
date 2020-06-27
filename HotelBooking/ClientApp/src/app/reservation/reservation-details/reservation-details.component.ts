import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/shared/user.service';
import { User } from '../../user/shared/user.model';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../shared/reservation.model';
import { RouterModule } from '@angular/router';
import { HotelService } from '../../hotel/shared/hotel.service';
import { Hotel } from '../../hotel/shared/hotel.model';


@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styles: []
})

export class ReservationDetailsComponent implements OnInit {

  public userThatAdeed: User;
  private selectedReservation: Reservation;


  constructor(private reservationService: ReservationService,   
              private userService: UserService,
              private hotelService: HotelService,
              private activatedRoute: ActivatedRoute,
              private route: RouterModule,
              private location: Location) { }







  ngOnInit(): void {

    this.getReservationById();
    this.getHotelFromReservationSelected();
    console.log(this.selectedReservation);

  }







  getReservationById(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log("id din details " + id);

    this.reservationService.getReservationById(id)    
      .toPromise()
      .then(response => {     
        this.reservationService.selectedReservation = response as Reservation;
      
      });


  }







  getHotelFromReservationSelected() {

    this.reservationService.getHotelFromReservationSelected();

    //console.log(this.reservationService.selectedReservation.HotelId);

    //this.hotelService.getHotelById(this.reservationService.selectedReservation.HotelId)
    //  .toPromise()
    //  .then(response => {
    //    this.reservationService.selectedReservation.Hotel = response as Hotel;
    //    console.log(this.reservationService.selectedReservation.Hotel);
    //  });


    this.reservationService.selectedReservation.User = this.userService.currentUserValue;

    this.selectedReservation = this.reservationService.selectedReservation;
    console.log(this.selectedReservation);

    console.log(this.userService.currentUserValue);
    console.log(this.reservationService.selectedReservation);
    console.log(this.reservationService.selectedReservation.User.FirstName);
    
  }






  goBack(): void {
    this.location.back();
  }








  updateBtnClicked(): void {    // apas buton de edit si asignez lui form val lui selectedReservation

    this.reservationService.formDataReservation = this.reservationService.selectedReservation;
    this.reservationService.idCopied = this.selectedReservation.Id;   // copiez valoare id si apelez din la update
  }


}














