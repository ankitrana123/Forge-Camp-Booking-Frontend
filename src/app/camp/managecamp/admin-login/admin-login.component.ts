import { Component, OnInit } from '@angular/core';
import { CampServices } from '../../Service/CampServices';
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

  isLoginError: boolean = false;
  constructor(private service: CampServices, private router: Router) {}

  ngOnInit(): void {
    this.EmailControl = new FormControl('', [Validators.required]);
    this.PasswordControl = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      Email: this.EmailControl,
      Password: this.PasswordControl,
    });
  }
  OnSubmit() {
    let userName = this.loginForm.value['Email'];
    let password = this.loginForm.value['Password'];

    this.service.UserAuthentication(userName, password).subscribe(
      (data: any) => {
        window.localStorage.setItem('userToken', data.access_token);
        this.newMessage();
        this.router.navigate(['/ManageCamp/AllCamps']);
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      }
    );
  }

  newMessage() {
    this.service.nextMessage(true);
  }
}
