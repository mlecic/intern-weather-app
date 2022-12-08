import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentWeatherService, CurrentWeather, Weather } from '../current-weather.service';
import { DailyForecastService, Forecast } from '../daily-forecast.service';
import { ICON_END, ICON_START } from '../utils/constants';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})
export class DailyForecastComponent implements OnInit, OnDestroy {
  dataSub: Subscription = new Subscription();
  dataForecastSub: Subscription = new Subscription();
  currentCityWeatherErrorsSub: Subscription = new Subscription();

  response: CurrentWeather;
  forecastResponse: any;
  error = false;
  listForecast: Forecast[] = [];


  constructor(private currentWeatherService: CurrentWeatherService,
              private dailyForecastService: DailyForecastService) { }

  ngOnInit(): void {

    this.dataSub = this.currentWeatherService.currentCity$.subscribe((data: CurrentWeather) => {
      this.response = data;
      this.error = false;
      
      this.dataForecastSub = this.dailyForecastService.fetchForecast(this.response.coord.lat, this.response.coord.lon)
      .subscribe((forecastData: any) => {
        this.forecastResponse = forecastData;
        this.prepareForecastList(forecastData);
      });
    });

    this.currentCityWeatherErrorsSub = this.currentWeatherService.currentCityErrors$
    .subscribe((error: HttpErrorResponse) => {
      this.error = true;
    });
  }

  prepareForecastList(forecastData: any): void {
    this.listForecast = this.forecastResponse.list
    .filter((element: any, index: number) => index === 7 || index === 15 || index === 23 || index === 31 || index === 39)
    .map((element: any) => {
      const imagePath = `${ICON_START}${element.weather[0].icon}${ICON_END}`;
      const item: Forecast = {
        dt_txt: element.dt_txt,
        temp: element.main.temp,
        description: element.description,
        imagePath: imagePath
      } 
      return item;
    });
    
  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
    this.dataForecastSub.unsubscribe();
    this.currentCityWeatherErrorsSub.unsubscribe();
  }

}
