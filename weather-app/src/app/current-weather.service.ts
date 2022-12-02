import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_APP_ID, API_WEATHER_ENDPOINT } from './utils/constants';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  // currentCity$ is an Observable that will be multicasted 
  private currentCity$ = new Subject<CurrentWeather>();

  constructor(public http: HttpClient) { }

  /*
    This method will be called once the button is clicked.
    It will get the http requested from selected address 
    and it will get the data for further use
  */

  public fetchCity(cityName: string): Observable<CurrentWeather> {
    const url = `${API_WEATHER_ENDPOINT}/weather?q=${cityName}&appid=${API_APP_ID}&units=metric`;
    return this.http.get<CurrentWeather>(url).pipe(
      map((data: CurrentWeather) => {
        this.currentCity$.next(data);
        return data;
      })
    );
  }

  /*
    this method is called from ngOnInit from current-weather.component
    and it will be used as Observer for currentCity$ ->
    -> waiting for method fetchCity from search-city.component
    to be called
  */

  public getCurrentCityWeather(): Observable<CurrentWeather> {        
    return this.currentCity$.asObservable();
  }
}
