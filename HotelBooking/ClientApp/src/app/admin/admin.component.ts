import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/shared/user.service';
import { Router } from '@angular/router';


@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {

  private userLoggedIn: any;
  private btnViewUsersClick: boolean;


  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {

    this.userLoggedIn = this.userService.currentUserValue;
    console.log(this.userLoggedIn);
  }

  viewUsers() {
    console.log("clicked");
    this.btnViewUsersClick = true;
  }
}
