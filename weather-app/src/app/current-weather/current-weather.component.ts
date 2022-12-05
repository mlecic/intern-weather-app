import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentWeatherService, CurrentWeather, Weather } from '../current-weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  response: CurrentWeather;
  iconValue: Weather["icon"];
  imagePath = '';
  error = false;


  /*
    currentCityWeatherSub is a Subsription, which will be 
    used once this component is init and because it is 
    called inside app.component.html, it will be init as
    soon as the page is loaded
  */

  currentCityWeatherSub: Subscription = new Subscription();

  constructor(private currentWeatherService: CurrentWeatherService) { }

  /*
    once the page is loaded this ngOnInit is triggered 
    and current-wheather component is waiting for response
    data -> getCurrentCityWeather() is called from current-weather.service
    it will get that data once the search button is clicked
  */
  
  ngOnInit(): void {
    this.currentCityWeatherSub = this.currentWeatherService.getCurrentCityWeather()
    .subscribe({
      next: (data: CurrentWeather) => {
        this.response = data;     
        this.iconValue = this.response.weather[0].icon;
        this.imagePath = `https://openweathermap.org/img/wn/${this.iconValue}@2x.png`;
        this.error = false;
      },
      error: error => { this.error = true }
    });
  }

  ngOnDestroy(): void {
    this.currentCityWeatherSub.unsubscribe();
  }

}
