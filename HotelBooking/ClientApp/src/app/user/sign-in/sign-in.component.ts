import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: []
})
export class SignInComponent implements OnInit {

  isLoginError: boolean = false;
  loading = false;
  returnUrl: string;


  constructor(private userService: UserService,
              private router: Router) { }



  ngOnInit() {
	    sessionStorage.removeItem('currentUser');
        sessionStorage.clear(); 

  }
  




  // Inside the OnSubmit() function, we have two arrow function, for success and error response.
  // If user authentication is successful, we save the accessToken in localStorage(in web browser).
  // because we need this token to authenticate the user

  onSubmit(username, password) {

    this.loading = true;

    this.userService.userAuthentication(username, password)

      .pipe(first())
      .subscribe(data => {

        console.log("a intrat");;
        this.router.navigate(['localhost:4200/home']);  // intra pe pageNotFound si am facut un work-around sa ma redirectioneze care home, vezi app-routing.module

      },

       (err: HttpErrorResponse) => {
         this.isLoginError = true;
         this.loading = false;
      });
  }

  // If authentication fails, isLogin is set to true, based on this property
  // we will show an error message just above the login form.

  
  

}
