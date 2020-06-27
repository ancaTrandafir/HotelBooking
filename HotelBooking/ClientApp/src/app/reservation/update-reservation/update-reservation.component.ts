import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';
import { UserService } from '../../user/shared/user.service';
import { HotelService } from '../../hotel/shared/hotel.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styles: []
})
export class UpdateReservationComponent implements OnInit {

    idCopied: number;

  constructor(public reservationService: ReservationService,
              public userService: UserService,
              public hotelService: HotelService,
              private activatedRoute: ActivatedRoute,
              private location: Location
    ) { }






    ngOnInit() {
            this.autofillFormForUpdate();
       }






  
    onSubmit(formReservation: NgForm) {

            this.updateRecord(formReservation); 
      
    }






    updateRecord(formReservation: NgForm) {  

      console.log(formReservation.value);

      formReservation.value.Id = +this.activatedRoute.snapshot.paramMap.get('id');
      formReservation.value.UserId = this.userService.currentUserValue.Id;
      formReservation.value.HotelId = this.reservationService.getHotelFromReservationSelected().Id;

      console.log(formReservation.value);

        this.reservationService.updateReservation(formReservation.value) 
            .toPromise()
            .then(
                    response => {   
                    console.log("successfully updated");
                    this.reservationService.toastr.info('Updated successfully', 'Reservations');  
                    this.reservationService.getReservations(); 
                    this.location.back();
                },

                error => {
                    console.log(error)
                })
    }






  autofillFormForUpdate() {

        this.reservationService.formDataReservation.Id = this.reservationService.idCopied;
        console.log(this.reservationService.formDataReservation.Id);

        this.reservationService.formDataReservation;
        console.log(this.reservationService.formDataReservation);
        
    }




}
