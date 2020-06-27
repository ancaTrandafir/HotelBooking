import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/shared/user.service';


@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {

  private userLoggedIn: any;  


  constructor(private userService: UserService
   
  ) { }

  ngOnInit() {

    this.userLoggedIn = this.userService.currentUserValue;
    console.log(this.userLoggedIn);
  }
}
