import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user/shared/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) { }



  // with canActivate() function we will check whether an user
  // is authenticated or not using localStorage – userToken.
  // if not not authenticated, we will send him to login form.

  //canActivate(
  //  route: ActivatedRouteSnapshot,
  //  state: RouterStateSnapshot): boolean {

  //  const user = this.userService.currentUserValue;

  //  // intai verific token ca e valid, adica exista, apoi verific rol
  //  if (localStorage.getItem('userToken') != null)

  //    if (user) {
  //      // check if route is restricted by role
  //      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
  //        // role not authorised so redirect to home page
  //        this.router.navigate(['/']);
  //        return false;
  //      }

  //      // authorised so return true
  //      return true;
  //    }

  //  // not logged in so redirect to login page with the return url
  //  this.router.navigate(['/login']);
  //  return false;
  //}






  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.userService.currentUserValue;
    if (user) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

     // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
   }


  
}
