import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from './../common/toastr.service';
import { AuthService } from './auth.service';

@Component({
    templateUrl: 'app/user/profile.component.html',
    styles: [
      `
      em{float: right; color: #E85C65; padding-left:10px;}
      .error input{background-color:#E3C3C5;}
      .error ::-webkit-input-placeholder {color: #999;}
      .error ::-moz-placeholder {color: #999;}
      .error :-moz-placeholder {color: #999;}
      .error :ms-input-placeholder {color: #999;}
      `,
    ],
})
export class ProfileComponent implements OnInit {

    constructor(
      private authService:AuthService,
      private router:Router,
      @Inject(TOASTR_TOKEN) private toastr: Toastr,
    ){}

    profileForm: FormGroup;
    private firstName:FormControl;
    private lastName: FormControl;

    ngOnInit() {
      this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
      this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);
      this.profileForm =  new FormGroup ({
        firstName: this.firstName,
        lastName: this.lastName,
      });
    }

    validateFirstName(){
      return this.firstName.valid || this.firstName.touched;
    }

    validateLastName(){
      return this.lastName.valid || this.lastName.touched;
    }

    cancel() {
      this.router.navigate(['events']);
    }

    saveProfile(formValues){
      if(this.profileForm.valid){
        this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe(() => {
          this.toastr.success('Profile Saved');
        });
      }
    }
    
    logout(){
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/user/login']);
      });
    }
}
