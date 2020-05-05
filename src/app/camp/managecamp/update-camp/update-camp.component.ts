import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validator, Validators} from '@angular/forms';

import { Router,ActivatedRoute } from '@angular/router';
import { Service } from '../../Service/Service';
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
  textControl:FormControl;

  file: File;
   base64textString: string
   imageUrl: string | ArrayBuffer;
   fileName: string = "No file selected" 

   enterImage:boolean=true;

  constructor(private services:Service,private router:Router,private activatedRouter:ActivatedRoute) { }
 /**
  * Get the campId from the activated route snapshot and then get the details of that camp by its
  * campId
  */
  ngOnInit() {
    this.campId=this.activatedRouter.snapshot.paramMap.get('id')
    this.services.getCampById((this.campId)).subscribe((response:ICamp)=>{
      this.Camp = response
      this.imageUrl = this.Camp.image

    })

    this.amountControl = new FormControl('',[Validators.required]);
    this.capacityControl = new FormControl('',[Validators.required]);
    this.descriptionControl = new FormControl('',[Validators.required]);
    this.titleControl = new FormControl('',[Validators.required]);
    this.textControl = new FormControl('',[Validators.required]);
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

  /**
   * Handle the image input 
   */
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

 /**
  * get the form data and then post the data to UpdateCamp() method
  */
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

  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }
}


