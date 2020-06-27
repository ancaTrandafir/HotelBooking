import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';     // Event Emitter pt submit reactive form
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { UserService } from '../../user/shared/user.service';
import { User } from '../../user/shared/user.model';
import { ReservationService } from '../shared/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../hotel/shared/hotel.service';
import { Hotel } from '../../hotel/shared/hotel.model';



@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styles: []
})




export class AddReservationComponent implements OnInit {


    idCopied: number;
    reservationReactiveForm: FormGroup;
    userLoggedIn: User;
    hotelBooked: Hotel;



    get Guest() {
        return this.reservationReactiveForm.get('Guest');
    }

    get NoOfPersons() {
      return this.reservationReactiveForm.get('NoOfPersons');
    }

    get ArrivalDate() {
      return this.reservationReactiveForm.get('ArrivalDate');
    }

    get DepartureDate() {
      return this.reservationReactiveForm.get('DepartureDate');
    }

    get RoomType() {
        return this.reservationReactiveForm.get('RoomType');
    }

    get BreakfastIncluded() {
        return this.reservationReactiveForm.get('BreakfastIncluded');
    }




    // Form state
    loading = false;
    success = false;




  constructor(  public reservationService: ReservationService,
                private location: Location,
                private fb: FormBuilder,
                private userService: UserService,
                private hotelService: HotelService,
                private activatedRoute: ActivatedRoute
    ) { }






  ngOnInit() {


        this.reservationReactiveForm = this.fb.group({
            Guest: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            NoOfPersons: ['', [Validators.required]],
            ArrivalDate: ['', [Validators.required]],
            DepartureDate: ['', [Validators.required]],
            RoomType: ['', [Validators.required, Validators.min(1900), Validators.max(2020)]]
          //  BreakfastIncluded: ['', [Validators.required]]
        });
    

    this.resetForm();   

    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log("idHotel din URL " + id);

    this.userLoggedIn = this.userService.currentUserValue;
    this.hotelService.getHotelById(id)
      .toPromise()
      .then(
        response => {
          this.hotelBooked = response;
          console.log(response);
        },
        error => {
          console.log(error)
        })


    console.log(this.userLoggedIn);
    console.log(this.hotelBooked);
    }






  
    onSubmit(form) {

      this.reservationReactiveForm = form; 

      this.reservationService.formDataReservation = this.reservationReactiveForm.value;

      this.reservationService.formDataReservation.UserId = this.userLoggedIn.Id;
      this.reservationService.formDataReservation.User = this.userLoggedIn;     // transmit catre backend tokenUser
      this.reservationService.formDataReservation.HotelId = this.hotelBooked.Id;
      this.reservationService.formDataReservation.Hotel = this.hotelBooked;
      console.log(this.userLoggedIn);
      
        this.reservationService.postReservation()
            .toPromise()
            .then(
                    response => {   
                    console.log("successfully added");
                    this.reservationService.toastr.success('Submitted successfully', 'Reservations');  
                    this.resetForm();
                    this.reservationService.getReservations(); 
                    this.location.back();
                },
                error => {
                    console.log(error)
                })

    }




    resetForm() {
        this.reservationService.formDataReservation= {  
                        Id: 0,
                        Hotel: null,
                        Guest: '',
                        NoOfPersons: null,
                        ArrivalDate: null,
                        DepartureDate: null,
                        RoomType: null,
                        RoomFare: null,
                        BreakfastIncluded: true,
                        UserId: null,
                        HotelId: null,
                        User: null
                    }
           
    }




}
