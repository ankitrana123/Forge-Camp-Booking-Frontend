import { Component, OnInit } from '@angular/core';
import { CampServices } from '../Service/CampServices';
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
  // camps: ICamp[]
  FilterCamps: FormGroup;

  totalRecords: number
  page: number = 1

  constructor(
    private readonly service: CampServices,
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

  allFilteredCamps(checkin, checkout, Capacity) {
    console.log(checkin, checkout, Capacity);
    this.service
      .getFilteredCamps(checkin, checkout, Capacity)
      .subscribe((res: ICamp[]) => {
        this.CampList = res;
      });
  }

  getDate(d) {
    var output =
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1 < 10 ? '0' : '') +
      (d.getMonth() + 1) +
      '-' +
      (d.getDate() < 10 ? '0' : '') +
      d.getDate();
    return output;
  }

  getAllCamps() {
    this.service.getAllCamps().subscribe((camps: ICamp[]) => {
      this.totalRecords = camps.length
      this.CampList = camps;
    });
  }

  navigateToCreateCamp() {
    this.router.navigateByUrl('/Api/Camp/CreateCamp');
  }

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

  populateFilter(): number[] {
    return Array.from({ length: 10 }, (x, i) => i + 1);
  }

  bookMyCamp(camp: ICamp) {
    this.router.navigate(['/bookCamp', camp.id]);
  }
}
