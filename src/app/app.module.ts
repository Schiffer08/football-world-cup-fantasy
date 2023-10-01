import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpCacheInterceptorModule, useHttpCacheLocalStorage } from '@ngneat/cashew';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CreateTeamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpCacheInterceptorModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [useHttpCacheLocalStorage],
  bootstrap: [AppComponent]
})

export class AppModule { }
