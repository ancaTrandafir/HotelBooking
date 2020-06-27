import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Reservation } from '../shared/reservation.model';
import { ReservationService } from '../shared/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styles: []
})

export class ReservationListComponent implements OnInit {

  idUser: any
  public reservationList: Reservation[];
  public filteredReservations: Reservation[];
  errorMessage: string;
  submitPressed = false;





  constructor(private service: ReservationService,
              private toastr: ToastrService,
              private router: RouterModule,
              private activatedRoute: ActivatedRoute) { }




  ngOnInit() {

    this.idUser = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log("idUser din URL " + this.idUser);

    this.getReservationsByUserId();
    console.log(this.reservationList);

  }




   

  onSubmit(form: NgForm) {
    this.submitPressed = true; 
    this.getUserFilteredReservationsByDate(form);

  }




  //getAllReservations() {

  //  this.service.getReservations()
  //    .toPromise()
  //    .then(response => {
  //      console.log(response);
  //      this.reservationList = response as Reservation[]
  //    },
  //       error => {
  //         console.log(error);
  //       });

  //}






  getReservationsByUserId() {

    this.service.filterReservationsByUserId(this.idUser)
      .toPromise()
      .then(response => {
        console.log(response);
        this.reservationList = response as Reservation[]
      },
        error => {
          console.log(error);
        });

  }
  
  



  getUserFilteredReservationsByDate(form: NgForm) {

    console.log(form.value.from);

    this.service.filterReservationsByUserAndDate(this.idUser, form.value.from, form.value.to)     
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
    this.getReservationsByUserId();
  }
}
