import { Component, OnInit } from '@angular/core';
import { ICamp } from '../../Models/camp.interface';
import { Service } from '../../Service/Service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-all-camps',
  templateUrl: './all-camps.component.html',
  styleUrls: ['./all-camps.component.css']
})
export class AllCampsComponent implements OnInit {
  
  constructor(private readonly service:Service,private readonly router:Router) { }
  CampList:ICamp[];
  ngOnInit() {
    this.getAllCamps()
  }

   
/**
 * get the details of all the camps and render it on the page
 */
  getAllCamps(){
    this.service.getAllCamps().subscribe((camps:ICamp[]) => {
      this.CampList = camps;
    })
  }

/**
 * navigates to create a new camp component
 */
  navigateToCreateCamp(){
    this.router.navigateByUrl('/Api/Camp/CreateCamp')
  }

  /**
   * Deletes a camp using its campId
   */
  DeleteCamp(camp:ICamp){
    this.service.deleteCamp(camp.id)
      .subscribe(()=>{
        this.getAllCamps();
      })
  }

  /**
   * naviages to update camp component passing the campId to update camp
   */
  updateCamp(camp:ICamp) {
    this.router.navigate(['/UpdateCamp',camp.id]);
   
  }

}
