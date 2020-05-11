import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampNewComponent } from './camp-new/camp-new.component';
import { CampsComponent } from './camps/camps.component';
import { AppRoutingModule } from '../app-routing.module';
import { ContainerComponent } from './container/container.component';
import { Service } from './Service/Service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AllCampsComponent } from './managecamp/all-camps/all-camps.component';
import { UpdateCampComponent } from './managecamp/update-camp/update-camp.component';
import { AdminLoginComponent } from './managecamp/admin-login/admin-login.component';
import { AuthGuard } from '../auth/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    CampNewComponent,
    CampsComponent,

    ContainerComponent,
    AllCampsComponent,
    UpdateCampComponent,
    AdminLoginComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  exports: [ContainerComponent],
  providers: [Service, AuthGuard],
})
export class CampModule {}
