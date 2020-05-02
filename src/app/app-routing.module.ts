import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampsComponent } from './camp/camps/camps.component';
import { CampsDetailComponent } from './camp/camps-detail/camps-detail.component';
import { CampNewComponent } from './camp/camp-new/camp-new.component';
import { AllCampsComponent } from './camp/managecamp/all-camps/all-camps.component';
import { AdminLoginComponent } from './camp/managecamp/admin-login/admin-login.component';
import { UpdateCampComponent } from './camp/managecamp/update-camp/update-camp.component';



const routes : Routes = [
  {path:'Camp/AllCampDetails',component:CampsComponent},
  {path:'Camp/GetCampDetailsById/:campId',component:CampsDetailComponent},
  {path:'Camp/CreateCamp',component:CampNewComponent},
   {path:'ManageCamp/AllCamps',component:AllCampsComponent},
   {path:'AdminLogin',component:AdminLoginComponent},
   {path:'UpdateCamp/:id',component:UpdateCampComponent}
   ,
   {path:'',redirectTo:'Camp/AllCampDetails',pathMatch:'full'}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
