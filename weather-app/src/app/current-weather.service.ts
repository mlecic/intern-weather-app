import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API_APP_ID, API_WEATHER_ENDPOINT } from './utils/constants';
import { Subject } from 'rxjs';

export interface Weather {
  id: number,
  main: string,
  description: string,
  icon: string
}
export interface CurrentWeather {
  coord: {
    lon: number,
    lat: number
  },
  weather: Weather[],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  visibility: number,
  wind: {
    speed: number,
    deg: number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  timezone: number,
  id: number,
  name: string,
  cod: number
}

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  // currentCity$ it is not an Observable, but can be returned as one and it will be multicasted 
  currentCity$ = new Subject<CurrentWeather>();
  currentCityErrors$ = new Subject<HttpErrorResponse>();

  constructor(public http: HttpClient) { }

  /*
    This method will be called once the button is clicked.
    It will get the http requested from selected address 
    and it will get the data for further use
  */

  public fetchCity(cityName: string): void {
    const url = `${API_WEATHER_ENDPOINT}/weather?q=${cityName}&appid=${API_APP_ID}&units=metric`;
    // Fetch current weather - http.get will take one response and complete immediately
    this.http.get<CurrentWeather>(url)
    .subscribe({
        next: data => {
          // Emmit value on this observable - components subscribe to this to get value
          this.currentCity$.next(data);
        },
        error: error => {
          // http.get recognizes 404 status and emits rxjs error - obs.error('some error')
          // Emmit value on this observable - components subscribe to this to get errors
          this.currentCityErrors$.next(error);
        }
    });
  }
}
