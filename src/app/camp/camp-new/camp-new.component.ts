import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { CampServices } from '../Service/CampServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camp-new',
  templateUrl: './camp-new.component.html',
  styleUrls: ['./camp-new.component.css'],
})
export class CampNewComponent implements OnInit {
  public campForm: FormGroup;

  amountControl: FormControl;
  capacityControl: FormControl;
  descriptionControl: FormControl;
  titleControl: FormControl;
  imageControl: FormControl;

  file: File;
  base64textString: string;
  imageUrl: string | ArrayBuffer;
  fileName: string = 'No file selected';

  enterImage: boolean = true;

  constructor(private services: CampServices, private router: Router) {}

  ngOnInit() {
    this.amountControl = new FormControl('', [Validators.required]);
    this.capacityControl = new FormControl('', [Validators.required]);
    this.descriptionControl = new FormControl('', [Validators.required]);
    this.titleControl = new FormControl('', [Validators.required]);
    this.imageControl = new FormControl('');

    this.campForm = new FormGroup({
      amount: this.amountControl,
      capacity: this.capacityControl,
      description: this.descriptionControl,
      title: this.titleControl,
      image: new FormControl(''),
    });
    console.log(this.amountControl);
  }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    //console.log(btoa(binaryString));
  }
  onFileChange(file: File) {
    if (file) {
      this.enterImage = false;
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      const reader2 = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);

      reader2.readAsDataURL(file);
      reader2.onload = (event) => {
        this.imageUrl = reader2.result;
      };
    }
  }

  OnFormSubmit() {
    this.campForm.value['image'] =
      'data:image/jpg;base64,' + this.base64textString;
    console.log(this.campForm.value);

    this.services.createCampdata(this.campForm.value).subscribe(() => {
      this.router.navigateByUrl('/Camp/AllCampDetails');
    });
  }

  getControlValidationClasses(control: FormControl) {
    return {
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid,
    };
  }
}
