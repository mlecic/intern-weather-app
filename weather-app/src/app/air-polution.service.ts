import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_APP_ID, API_WEATHER_ENDPOINT } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AirPolutionService {

  constructor(public http: HttpClient) { }

  public fetchPolution(lat: number, lon:number) {
    return this.http
    .get(`${API_WEATHER_ENDPOINT}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_APP_ID}`);

  }
}
