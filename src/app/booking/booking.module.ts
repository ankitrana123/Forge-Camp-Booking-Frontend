import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookcampComponent } from './bookcamp/bookcamp.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManagebookingComponent } from './managebooking/managebooking.component';
import { Service } from '../camp/Service/Service';
import { EdibookingComponent } from './editbooking/edibooking.component';

@NgModule({
  declarations: [
    BookcampComponent,
    ManagebookingComponent,
    EdibookingComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [Service],
})
export class BookingModule {}
