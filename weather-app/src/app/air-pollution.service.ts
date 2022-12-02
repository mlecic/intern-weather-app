import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_APP_ID, API_WEATHER_ENDPOINT } from './utils/constants';
import { Observable } from 'rxjs';

export interface PollutionListItem {
    main: {
      aqi: number
    },
    components: {
        co: number,
        no: number,
        no2: number,
        o3: number,
        so2: number,
        pm2_5: number,
        pm10: number,
        nh3: number
    },
    dt: number
}

export interface AirPollution {
  coord: {
    lon: number,
    lat: number
  },
  list: PollutionListItem[]
}

@Injectable({
  providedIn: 'root'
})
export class AirPollutionService {
  
  constructor(public http: HttpClient) { }
 
  // fetchPollution method is getting data from selected URL
  
  public fetchPollution(lat: number, lon: number): Observable<AirPollution> {
    return this.http
    .get<AirPollution>(`${API_WEATHER_ENDPOINT}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_APP_ID}`);
  }
}
