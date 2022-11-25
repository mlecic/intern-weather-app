import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrentWeatherService } from '../current-weather.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss']
})
export class SearchCityComponent implements OnInit, OnDestroy {
  response: any;
  cityName = '';
  searchCitySub: Subscription = new Subscription();
  
  constructor(private currentWeatherService: CurrentWeatherService) { }

  ngOnInit(): void {    
  }

  // this method is triggered on click and it is 
  // calling fetchCity method from current-weather.service

  onClickCity(): void {
    this.searchCitySub = this.currentWeatherService.fetchCity(this.cityName).subscribe();            

  }

  // this method is listening and recording what user 
  // enters in input field and with (<HTMLInputElement>event.target).value
  // we will get the variable 'cityName' which will be used further

  onEnteredInput(event: any): void {
    this.cityName = (<HTMLInputElement>event.target).value;
    
  }

  ngOnDestroy(): void {
    this.searchCitySub.unsubscribe();
  }

}
