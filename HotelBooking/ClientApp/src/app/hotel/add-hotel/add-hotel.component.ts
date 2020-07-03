import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';     
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { UserService } from '../../user/shared/user.service';
import { User } from '../../user/shared/user.model';
import { HotelService } from '../shared/hotel.service';



@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styles: []
})




export class AddHotelComponent implements OnInit {


    idCopied: number;
    hotelReactiveForm: FormGroup;
    userLoggedIn: User;



    get HotelName() {
        return this.hotelReactiveForm.get('HotelName');
    }

    get City() {
        return this.hotelReactiveForm.get('City');
    }

    get Capacity() {
        return this.hotelReactiveForm.get('Capacity');
    }


    loading = false;
    success = false;




  constructor(  public service: HotelService,
                private location: Location,
                private fb: FormBuilder
    ) { }






  ngOnInit() {


        this.hotelReactiveForm = this.fb.group({
            HotelName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            City: ['', [Validators.required]],
            Capacity: ['', [Validators.required, Validators.min(1)]]
        
        });
    

    this.resetForm();   

    }






  
    onSubmit(form) {

      this.hotelReactiveForm = form;

      this.service.formDataHotel= this.hotelReactiveForm.value;
 
   
        this.service.postHotel()
            .toPromise()
            .then(
                    response => {    
                    console.log("successfully added");
                    this.service.toastr.success('Submitted successfully', 'Hotels');                    this.resetForm();
                    this.service.getHotels();
                    this.location.back();
                },
                error => {
                    console.log(error)
                })

    }




    resetForm() {
        this.service.formDataHotel = { 
                        Id: 0,
                        HotelName: '',
                        City: '',
                        Capacity: null,
                        Rating: null,
                        CountUser: null
                    }
           
    }




}
