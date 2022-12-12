import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentWeatherService, CurrentWeather, Weather } from '../current-weather.service';
import { FavoritesService } from '../favorites.service';
import { ICON_END, ICON_START } from '../utils/constants';

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
  favCity = false;

  /*
    currentCityWeatherSub is a Subsription, which will be 
    used once this component is init and because it is 
    called inside app.component.html, it will be init as
    soon as the page is loaded
  */

  currentCityWeatherSub: Subscription = new Subscription();
  currentCityWeatherErrorsSub: Subscription = new Subscription();

  constructor(private currentWeatherService: CurrentWeatherService, 
              private favoritesService: FavoritesService) { }

  /*
    once the page is loaded this ngOnInit is triggered 
    and current-wheather component is waiting for response
    data -> getCurrentCityWeather() is called from current-weather.service
    it will get that data once the search button is clicked
  */
  
  ngOnInit(): void {

    // Get current weather
    this.currentCityWeatherSub = this.currentWeatherService.currentCity$
    .subscribe((data: CurrentWeather) => {
        this.error = false;
        this.response = data;     
        this.iconValue = this.response.weather[0].icon;
        this.imagePath = `${ICON_START}${this.iconValue}${ICON_END}`;
               
        this.checkCity();
      });

    // Get current weather errors
    this.currentCityWeatherErrorsSub = this.currentWeatherService.currentCityErrors$
    .subscribe((error: HttpErrorResponse) => {
      console.log("Bad city name", error);
      this.error = true;
    });
  }

  checkCity(): void {
    const allFavs = this.favoritesService.getFavorites();
    
    this.favCity = !!allFavs.filter((element: any) => element.id === this.response.id).length;
  }

  addToFavorites(): void {
    this.favoritesService.addFavorite(this.response.id, this.response.name);
    this.checkCity();
  }

  deleteFromFavorites(): void {
    this.favoritesService.deleteFavorite(this.response.id);
    this.checkCity();
  }

  ngOnDestroy(): void {
    this.currentCityWeatherSub.unsubscribe();
    this.currentCityWeatherErrorsSub.unsubscribe();
  }

}
