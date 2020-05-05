import { Component, OnInit } from '@angular/core';
import { Service } from '../Service/Service';
import { ICamp } from '../Models/camp.interface';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-camps',
  templateUrl: './camps.component.html',
  styleUrls: ['./camps.component.css'],
})
export class CampsComponent implements OnInit {
  checkInControl: FormControl;
  checkOutControl: FormControl;
  capacityControl: FormControl;
  textControl: FormControl;

  checkIn: any;
  checkOut: any;
  capacity: any;
  
  FilterCamps: FormGroup;

  //total records to be seen for pagging on a page
  totalRecords: number
  page: number = 1

  constructor(
    private readonly service: Service,
    private readonly router: Router
  ) {}

  CampList: ICamp[];

  ngOnInit() {
    this.checkIn = this.getDate(new Date(new Date().getTime()));
    this.checkOut = this.getDate(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    );
    this.capacity = 0;

    this.allFilteredCamps(this.checkIn, this.checkOut, this.capacity);
    this.FilteredCampsInit();

    this.getAllCamps();

    this.textControl = new FormControl('', [Validators.required]);
  }

/**
 * initialize the camps controls and other data values
 */
  FilteredCampsInit() {
    this.checkInControl = new FormControl(this.checkIn, [Validators.required]);
    this.checkOutControl = new FormControl(this.checkOut, [
      Validators.required,
    ]);
    this.capacityControl = new FormControl('', [Validators.required]);
    this.FilterCamps = new FormGroup({
      checkInDate: this.checkInControl,
      checkOutDate: this.checkOutControl,
      capacity: this.capacityControl,
    });
  }
/**
 * renders the camps acc. to the given params i.e.
 * @param checkInDate the check in date of the camp
 * @param checkOutDate the check out date of the camp
 * @param capacity the capacity of the camp
 */
  allFilteredCamps(checkInDate, checkOutDate, capacity) {
    console.log(checkInDate, checkOutDate, capacity);
    this.service
      .getFilteredCamps(checkInDate, checkOutDate, capacity)
      .subscribe((res: ICamp[]) => {
        this.CampList = res;
      });
  }
/**
 * show the date inside the datepicker
 */
  getDate(date) {
    var output =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1 < 10 ? '0' : '') +
      (date.getMonth() + 1) +
      '-' +
      (date.getDate() < 10 ? '0' : '') +
      date.getDate();
    return output;
  }
/**
 * Get the details of all the camps to be rendered on the page
 */
  getAllCamps() {
    this.service.getAllCamps().subscribe((camps: ICamp[]) => {
      this.totalRecords = camps.length
      this.CampList = camps;
    });
  }

  /**
   * Navigates to create a new camp
   */
  navigateToCreateCamp() {
    this.router.navigateByUrl('/Api/Camp/CreateCamp');
  }

/**
 * Get the checkInDate and checkOutDate and Capacity onFormSubmit() and then pass to filter camps
 * according to these params
 */
  onFormSubmit() {
    const { checkInDate, checkOutDate, capacity } = this.FilterCamps.value;
    this.allFilteredCamps(checkInDate, checkOutDate, capacity);
  }

  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }
 /**
  * Populate the drop down list with numbers upto 10
  */
  populateFilter(): number[] {
    return Array.from({ length: 10 }, (x, i) => i + 1);
  }

  /**
   * Naviagtes to book camp component using its campid and books that camp
   */
  bookMyCamp(camp: ICamp) {
    this.router.navigate(['/bookCamp', camp.id]);
  }
}
