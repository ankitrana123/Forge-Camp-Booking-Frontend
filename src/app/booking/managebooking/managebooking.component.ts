import { Component, OnInit } from '@angular/core';
import { CampServices } from 'src/app/camp/Service/CampServices';
import { Router, ActivatedRoute } from '@angular/router';
import { ICamp } from 'src/app/camp/Models/camp.interface';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { IBooking } from 'src/app/camp/Models/booking.interface';


@Component({
  selector: 'app-bookcamp',
  templateUrl: './managebooking.component.html',
  styleUrls: ['./managebooking.component.css']
})

export class ManagebookingComponent implements OnInit {
  booking ;
  bookingId:string

  public bookManageForm:FormGroup;

  referencenumber:FormControl;

  constructor(private services:CampServices,private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
  
      this.referencenumber = new FormControl('',[Validators.required]);
    
      this.bookManageForm = new FormGroup({
        referencenumber:this.referencenumber,
        
        
      })
}
OnFormSubmit(){
  
  let booknumber = this.bookManageForm.value["referencenumber"]
  console.log(booknumber)
 
    this.router.navigate(['/editbooking',booknumber]);
  
 }
}
