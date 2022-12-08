import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentWeather } from './current-weather.service';
import { API_APP_ID, API_WEATHER_ENDPOINT } from './utils/constants';

export interface Forecast {
  dt_txt: string,
  temp: number,
  description: string,
  imagePath: string
}

@Injectable({
  providedIn: 'root'
})
export class DailyForecastService {

  constructor(public http: HttpClient) { }

  fetchForecast(lat: number, lon: number): Observable<CurrentWeather> {
    return this.http
    .get<CurrentWeather>(`${API_WEATHER_ENDPOINT}/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=40&appid=${API_APP_ID}`);
  }
}
