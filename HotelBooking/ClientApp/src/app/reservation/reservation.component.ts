import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user/shared/user.service';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit {


  constructor(public userService: UserService) { }


  ngOnInit() {
  }






}

