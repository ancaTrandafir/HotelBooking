import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { AuthService, SocialUser } from 'angularx-social-login';
import { HotelService } from '../../hotel/shared/hotel.service';
import { Hotel } from '../../hotel/shared/hotel.model';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})

export class UsersListComponent implements OnInit {

  private users: User[];
  private hotelList: Hotel[];
  private currentUser: any;
  readonly rootURL = "https://localhost:44331";
  private filterUsersClicked = false;



  constructor(private userService: UserService,
    private hotelService: HotelService) { }



  ngOnInit() {
    this.currentUser = this.userService.currentUserValue;
    console.log(this.currentUser);

    if (this.filterUsersClicked == false) this.getUsers()
      else this.filterUsersByCountRes();

    this.getHotels();
    console.log(this.getHotels);
  }




  getUsers() {
    this.userService.getUsers()
      // .subscribe(data => this.users = data);
      .toPromise()
      .then(data => {
        this.users = data;
        console.log(this.users);

      });
  }







  getHotels() {
    this.hotelService.getHotels()
      // .subscribe(data => this.users = data);
      .toPromise()
      .then(data => {
        this.hotelList = data;
        console.log(data);

      });
  }






  filterUsersByCountRes(form?: NgForm) {
    console.log("count from form " + form.value.count);
    this.userService.countResToBeFiltered = form.value.count;

    this.userService.filterUsersByCountRes()
      .toPromise()
      .then(response => {
        this.users = response;
        console.log(this.users);
        this.filterUsersClicked == false;   // resetez inapoi la false
      });
  }




  refreshList() {
    console.log("refresh clicked");
    this.getUsers();
  }
}

