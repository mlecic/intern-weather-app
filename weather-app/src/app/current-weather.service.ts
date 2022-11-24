import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_APP_ID, API_WEATHER_ENDPOINT } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
  response: any;

  constructor(public http: HttpClient) { }

  public fetchCity(cityName: string) {
    return this.http
    .get(`${API_WEATHER_ENDPOINT}/weather?q=${cityName}&appid=${API_APP_ID}&units=metric`)
    
  }

  public fetchPolution(lat: number, lon:number) {
    return this.http
    .get(`${API_WEATHER_ENDPOINT}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_APP_ID}`)

  }
}
