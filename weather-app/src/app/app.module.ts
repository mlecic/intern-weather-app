import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherService } from './current-weather.service';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { SearchCityComponent } from './search-city/search-city.component';
import { AirPolutionComponent } from './air-polution/air-polution.component';


@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    SearchCityComponent,
    AirPolutionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CurrentWeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
