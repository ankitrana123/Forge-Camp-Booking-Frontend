import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/camp/Service/Service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICamp } from 'src/app/camp/Models/camp.interface';

import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-bookcamp',
  templateUrl: './managebooking.component.html',
  styleUrls: ['./managebooking.component.css'],
})
export class ManagebookingComponent implements OnInit {
  
  bookingId: string;

  public bookManageForm: FormGroup;

  referencenumberControl: FormControl;
  textControl:FormControl;

  constructor(
    private services: Service,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  /**
   * Initialize the text and form control values
   */
  ngOnInit(): void {
    this.referencenumberControl = new FormControl('', [Validators.required]);
    this.textControl = new FormControl('',[Validators.required]);

    this.bookManageForm = new FormGroup({
      referencenumber: this.referencenumberControl,
    });
  }
  /**
   * Pass the form book values for booking reference number 
   */
  OnFormSubmit() {
    let bookingReferenceNumber = this.bookManageForm.value['referencenumber'];
    this.router.navigate(['/editbooking', bookingReferenceNumber]);
  }
/**
 * get Validation control for the given Form control
 * i.e valid or invalid
 */
  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }
}
