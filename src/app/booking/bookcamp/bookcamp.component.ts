import { Component, OnInit } from '@angular/core';
import { CampServices } from 'src/app/camp/Service/CampServices';
import { Router, ActivatedRoute } from '@angular/router';
import { ICamp } from 'src/app/camp/Models/camp.interface';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-bookcamp',
  templateUrl: './bookcamp.component.html',
  styleUrls: ['./bookcamp.component.css']
})

export class BookcampComponent implements OnInit {
  Camp : ICamp
  campId:string

  public bookForm:FormGroup;

  capacityControl:FormControl;
  checkinControl:FormControl;
  checkoutControl:FormControl;
  billingaddressControl:FormControl;
  stateControl:FormControl;
  countryControl:FormControl;
  phoneControl:FormControl;
  zipcodeControl:FormControl;


  constructor(private services:CampServices,private router:Router,private activatedRouter:ActivatedRoute) { }

  file: File;
  base64textString: string
  imageUrl: string | ArrayBuffer ;
  fileName: string = "No file selected" 

  ngOnInit(): void {
    this.campId=this.activatedRouter.snapshot.paramMap.get('id')
    console.log(this.campId)
    this.services.getCampById((this.campId)).subscribe((response:ICamp)=>{
      this.Camp = response
      this.imageUrl = this.Camp.image
    })

      this.capacityControl = new FormControl('',[Validators.required]);
      this.checkinControl = new FormControl('',[Validators.required]);
      this.checkoutControl = new FormControl('',[Validators.required]);
      this.billingaddressControl = new FormControl('',[Validators.required])
      this.stateControl = new FormControl('',[Validators.required])
      this.zipcodeControl = new FormControl('',[Validators.required])
      this.phoneControl = new FormControl('',[Validators.required])
      this.countryControl = new FormControl('',[Validators.required])

  
      this.bookForm = new FormGroup({
        TotalNights:this.capacityControl,
        CheckInDate: this.checkinControl,
        CheckOutDate: this.checkoutControl,
        billingaddress: this.billingaddressControl,
        state: this.stateControl,
        zipcode: this.zipcodeControl,
        CellPhone: this.phoneControl,
        country: this.countryControl,
        
      })
      //  this.formInitiaLizer()

    

}
OnFormSubmit(){
  // const{Capacity,checkin,checkout,billingaddress,state,country,phone,zipcode}=this.bookForm.value
  this.bookForm.value["CampId"] = this.campId
  this.bookForm.value["UserId"] = "38053425-E383-4583-87C7-15E7909BEF8B"
  this.services.bookCamp(this.bookForm.value).subscribe((response)=>{
    
    window.alert("Your booking Reference number is:"+response);
    this.router.navigate(['/Camp/AllCampDetails']);

  });
}
}
