import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_APP_ID, API_WEATHER_ENDPOINT } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AirPollutionService {
  
  constructor(public http: HttpClient) { }
 
  // fetchPollution method is getting data from selected URL
  
  public fetchPollution(lat: number, lon: number) {
    return this.http
    .get(`${API_WEATHER_ENDPOINT}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_APP_ID}`);
  }
}
