import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: []
})
export class SignUpComponent implements OnInit {

  user: User;
  emailPattern = "^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$";

  constructor(private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }


  resetForm(form?: NgForm) {

    if (form!=null)
      form.reset();

    this.user = {
      Id: null,
      Username: "",
      Password: "",
      Email: "",
      FirstName: "",
      LastName: "",
    }

  }



  onSubmit(userRegistrationForm: NgForm) {
    this.userService.formDataRegister = userRegistrationForm.value;
    this.userService.postRegister()
          .subscribe((data: any) => {
            if (data.Succeeded == true) {
              this.resetForm(userRegistrationForm);
              this.toastr.success('User registration successful');
            }
            else
              this.toastr.error(data.Errors[0]);
          });
      }

    
  

}
