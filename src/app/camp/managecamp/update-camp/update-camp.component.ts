import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validator, Validators} from '@angular/forms';

import { Router,ActivatedRoute } from '@angular/router';
import { CampServices } from '../../Service/CampServices';
import { ICamp } from '../../Models/camp.interface';


@Component({
  selector: 'app-camp-new',
  templateUrl: './update-camp.component.html',
  styleUrls: ['./update-camp.component.html']
})
export class UpdateCampComponent implements OnInit {
  Camp : ICamp
  campId:string
  
  public campForm:FormGroup;
  
  amountControl:FormControl;
  capacityControl:FormControl;
  descriptionControl:FormControl;
  titleControl:FormControl;
  imageControl:FormControl;

  file: File;
   base64textString: string
   imageUrl: string | ArrayBuffer =
   "assets/img/camp3.png";
   fileName: string = "No file selected" 

   enterImage:boolean=true;

  constructor(private services:CampServices,private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    this.campId=this.activatedRouter.snapshot.paramMap.get('id')
    this.services.getCampById((this.campId)).subscribe((response:ICamp)=>{
      this.Camp = response
      this.imageUrl = this.Camp.image
      //  this.formInitiaLizer()

    })

    this.amountControl = new FormControl('',[Validators.required]);
    this.capacityControl = new FormControl('',[Validators.required]);
    this.descriptionControl = new FormControl('',[Validators.required]);
    this.titleControl = new FormControl('',[Validators.required]);
    this.imageControl = new FormControl('')

    this.campForm = new FormGroup({
      amount: this.amountControl,
      capacity:this.capacityControl,
      description: this.descriptionControl,
      title: this.titleControl,
      image: new FormControl('')
    })
    console.log(this.amountControl);
  }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
  }
  onFileChange(file: File) {
    if (file) {
      this.enterImage = false
      this.fileName = file.name
      this.file = file
 
      const reader = new FileReader()
      const reader2 = new FileReader()
      
      reader.onload =this.handleReaderLoaded.bind(this)
      reader.readAsBinaryString(file);
 
      reader2.readAsDataURL(file)
      reader2.onload = event => {
          this.imageUrl = reader2.result;
        };
    }
  }

 
  OnFormSubmit(){

    if(!this.base64textString){
      this.campForm.value["image"] = this.imageUrl
    }
    else{
    this.campForm.value["image"] = 'data:image/jpg;base64,' + this.base64textString;
    }
    this.campForm.value["id"] = this.campId
    this.services.updateCamp(this.campForm.value)    
    .subscribe(()=>{
      this.router.navigate(['/ManageCamp/AllCamps']);
    })

  }
}

