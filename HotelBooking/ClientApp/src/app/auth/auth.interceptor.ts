import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap } from "rxjs/internal/operators";
import { UserService } from '../user/shared/user.service';


// To consume the Web API method we have not appended the accessToken.
// It would be difficult to append accessToken to every Web API call
// and we have to handle the 401 UnAuthorized Response in each of them (if access token expires).




@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private userService : UserService,
              private router: Router) { }


  // With the first IF statement, we will check the condition No-Auth is True / False.
  // If it is true we don’t need to append the access token. So we can set No - Auth as true
  // for web api calls which does not need authorization.
  // Then we check whether the user is authenticated or not.
  // If authenticated then we will append the access token in request header.
  // We must use the prefix Bearer while passing Authorization Access Token in request header.
  // Inside the error function, we handle 401 Unauthorized Status Code – most often it can appear due to token expiration.



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // add authorization header with jwt token if available
      let currentUser = this.userService.currentUserValue;
      if (currentUser && currentUser.Token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.Token}`
          }
        });
      }

      return next.handle(request)
           .pipe(
                tap(
                  succ => { },
                  err => {
                    if (err.status === 401)
                        this.router.navigateByUrl('/login');
                }
                ));
        

        
    }
}
