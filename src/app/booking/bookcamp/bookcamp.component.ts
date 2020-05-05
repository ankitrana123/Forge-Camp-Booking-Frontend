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
  templateUrl: './bookcamp.component.html',
  styleUrls: ['./bookcamp.component.css'],
})
export class BookcampComponent implements OnInit {
  Camp: ICamp;
  campId: string;

  public bookForm: FormGroup;

  capacityControl: FormControl;
  checkInDateControl: FormControl;
  checkOutDateControl: FormControl;
  billingAddressControl: FormControl;
  stateControl: FormControl;
  CountryControl: FormControl;
  PhoneControl: FormControl;
  zipCodeControl: FormControl;
  textControl:FormControl;

  constructor(
    private services: Service,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  file: File;
  base64textString: string;
  imageUrl: string | ArrayBuffer;
  fileName: string = 'No file selected';

/**
 * get a camp using its campId
 */
  ngOnInit(): void {
    this.campId = this.activatedRouter.snapshot.paramMap.get('id');
    this.services.getCampById(this.campId).subscribe((response: ICamp) => {
      this.Camp = response;
      this.imageUrl = this.Camp.image;
    });

    this.capacityControl = new FormControl('', [Validators.required]);
    this.checkInDateControl = new FormControl('', [Validators.required]);
    this.checkOutDateControl = new FormControl('', [Validators.required]);
    this.billingAddressControl = new FormControl('', [Validators.required]);
    this.stateControl = new FormControl('', [Validators.required]);
    this.zipCodeControl = new FormControl('', [Validators.required]);
    this.PhoneControl = new FormControl('', [Validators.required]);
    this.CountryControl = new FormControl('', [Validators.required]);
    this.textControl = new FormControl('',[Validators.required]);


    this.bookForm = new FormGroup({
      TotalNights: this.capacityControl,
      CheckInDate: this.checkInDateControl,
      CheckOutDate: this.checkOutDateControl,
      billingAddress: this.billingAddressControl,
      State: this.stateControl,
      zipCode: this.zipCodeControl,
      CellPhone: this.PhoneControl,
      Country: this.CountryControl,
    });
    
  }

  /**
   * pass the book form values to the bookCamp() function of services ot book the camp
   */

  OnFormSubmit() {
    this.bookForm.value['CampId'] = this.campId;
    this.bookForm.value['UserId'] = '38053425-E383-4583-87C7-15E7909BEF8B';
    this.services.bookCamp(this.bookForm.value).subscribe((response)=> {
      window.alert('Your booking Reference number is:' + response);
      this.router.navigate(['/Camp/AllCampDetails']);
    });
  }

  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }
}
