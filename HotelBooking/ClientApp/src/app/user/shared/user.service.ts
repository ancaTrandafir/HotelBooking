import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { map} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'angularx-social-login';
import { FBUser } from './FBUser.model';
import { UserAtHotel } from './userAtHotel';




@Injectable({
    providedIn: 'root'
})



  // https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial


export class UserService {

    readonly rootURL = "https://localhost:44331";
    formDataRegister: User;

  public currentUserSubject: BehaviorSubject<any>;    // fie localUser fie FBUser
    public currentUser: Observable<any>;



  constructor(private http: HttpClient,
              private authService : AuthService) {  

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }







    postRegister() {
        console.log(this.formDataRegister);
        return this.http.post(this.rootURL + '/users/register', this.formDataRegister);  
   
    }







  public get currentUserValue(): any {  
    return this.currentUserSubject.value;
  }







  // Along with userName and password you have to pass grant_type as password.
  // With HttpHeader, we have set Content-Type as application / x - www - urlencoded.Additional No - Auth property is set to True

  userAuthentication(username, password) {
    var data = { username: username, password: password };

    console.log(data);

    return this.http.post<User>(this.rootURL + '/users/authenticate', data)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      
        return user;
      }));
    
  }






  FBAuthentication(userdata) {
    return this.http.post<FBUser>(this.rootURL + '/users/authenticate-facebook', userdata).pipe(
      map(user => {

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log("merge");
          console.log(user);
          return user;
             
      })
    );
  }







  logout() {

    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

    this.authService.signOut();
  
  }
 


   
               
            

  getUsers() {
    return this.http.get<User[]>(this.rootURL + '/users');    

  }





  getUserById(id) {
    return this.http.get<User>(this.rootURL + '/users', id);
  }





  //getUsersAtHotels(userId, hotelId) {
  //  return this.http.get<UserAtHotel>(this.rootURL + '/usersAtHotels/filter?hotelId=' + hotelId+ '&userId=' + userId);
  //}





  getHotelCountOfUser(userId) {
    return this.http.get<UserAtHotel>(this.rootURL + '/usersAtHotels/filter?userId=' + userId);       
  }
}
