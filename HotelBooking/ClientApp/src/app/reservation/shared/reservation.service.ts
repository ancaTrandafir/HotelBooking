import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Reservation } from './reservation.model';
import { HotelService } from '../../hotel/shared/hotel.service';
import { Hotel } from '../../hotel/shared/hotel.model';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  readonly rootURL = "https://localhost:44331";
  public formDataReservation: Reservation;
  public selectedReservation: Reservation;
  public idCopied: number;  // copiez id sa pot apela la update pt ca voi redefini id ca undefined intre timp
  reservationList: Reservation[];


  constructor(private http: HttpClient,
    public toastr: ToastrService,
    private hotelService: HotelService) { }




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







  updateReservation(formData) {

    console.log(formData);

    return this.http.put(this.rootURL + '/reservations/' + this.idCopied, formData);
      // in idCopied e copiata valoarea id caruia i se face update; daca zic this.formData.Id e undefined pt ca l-am resetat in Add-Movie
  }





  deleteReservation(id) {
    return this.http.delete(this.rootURL + '/reservations/' + id);

  }




  // GET: reservations/filter?from=a&to=b
  filterReservationsByDate(from, to) {
    return this.http.get<Reservation[]>(this.rootURL + '/reservations/byDates?from=' + from + '&to=' + to);
  }






  // GET: reservations/filter?userId=a
  filterReservationsByUserId(userId) {
    return this.http.get<Reservation[]>(this.rootURL + '/reservations/byUser?userId=' + userId);
  }



  // GET: reservations/filter?userId=a&from=b&to=c
  filterReservationsByUserAndDate(userId, from, to) {
    return this.http.get<Reservation[]>(this.rootURL + '/reservations/byUserAndDates?userId=' + userId + '&from=' + from + '&to=' + to);
  }





  public getHotelFromReservationSelected() {

    console.log(this.selectedReservation.HotelId);

    this.hotelService.getHotelById(this.selectedReservation.HotelId)
      .toPromise()
      .then(response => {
        this.selectedReservation.Hotel = response as Hotel;
        console.log(this.selectedReservation.Hotel);
      });

    return this.selectedReservation.Hotel;
  }



}
