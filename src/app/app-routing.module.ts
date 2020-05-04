import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampsComponent } from './camp/camps/camps.component';
import { CampsDetailComponent } from './camp/camps-detail/camps-detail.component';
import { CampNewComponent } from './camp/camp-new/camp-new.component';
import { AllCampsComponent } from './camp/managecamp/all-camps/all-camps.component';
import { AdminLoginComponent } from './camp/managecamp/admin-login/admin-login.component';
import { UpdateCampComponent } from './camp/managecamp/update-camp/update-camp.component';
import { BookcampComponent } from './booking/bookcamp/bookcamp.component';
import { ManagebookingComponent } from './booking/managebooking/managebooking.component';
import { EdibookingComponent } from './booking/editbooking/edibooking.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';



const routes : Routes = [
  {path:'Camp/AllCampDetails',component:CampsComponent},
  {path:'Camp/GetCampDetailsById/:campId',component:CampsDetailComponent},
  {path:'Camp/CreateCamp',component:CampNewComponent},
   {path:'ManageCamp/AllCamps',component:AllCampsComponent,canActivate:[AuthGuard]},
   {path:'AdminLogin',component:AdminLoginComponent},
   {path:'UpdateCamp/:id',component:UpdateCampComponent,canActivate:[AuthGuard]},
   {path:'bookCamp/:id',component:BookcampComponent},
   {path:'manageBooking',component:ManagebookingComponent}
   ,{path:'editbooking/:id',component:EdibookingComponent},
   {
     path:'login',component:UserComponent,
    children:[{path:'',component:SignInComponent}]  //---> sign In is a child component for user
  },
   {path:'',redirectTo:'Camp/AllCampDetails',pathMatch:'full'}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
