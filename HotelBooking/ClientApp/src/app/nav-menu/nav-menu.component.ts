import { Component, OnInit } from '@angular/core';
import { User } from '../user/shared/user.model';
import { Router } from '@angular/router';
import { UserService } from '../user/shared/user.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { FBUser } from '../user/shared/FBUser.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {


  userLoggedIn: User;
//  FBUserLoggedIn: FBUser;
  private socialUser: SocialUser;
  private FBLoggedIn: boolean;


  constructor(private router: Router,
              private userService: UserService,
              private authService : AuthService) { }



  ngOnInit() {

    // afisez componenta de add-movie doar daca user-ul e logat cu ngIf in html
    if (this.userService.currentUserValue != null)
      this.userLoggedIn = this.userService.currentUserValue;

    else
      if (this.userService.FBAuthentication != null)
        this.userFB();

    console.log(this.userLoggedIn);
    console.log(this.socialUser);
  }



  Logout() {
    this.userService.logout();
    this.authService.signOut();
    this.router.navigate(['/login']);
  }




  userFB() {
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      this.FBLoggedIn = true;
    });
  }



  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
