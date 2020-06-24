import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Hotel } from './hotel.model';
import { PaginatedHotel } from './paginatedHotel.model';


@Injectable({
  providedIn: 'root'
})
export class HotelService {

  readonly rootURL = "https://localhost:44331";
  public formDataHotel: Hotel;
  public selectedHotel: Hotel;
  public updateBtnHotelClicked = false;  
  public idCopied: number;  
  hotelList: PaginatedHotel[];


  constructor(private http: HttpClient,
              public toastr: ToastrService ) {   
                                                 
  }




  postHotel() {
    console.log(this.formDataHotel);
    return this.http.post(this.rootURL + '/hotels', this.formDataHotel);   
    
  }





  getHotels() {

    //let pageIndex = "0"
    //let itemsPerPage = "5";
    //let params = new HttpParams().set("page", pageIndex).set("itemsPerPage", itemsPerPage); //Create new HttpParams

    //return this.http.get<PaginatedHotel[]>(this.rootURL + '/hotels', {params: params});
       return this.http.get<Hotel[]>(this.rootURL + '/hotels');
  }






  updateHotel(formData: Hotel) {
    return this.http.put(this.rootURL + '/hotels/' + formData.Id, this.formDataHotel);    
  }





  deleteHotel(id) {
    return this.http.delete(this.rootURL + '/hotels/' + id);  
    
  }




  // GET: hotels/filter?city=a
  filterHotelsByCity(city) {

    //let pageIndex = "0";
    //let itemsPerPage = "5";
    //let params = new HttpParams().set("page", pageIndex).set("itemsPerPage", itemsPerPage); //Create new HttpParams
    //return this.http.get<PaginatedHotel[]>(this.rootURL + '/hotels/filter?city=' + city, { params: params });
    return this.http.get<Hotel[]>(this.rootURL + '/hotels/filter?city=' + city);
  }









  getHotelById(id) {
    return this.http.get<Hotel>(this.rootURL + '/hotels/' + id);
  }

}
