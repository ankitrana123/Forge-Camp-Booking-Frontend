import { Component, OnInit } from '@angular/core';
import { ICamp } from '../../Models/camp.interface';
import { CampServices } from '../../Service/CampServices';
import { Router } from '@angular/router';



@Component({
  selector: 'app-all-camps',
  templateUrl: './all-camps.component.html',
  styleUrls: ['./all-camps.component.css']
})
export class AllCampsComponent implements OnInit {
  
  constructor(private readonly service:CampServices,private readonly router:Router) { }
  CampList:ICamp[];
  ngOnInit() {
    this.getAllCamps()
  }

  getAllCamps(){
    this.service.getAllCamps().subscribe((camps:ICamp[]) => {
      this.CampList = camps;
      console.log(this.CampList);
    })
  }

  navigateToCreateCamp(){
    this.router.navigateByUrl('/Api/Camp/CreateCamp')
  }

  
  DeleteCamp(camp:ICamp){
    this.service.deleteCamp(camp.id)
      .subscribe(()=>{
        this.getAllCamps();
      })
  }
  updateCamp(camp:ICamp) {
    this.router.navigate(['/UpdateCamp',camp.id]);
    // console.log('update req');
  }

}
