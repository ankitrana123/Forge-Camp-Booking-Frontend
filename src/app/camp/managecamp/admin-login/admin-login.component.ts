import { Component, OnInit } from '@angular/core';
import { Service } from '../../Service/Service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;

  EmailControl: FormControl;
  PasswordControl: FormControl;
  textControl:FormControl;

  isLoginError: boolean = false;
  constructor(private service: Service, private router: Router) {}

  ngOnInit(): void {
    this.EmailControl = new FormControl('', [Validators.required]);
    this.PasswordControl = new FormControl('', [Validators.required]);
    this.textControl= new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      Email: this.EmailControl,
      Password: this.PasswordControl,
    });
  }
  /**
   * take the userName and password values from the form and then authenticate the 
   * user using the userToken if the user is valid then show details to manage camps
   */
  OnSubmit() {
    let userName = this.loginForm.value['Email'];
    let password = this.loginForm.value['Password'];

    this.service.UserAuthentication(userName, password).subscribe(
      (data: any) => {
        window.localStorage.setItem('userToken', data.access_token);
        this.adminHeader();
        this.router.navigate(['/ManageCamp/AllCamps']);
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      }
    );
  }
/**
 * admin header to show login and logout if the user is logged in or logged out
 */
  adminHeader() {
    this.service.isAdmin(true);
  }

  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }
}
