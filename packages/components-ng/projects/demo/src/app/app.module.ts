import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibModule } from 'lib';
import { McButtonModule } from 'projects/lib/src/button';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LibModule,
    McButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
