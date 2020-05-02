import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampNewComponent } from './camp-new/camp-new.component';
import { CampsComponent } from './camps/camps.component';
import { CampsDetailComponent } from './camps-detail/camps-detail.component';
import { AppRoutingModule } from '../app-routing.module';
import { ContainerComponent } from './container/container.component';
import { CampServices } from './Service/CampServices';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AllCampsComponent } from './managecamp/all-camps/all-camps.component';
import { UpdateCampComponent } from './managecamp/update-camp/update-camp.component';


@NgModule({
  declarations: [CampNewComponent , CampsComponent , CampsDetailComponent,ContainerComponent,AllCampsComponent,UpdateCampComponent],
  imports: [
    CommonModule,AppRoutingModule,HttpClientModule,ReactiveFormsModule,FormsModule
  ],
  exports:[ContainerComponent],
  providers: [CampServices],
})
export class CampModule { }
