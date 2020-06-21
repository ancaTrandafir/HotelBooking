import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { AuthService, SocialUser } from 'angularx-social-login';




@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

    private users: any[];
    private currentUser: any;
    readonly rootURL = "https://localhost:44331";



  constructor(private service: UserService) { }



  ngOnInit() {
    this.currentUser = this.service.currentUserSubject;
    this.getUsers();
    }




    getUsers() {
        this.service.getUsers()
            // .subscribe(data => this.users = data);
            .toPromise()
            .then(data => {
                this.users = data;
                console.log(data);
                
            });
    }





  

}

