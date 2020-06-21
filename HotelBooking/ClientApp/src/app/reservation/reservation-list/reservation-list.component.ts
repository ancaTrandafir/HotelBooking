import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from '../shared/reservation.model';
import { ReservationService } from '../shared/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styles: []
})

export class ReservationListComponent implements OnInit {

  public reservationList: Reservation[];
  public filteredReservations: Reservation[];
  errorMessage: string;
  submitPressed = false;



  constructor(private service: ReservationService,
              private toastr: ToastrService) { }




  ngOnInit() {

    this.getAllReservations();
    console.log(this.reservationList);

  }




   

  onSubmit(form: NgForm) {
    this.submitPressed = true; 
    this.getFilteredReservationsByDate(form);

  }




  getAllReservations() {

    this.service.getReservations()
      .toPromise()
      .then(response => {
        console.log(response);
        this.reservationList = response as Reservation[]
      },
         error => {
           console.log(error);
         });

  }
  



  getFilteredReservationsByDate(form: NgForm) {

    console.log(form.value.from);

    this.service.filterReservationsByDate(form.value.from, form.value.to)     
      .toPromise()
      .then(response => {
        this.reservationList = response;
        console.log(this.reservationList)
      });
  }





  populateForm(reservation: Reservation) {

    this.service.formDataReservation= Object.assign({}, reservation); 
    console.log(reservation.Guest);
    console.log(this.service.formDataReservation.Guest);
  }






  onDelete(id) {
    console.log("id este " + id);
    if (confirm("Are you sure you want to delete this record?")) {

      this.service.deleteReservation(id)
        .subscribe(response => {
          this.service.getReservations(); 
          this.toastr.warning('Deleted successfully', 'Reservations');   
        },
          error => {
            console.log(error);
          });

    }
  }



  refreshList() {
    console.log("refresh clicked");
    this.getAllReservations();
  }
}
