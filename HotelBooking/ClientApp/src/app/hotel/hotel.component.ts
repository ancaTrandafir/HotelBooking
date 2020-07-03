import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user/shared/user.service';



@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html'
})
export class HotelComponent implements OnInit {

  private userLoggedIn: any;


  constructor(private userService: UserService

  ) { }

  ngOnInit() {

    this.userLoggedIn = this.userService.currentUserValue;
    console.log(this.userLoggedIn);
  }
}


