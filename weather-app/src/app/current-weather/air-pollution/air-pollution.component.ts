import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AirPollutionService } from 'src/app/air-pollution.service';
import { AIR_POLLUTION } from 'src/app/utils/constants';
import { CurrentWeatherService } from 'src/app/current-weather.service';

@Component({
  selector: 'app-air-pollution',
  templateUrl: './air-pollution.component.html',
  styleUrls: ['./air-pollution.component.scss']
})

export class AirPollutionComponent implements OnInit {

  response: any;
  responsePollution: any;
  responsePollutionValue: string = "";

  constructor(private airPollutionService: AirPollutionService, 
              private currentWeatherService: CurrentWeatherService) { }

  /*
    On init component is created but waiting on button to be clicked.
    When the button is clicked component can get data from getCurrentCityWeather,
    data arrived, and method dataFetched is called which will use
    this.response.coord.lat and this.response.coord.lon because method
    fetchPollution() have to have two parameters.

    Idea behind this is to use the data that already arrived with Current Weather Component
    and use lat and lon inside Air Pollution URL.
  */

  ngOnInit(): void {

    this.currentWeatherService.getCurrentCityWeather().pipe(
      switchMap((currentWeatherInfo: any) => {
        return this.airPollutionService.fetchPollution(currentWeatherInfo.coord.lat, currentWeatherInfo.coord.lon);
      })
    ).subscribe((airPollutionInfo: any) => {
      this.responsePollution = airPollutionInfo;
      this.responsePollutionValue = this.generatePollutionLabel(airPollutionInfo.list[0]?.main?.aqi);
    })

    // this.currentWeatherService.getCurrentCityWeather().subscribe(data => {
    //   this.response = data;
    //   this.fetchedCoordinates();
    // })
  }

  // fetchedCoordinates(): void {
  //   this.airPollutionService.fetchPollution(this.response.coord.lat, this.response.coord.lon).subscribe(dataPol => {
  //     this.responsePollution = dataPol;
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
