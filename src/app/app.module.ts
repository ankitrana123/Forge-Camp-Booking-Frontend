import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampModule } from './camp/camp.module';
import { BookcampComponent } from './booking/bookcamp/bookcamp.component';
import { ManagebookingComponent } from './booking/managebooking/managebooking.component';
import { ConfirmbookingComponent } from './booking/confirmbooking/confirmbooking.component';



@NgModule({
  declarations: [
    AppComponent,
    BookcampComponent,
    ManagebookingComponent,
    ConfirmbookingComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CampModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
