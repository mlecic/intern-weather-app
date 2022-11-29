import { Component, OnInit } from '@angular/core';
import { AirPolutionService } from '../air-polution.service';
import { CurrentWeatherService } from '../current-weather.service';

@Component({
  selector: 'app-air-polution',
  templateUrl: './air-polution.component.html',
  styleUrls: ['./air-polution.component.scss']
})
export class AirPolutionComponent implements OnInit {

  response: any;
  responsePolution: any;

  constructor(private airPolutionService: AirPolutionService, 
              private currentWeatherService: CurrentWeatherService) { }

  /*
    On init component is created but waiting on button to be clicked.
    When the button is clicked component can get data from getCurrentCityWeather,
    data arrived, and method dataFetched is called which will use
    this.response.coord.lat and this.response.coord.lon because method
    fetchPolution() have to have two parameters.

    Idea behind this is to use the data that already arrived with Current Weather Component
    and use lat and lon inside Air Polution URL.
  */

  ngOnInit(): void {
    this.currentWeatherService.getCurrentCityWeather().subscribe(data => {
      this.response = data;
      this.fetchedCoordinates();

    })
  }

  fetchedCoordinates(): void {
    this.airPolutionService.fetchPolution(this.response.coord.lat, this.response.coord.lon).subscribe(dataPol => {
      this.responsePolution = dataPol;  
      
    });
  }
}
