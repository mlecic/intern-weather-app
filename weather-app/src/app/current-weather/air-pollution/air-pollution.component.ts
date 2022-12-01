import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AirPollutionService } from 'src/app/air-pollution.service';
import { AIR_POLLUTION } from 'src/app/utils/constants';

@Component({
  selector: 'app-air-pollution',
  templateUrl: './air-pollution.component.html',
  styleUrls: ['./air-pollution.component.scss']
})

export class AirPollutionComponent implements OnInit, OnChanges, OnDestroy {
  
  @Input() lat = 0;
  @Input() lon = 0;
  response: any;
  responsePollution: any;
  responsePollutionValue: string = "";
  currentAirPollutionSub: Subscription = new Subscription;

  constructor(private airPollutionService: AirPollutionService) { }

  /*
    On init component is created but waiting on button to be clicked.
    When the button is clicked component can get data from getCurrentCityWeather,
    data arrived, and method dataFetched is called which will use
    this.response.coord.lat and this.response.coord.lon because method
    fetchPollution() have to have two parameters.

    Idea behind this is to use the data that already arrived with Current Weather Component
    and use lat and lon inside Air Pollution URL. 

    Comments should be updated!
  */

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes['lat'].currentValue && !!changes['lon'].currentValue) {  
      this.currentAirPollutionSub = this.airPollutionService.fetchPollution(changes['lat'].currentValue, changes['lon'].currentValue)
      .subscribe((airPollutionInfo: any) => {
      this.responsePollution = airPollutionInfo;
      this.responsePollutionValue = this.generatePollutionLabel(airPollutionInfo.list[0]?.main?.aqi);
      })
    }    
  }

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

  ngOnDestroy(): void {
    this.currentAirPollutionSub.unsubscribe();
  }
}
