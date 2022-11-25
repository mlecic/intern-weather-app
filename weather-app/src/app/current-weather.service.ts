import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_APP_ID, API_WEATHER_ENDPOINT } from './utils/constants';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {

  // currentCity$ is an Observable that will be multicasted 
  private currentCity$ = new Subject<any>();

  constructor(public http: HttpClient) { }

  /*
    This method will be called once the button is clicked.
    It will get the http requested from selected address 
    and it will get the data for further use
  */

  public fetchCity(cityName: string) {
    return this.http
    .get(`${API_WEATHER_ENDPOINT}/weather?q=${cityName}&appid=${API_APP_ID}&units=metric`)
    .pipe(
      tap( data => ( this.currentCity$.next(data) ))
    )
  }

  /*
    this method is called from ngOnInit from current-weather.component
    and it will be used as Observer for currentCity$ ->
    -> waiting for method fetchCity from search-city.component
    to be called
  */

  public getCurrentCityWeather() {
    return this.currentCity$.asObservable();

  }
}
