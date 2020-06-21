import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Reservation } from './reservation.model';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  readonly rootURL = "https://localhost:44331";
  public formDataReservation: Reservation;
  public selectedReservation: Reservation;
  public updateBtnReservationClicked = false;  
  public idCopied: number;  
  reservationList: Reservation[];


  constructor(private http: HttpClient,
              public toastr: ToastrService ) { }




  postReservation() {
    console.log(this.formDataReservation);
    return this.http.post(this.rootURL + '/reservations', this.formDataReservation);  
    
  }





  getReservations() {
    return this.http.get<Reservation[]>(this.rootURL + '/reservations');
     
  }






  getReservationById(id) {
    return this.http.get<Reservation>(this.rootURL + '/reservations/' + id);
  }







  updateReservation(formData: Reservation) {
    return this.http.put(this.rootURL + '/reservations/' + formData.Id, this.formDataReservation);

  }





  deleteReservation(id) {
    return this.http.delete(this.rootURL + '/reservations/' + id);  
    
  }




  // GET: reservations/filter?from=a&to=b
  filterReservationsByDate(from, to) {
    return this.http.get<Reservation[]>(this.rootURL + '/reservations/filter?from=' + from + '&to=' + to);
  }






  // GET: reservations/filter?userId=a
  filterReservationsByUserId(userId) {
    return this.http.get<Reservation[]>(this.rootURL + '/reservations/filter?userId=' + userId);
  }



}
