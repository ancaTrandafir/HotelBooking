import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Hotel } from '../shared/hotel.model';
import { HotelService } from '../shared/hotel.service';
import { PaginatedHotel } from '../shared/paginatedHotel.model';
import { UserService } from '../../user/shared/user.service';
import { User } from '../../user/shared/user.model';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styles: []
})

export class HotelListComponent implements OnInit {

  public hotelList: Hotel[];
  public filteredHotels: Hotel[];
  private userLoggedIn: User;
  errorMessage: string;
  submitPressed = false;


  //public maxSize: number = 7;
  //public directionLinks: boolean = true;
  //public autoHide: boolean = false;
  //public responsive: boolean = true;
  //public labels: any = {
  //  previousLabel: '<--',
  //  nextLabel: '-->',
  //  screenReaderPaginationLabel: 'Pagination',
  //  screenReaderPageLabel: 'page',
  //  screenReaderCurrentLabel: `You're on page`
  //};


 // config: any;
  
  page: number = 0;
  totalItems: number;



  constructor(private service: HotelService,
              private userService: UserService,
              private toastr: ToastrService) {

  
  }



  ngOnInit() {

  

    this.getAllHotels();
    console.log(this.hotelList);

    this.totalItems = this.hotelList.length;

    //this.config = {
    //  itemsPerPage: 5,
    //  currentPage: 0,
    //  totalItems: this.hotelList.length
    //};

    
  }




   
  onSubmit(form: NgForm) {
    this.submitPressed = true;
    this.getFilteredHotelsByCity(form);

  }




  getAllHotels() {

    console.log(event);

    this.service.getHotels()
      .toPromise()
      .then(response => {
        console.log(response);
        this.hotelList = response as Hotel[];
        this.userLoggedIn = this.userService.currentUserValue;
        console.log(this.hotelList);
      },
         error => {
           console.log(error);
         });

  }
  




  getFilteredHotelsByCity(form: NgForm) {

    console.log(form.value.city);

    this.service.filterHotelsByCity(form.value.city)   
      .toPromise()
      .then(response => {
        this.hotelList = response;
        console.log(this.hotelList);
        this.submitPressed = true;
      });
  }





  populateForm(hotel: Hotel)  
  {                           

    this.service.formDataHotel = Object.assign({}, hotel);    

    console.log(hotel);

    console.log(this.service.formDataHotel.HotelName);
  }





  onDelete(id) {
    console.log("id este " + id);
    if (confirm("Are you sure you want to delete this record?")) {

      this.service.deleteHotel(id)
        .subscribe(response => {
          this.service.getHotels(); 
          this.toastr.warning('Deleted successfully', 'Hotels');   
        },
          error => {
            console.log(error);
          });

    }
  }




  refreshList() {
    console.log("refresh clicked");
    this.getAllHotels();
  }








  

//pageChanged(event){
//  this.config.currentPage = event;
//}



}
