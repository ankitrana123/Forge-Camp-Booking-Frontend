import {v4 as uuidv4 } from 'uuid'
import{Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { ICamp } from '../Models/camp.interface';

@Injectable()
export class CampServices{
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

    
}