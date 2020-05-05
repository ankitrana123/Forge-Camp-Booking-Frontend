
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICamp } from '../Models/camp.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Service {

    constructor(private Http: HttpClient) {}

    //Changes the Nav Header for Admin user
  private isAdminHeader = new BehaviorSubject(false);
  sharedMessage = this.isAdminHeader.asObservable();
  baseUrl : string = `http://localhost:60045`;

  isAdmin(message: boolean) {
    this.isAdminHeader.next(message);
  }

/**
 * Deletes a booking using its booking reference number
 * @param referenceNumber booking reference number for the booked camp
 */
  deleteBooking(referenceNumber: string) {
    return this.Http.delete(
      this.baseUrl+`/Api/Booking/CancelBooking/${referenceNumber}`
    );
  }
  /**
   * fetches a booking using its booking reference number
   * @param referenceNumber booking reference number for the booked camp
   */
  getBookingByReferenceNumber(referenceNumber: string) {
    return this.Http.get(
      `http://localhost:60045/Api/Booking/GetBookingDetails/${referenceNumber}`
    );
  }
/**
 * Filters the camp acc. to its check in and check out date
 * @param checkInDate The date on which the user checked in the camp
 * @param CheckOutDate The date on which the user checked out of the camp
 * @param Capacity Capacity of the camp you want get listed
 */
  getFilteredCamps(checkInDate: Date, CheckOutDate: Date, Capacity: number) {
    return this.Http.get(
      this.baseUrl+`/Api/Camp/GetCampsBetween/${checkInDate}/${CheckOutDate}/${Capacity}`
    );
  }
/**
 * Deletes a camp on which user clicked using token authentication
 * @param campId 
 */
  deleteCamp(campId: string) {
    return this.Http.delete(
      this.baseUrl+`/Api/Camp/DeleteCamp/${campId}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
        }),
      }
    );
  }

/**
 * Updates the data of a particular camp using the userToken as Admin can only change this data
 */
  updateCamp(data: ICamp) {
    return this.Http.put(this.baseUrl+'/Api/Camp/UpdateCamp', data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
      }),
    });
  }

 
/**
 * Returns the List of all the Camps 
 */
  getAllCamps() {
    return this.Http.get(this.baseUrl+'/Api/Camp/AllCampDetails');
  }

  /**
   * Get the camp info with the given campID
   */
  getCampById(CampId: string) {
    return this.Http.get(
      this.baseUrl+`/Api/Camp/GetCampDetailsById/${CampId}`
    );
  }

/**
 * Create a new camp use headers containing the userToken for user validation
 * @param data ICamp object to create a new camp
 */
  createCampdata(data: ICamp) {
    //use angular http to save data
    return this.Http.post(this.baseUrl+'/Api/Camp/CreateCamp', data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
      }),
    });
  }

  bookCamp(data) {
    // console.log(data);
    return this.Http.post(
      this.baseUrl+'/Api/Booking/CreateBooking',
      data
    );
  }

  /**
   * 
   * @param userName 
   * @param password 
   */
  UserAuthentication(userName: string, password: string) {
    var data =
      'username=' + userName + '&password=' + password + '&grant_type=password';
    var reqHeader = new HttpHeaders({
      'Context-Type': 'application/x-www-urlencoded',
    });
    return this.Http.post(this.baseUrl+'/token', data, {
      headers: reqHeader,
    });
  }
}
