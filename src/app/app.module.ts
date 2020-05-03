import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampModule } from './camp/camp.module';
import { BookcampComponent } from './booking/bookcamp/bookcamp.component';
import { ManagebookingComponent } from './booking/managebooking/managebooking.component';
import { BookingModule } from './booking/booking.module';



@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CampModule,
    BookingModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
