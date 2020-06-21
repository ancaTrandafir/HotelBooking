import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';     // Event Emitter pt submit reactive form
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { UserService } from '../../user/shared/user.service';
import { User } from '../../user/shared/user.model';
import { ReservationService } from '../shared/reservation.service';



@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styles: []
})




export class AddReservationComponent implements OnInit {


    idCopied: number;
    reservationReactiveForm: FormGroup;
    userLoggedIn: User;



    get Title() {
        return this.reservationReactiveForm.get('Guest');
    }

    get Description() {
      return this.reservationReactiveForm.get('NoOfPersons');
    }

    get Genre() {
      return this.reservationReactiveForm.get('ArrivalDate');
    }

    get Duration() {
      return this.reservationReactiveForm.get('DepartureDate');
    }

    get YearOfRelease() {
        return this.reservationReactiveForm.get('RoomType');
    }

    get Director() {
        return this.reservationReactiveForm.get('BreakfastIncluded');
    }




    // Form state
    loading = false;
    success = false;




  constructor(  public service: ReservationService,
                private location: Location,
                private fb: FormBuilder,
                private userService: UserService
    ) { }






  ngOnInit() {


        this.reservationReactiveForm = this.fb.group({
            Guest: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            NoOfPersons: ['', [Validators.required]],
            ArrivalDate: ['', [Validators.required]],
            DepartureDate: ['', [Validators.required]],
            RoomType: ['', [Validators.required, Validators.min(1900), Validators.max(2020)]],
            BreakfastIncluded: ['', [Validators.required]],
        });
    

    this.resetForm();   

    this.userLoggedIn = this.userService.currentUserValue;  

    console.log(this.userLoggedIn);
    }






  
    onSubmit(form) {

      this.reservationReactiveForm = form; 

      this.service.formDataReservation = this.reservationReactiveForm.value;

      this.service.formDataReservation.UserId = this.userLoggedIn.Id;   
      console.log(this.userLoggedIn);
      
        this.service.postReservation()
            .toPromise()
            .then(
                    response => {   
                    console.log("successfully added");
                    this.service.toastr.success('Submitted successfully', 'Reservations');  
                    this.resetForm();
                    this.service.getReservations(); 
                    this.location.back();
                },
                error => {
                    console.log(error)
                })

    }




    resetForm() {
        this.service.formDataReservation= {  
                        Id: 0,
                        Hotel: null,
                        Guest: '',
                        NoOfPersons: null,
                        ArrivalDate: null,
                        DepartureDate: null,
                        RoomType: null,
                        RoomFare: null,
                        BreakfastIncluded: null,
                        UserId: null,
                        User: null
                    }
           
    }




}
