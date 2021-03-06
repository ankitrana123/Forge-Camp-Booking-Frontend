import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/camp/Service/Service';
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
  isFutureBooking:boolean=false;
  campId;

  constructor(
    private services: Service,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  /**
   * get reference number of booking to be edited and then call getBookingByReferenceNumber 
   * to fetch booking details of that particular booking
   */
  ngOnInit(): void {
    this.referenceNumber = this.activatedRouter.snapshot.paramMap.get('id');
    this.services
      .getBookingByReferenceNumber(this.referenceNumber)
      .subscribe((res) => {
        this.isFutureBooking= new Date() < new Date(res["checkInDate"])
        this.requiredBooking = res;
        this.campId = res["CampId"];
      });
  }
/**
 * Delete the booking using its reference number and then navigate to AllCampDetails page
 * @param referenceNumber booking reference number
 */
  DeleteBooking(referenceNumber: string) {
    this.services.deleteBooking(referenceNumber).subscribe(() => {
      this.router.navigate(['/Camp/AllCampDetails']);
    }),(err: HttpErrorResponse) => {
      window.alert('You are not allowed to cancel past bookings..')
    };
  }

  selectedValue: number
stars: number[] = [1, 2, 3, 4, 5];

countStar(star) {

 
  this.selectedValue = star
  
   this.services.getCampRating(this.referenceNumber,this.selectedValue).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/Camp/AllCampDetails']);
      // this.router.navigate(['/UpdateCamp',camp.id]);
   });
  
}
}
