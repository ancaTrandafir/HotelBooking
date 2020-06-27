import { Component, OnInit } from '@angular/core';
import { User } from '../user/shared/user.model';
import { UserService } from '../user/shared/user.service';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  private userLoggedIn: any;  // fie localUser, fie socialUser


  constructor(private userService: UserService,
              private router: Router
    //  private authService : AuthService
  ) { }

  ngOnInit() {

    //if (localStorage.getItem('currentUser') != null)
     

    //// normal user
    //if (this.userService.currentUserValue)
    //  this.userLoggedIn = this.userService.currentUserValue;

    //else

    //  // social user
  
    //this.authService.authState.subscribe((user) => {
    //  this.socialUser = user;
    //  this.FBLoggedIn = true;
    //});

    this.userLoggedIn = this.userService.currentUserValue;

    console.log(this.userLoggedIn);
  }


  fetchReservationsForId(id) {
    this.router.navigate(['fetch-reservations/' + id]);
  }



}


