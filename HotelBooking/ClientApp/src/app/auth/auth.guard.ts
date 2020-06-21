import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }



  // with canActivate() function we will check whether an user
  // is authenticated or not using localStorage – userToken.
  // if not not authenticated, we will send him to login form.

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('userToken') != null)
      return true;
      this.router.navigate(['/login']);
      return false;
  }
}
