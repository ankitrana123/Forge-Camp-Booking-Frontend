import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICamp } from '../Models/camp.interface';
import { IBooking } from '../Models/booking.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CampServices {

    constructor(private Http: HttpClient) {}
    
  private message = new BehaviorSubject(false);
  sharedMessage = this.message.asObservable();

  nextMessage(message: boolean) {
    this.message.next(message);
  }

  deleteBooking(referenceNumber: string) {
    return this.Http.delete(
      `http://localhost:60045/Api/Booking/CancelBooking/${referenceNumber}`
    );
  }

  getBookingByReferenceNumber(value: string) {
    return this.Http.get(
      `http://localhost:60045/Api/Booking/GetBookingDetails/${value}`
    );
  }

  getFilteredCamps(checkin: any, checkout: any, Capacity: any) {
    return this.Http.get(
      `http://localhost:60045/Api/Camp/GetCampsBetween/${checkin}/${checkout}/${Capacity}`
    );
  }

  deleteCamp(campId: string) {
    return this.Http.delete(
      `http://localhost:60045/Api/Camp/DeleteCamp/${campId}`,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
        }),
      }
    );
  }

  updateCamp(data: ICamp) {
    return this.Http.put('http://localhost:60045/Api/Camp/UpdateCamp', data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
      }),
    });
  }

 

  getAllCamps() {
    return this.Http.get('http://localhost:60045/Api/Camp/AllCampDetails');
  }
  getCampById(CampId: string) {
    return this.Http.get(
      `http://localhost:60045/Api/Camp/GetCampDetailsById/${CampId}`
    );
  }

  createCampdata(data: ICamp) {
    //use angular http to save data
    return this.Http.post('http://localhost:60045/Api/Camp/CreateCamp', data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + window.localStorage.getItem('userToken'),
      }),
    });
  }

  bookCamp(data) {
    console.log(data);
    return this.Http.post(
      'http://localhost:60045/Api/Booking/CreateBooking',
      data
    );
  }

  UserAuthentication(userName: string, password: string) {
    var data =
      'username=' + userName + '&password=' + password + '&grant_type=password';
    var reqHeader = new HttpHeaders({
      'Context-Type': 'application/x-www-urlencoded',
    });
    return this.Http.post('http://localhost:60045/token', data, {
      headers: reqHeader,
    });
  }
}
