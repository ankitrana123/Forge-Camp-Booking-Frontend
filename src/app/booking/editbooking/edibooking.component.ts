import { Component, OnInit } from '@angular/core';
import { CampServices } from 'src/app/camp/Service/CampServices';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edibooking',
  templateUrl: './edibooking.component.html',
  styleUrls: ['./edibooking.component.css'],
})
export class EdibookingComponent implements OnInit {
  referenceNumber: string;
  requiredBooking;

  constructor(
    private services: CampServices,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.referenceNumber = this.activatedRouter.snapshot.paramMap.get('id');
    this.services
      .getBookingByReferenceNumber(this.referenceNumber)
      .subscribe((res) => {
        this.requiredBooking = res;
      });
  }

  DeleteBooking(referenceNumber: string) {
    this.services.deleteBooking(referenceNumber).subscribe(() => {
      this.router.navigate(['/Camp/AllCampDetails']);
    }),(err: HttpErrorResponse) => {
      window.alert('You are not allowed to cancel past bookings..')
    };
  }
}
