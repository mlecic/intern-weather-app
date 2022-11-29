import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AirPolutionService } from '../air-polution.service';
import { CurrentWeatherService } from '../current-weather.service';
import { AIR_POLLUTION } from '../utils/constants';

@Component({
  selector: 'app-air-polution',
  templateUrl: './air-polution.component.html',
  styleUrls: ['./air-polution.component.scss']
})
export class AirPolutionComponent implements OnInit {

  response: any;
  responsePolution: any;
  responsePolutionValue: string = "";

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

    this.currentWeatherService.getCurrentCityWeather().pipe(
      switchMap((currentWeatherInfo: any) => {
        return this.airPolutionService.fetchPolution(currentWeatherInfo.coord.lat, currentWeatherInfo.coord.lon);
      })
    ).subscribe((airPollutionInfo: any) => {
      this.responsePolution = airPollutionInfo;
      this.responsePolutionValue = this.generatePollutionLabel(airPollutionInfo.list[0]?.main?.aqi);
    })

    // this.currentWeatherService.getCurrentCityWeather().subscribe(data => {
    //   this.response = data;
    //   this.fetchedCoordinates();
    // })
  }

  // fetchedCoordinates(): void {
  //   this.airPolutionService.fetchPolution(this.response.coord.lat, this.response.coord.lon).subscribe(dataPol => {
  //     this.responsePolution = dataPol;
  //   });
  // }

  generatePollutionLabel(aqi: number): string {
    if(!aqi) return "";
    let label;
    switch(aqi) {
      case AIR_POLLUTION.GOOD: label = "Good";
      break;
      case AIR_POLLUTION.FAIR: label = "Fair";
      break;
      case AIR_POLLUTION.MODERATE: label = "Moderate";
      break;
      case AIR_POLLUTION.POOR: label = "Poor";
      break;
      case AIR_POLLUTION.VERY_POOR: label = "Very Poor";
      break;
      default: label = "";
    }
    return label;
  }
}
