import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { UserService } from './shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})

export class UserComponent implements OnInit {

  //create array to store user data we need
  userData: any[] = [];
  // create a field to hold error messages so we can bind it to our template
  resultMessage: string;



  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router) { }



  ngOnInit() {
    this.authService.signOut();
    this.userService.logout();
  }





  //logIn with facebook method. Takes the platform (Facebook) parameter.
  logInWithFacebook(platform: string): void {

    console.log("facebook clicked");

    platform = FacebookLoginProvider.PROVIDER_ID;
    //Sign In and get user Info using authService that we just injected
    this.authService.signIn(platform).then(

      (response) => {
        //Get all user details
        console.log(platform + ' logged in user data is= ', response);

        //Take the details we need and store in an array
        this.userData.push({

        //  Id: response.id,    // in baza mea de date id se autoincrementeaza
          FirstName: response.firstName,
          LastName: response.lastName,
          Email: response.email,
        //  Username: response.name,
          PictureURL: response.photoUrl,
          Token: response.authToken // creez propriul JWT token in API

        });

        console.log(this.userData[0]);

        this.userService.FBAuthentication(this.userData[0]).subscribe(
          result => {
            console.log('success', result);
            this.router.navigate(['localhost:4200/home']);
          },
          error => {
            this.resultMessage = 'it didn\'t work and that sucks';
            console.log(error);
          }
        );

      },
      (error) => {
        console.log(error);
        this.resultMessage = error;
      });
  
  }

}

