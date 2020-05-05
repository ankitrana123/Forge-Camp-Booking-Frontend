import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampModule } from './camp/camp.module';
import { BookingModule } from './booking/booking.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CampModule, BookingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
