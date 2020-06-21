import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';


@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styles: []
})
export class UpdateReservationComponent implements OnInit {

    idCopied: number;

    constructor(public service: ReservationService,
        private location: Location
    ) { }






    ngOnInit() {

        if (this.service.updateBtnReservationClicked == true) 
            this.autofillFormForUpdate();

       }








    resetForm(formReservation?: NgForm) {   

        if (formReservation != null) {
            console.log(this.idCopied);
            formReservation.form.reset();  
        }
      
        this.service.updateBtnReservationClicked = false;  
        this.service.formDataReservation.Id = 0;
    }   






  
    onSubmit(formReservation: NgForm) {

            this.updateRecord(formReservation); 
            formReservation.reset(); 
            this.service.updateBtnReservationClicked == false;       
    }






    updateRecord(formReservation: NgForm) {  

      console.log(formReservation);

        this.service.updateReservation(formReservation.value) 
            .toPromise()
            .then(
                    response => {   
                    console.log("successfully updated");
                    this.service.toastr.info('Updated successfully', 'Reservations');  
                    this.resetForm(formReservation);
                    this.service.getReservations(); 
                    this.location.back();
                },

                error => {
                    console.log(error)
                })
    }






    autofillFormForUpdate() {
      this.service.formDataReservation.Id = this.service.idCopied;
        console.log(this.service.formDataReservation.Id);
        this.service.formDataReservation;
        console.log(this.service.formDataReservation);
        
    }




}
