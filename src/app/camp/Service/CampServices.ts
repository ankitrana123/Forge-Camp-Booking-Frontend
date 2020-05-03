import {v4 as uuidv4 } from 'uuid'
import{Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { ICamp } from '../Models/camp.interface';
import { IBooking } from '../Models/booking.interface';

@Injectable()
export class CampServices{
  deleteBooking(referenceNumber: string) {
    return this.Http.delete(`http://localhost:60045/Api/Booking/CancelBooking/${referenceNumber}`);
  }

  getBookingByReferenceNumber(value:string) {
    return this.Http.get(`http://localhost:60045/Api/Booking/GetBookingDetails/${value}`)
  }

    getFilteredCamps(checkin: any, checkout: any, Capacity: any) {
      return this.Http.get(`http://localhost:60045/Api/Camp/GetCampsBetween/${checkin}/${checkout}/${Capacity}`)
    }

    deleteCamp(campId: string) {
        
       return this.Http.delete(`http://localhost:60045/Api/Camp/DeleteCamp/${campId}`);
    }

    updateCamp(data:ICamp) {
        return this.Http.put('http://localhost:60045/Api/Camp/UpdateCamp',data);
    }
    
    constructor(private Http:HttpClient){
       
    }
    getAllCamps(){

       return this.Http.get('http://localhost:60045/Api/Camp/AllCampDetails');

    }
    getCampById(CampId:string){
        return this.Http.get(`http://localhost:60045/Api/Camp/GetCampDetailsById/${CampId}`)
    }
    
    createCampdata(data:ICamp){
        
        //use angular http to save data
         return this.Http.post('http://localhost:60045/Api/Camp/CreateCamp',data);
    }


// ----------------Booking services---------
bookCamp(data) {
    
        
         console.log(data)
    //use angular http to save data
     return this.Http.post('http://localhost:60045/Api/Booking/CreateBooking',data);
}
    
}