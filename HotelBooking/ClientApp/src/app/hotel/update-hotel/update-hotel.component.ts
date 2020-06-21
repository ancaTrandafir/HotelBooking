import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HotelService } from '../shared/hotel.service';


@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styles: []
})
export class UpdateHotelComponent implements OnInit {

    idCopied: number;

    constructor(public service: HotelService,
        private location: Location
    ) { }






    ngOnInit() {

        if (this.service.updateBtnHotelClicked == true) 
            this.autofillFormForUpdate();

       }








    resetForm(formHotel?: NgForm) {    

        if (formHotel!= null) {
            console.log(this.idCopied);
            formHotel.form.reset();  
           
        }
    
        this.service.updateBtnHotelClicked = false;   
        this.service.formDataHotel.Id = 0; 
    }   






  
    onSubmit(formHotel: NgForm) {

            this.updateRecord(formHotel); 
            formHotel.reset();  
            this.service.updateBtnHotelClicked == false;   
        
    }






    updateRecord(formHotel: NgForm) {  

        console.log(formHotel);
        this.service.updateHotel(formHotel.value) 
            .toPromise()
            .then(
                    response => {    
                    console.log("successfully updated");
                    this.service.toastr.info('Updated successfully', 'Hotels');  
                    this.resetForm(formHotel);
                    this.service.getHotels(); 
                    this.location.back();
                },

                error => {
                    console.log(error)
                })
    }






    autofillFormForUpdate() {
        this.service.formDataHotel.Id = this.service.idCopied;   
        console.log(this.service.formDataHotel.Id);
        this.service.formDataHotel;
        console.log(this.service.formDataHotel);
        
    }




}
