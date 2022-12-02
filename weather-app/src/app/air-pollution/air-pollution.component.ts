import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AirPollutionService, AirPollution } from 'src/app/air-pollution.service';
import { AIR_POLLUTION } from 'src/app/utils/constants';

@Component({
  selector: 'app-air-pollution',
  templateUrl: './air-pollution.component.html',
  styleUrls: ['./air-pollution.component.scss']
})

export class AirPollutionComponent implements OnInit, OnChanges, OnDestroy {  
  @Input() lat = 0;
  @Input() lon = 0;
  responsePollution: AirPollution;
  responsePollutionValue = "";
  currentAirPollutionSub: Subscription;

  constructor(private airPollutionService: AirPollutionService) { }

  /*
    ngOnChanges is beeing called before ngOnInit() (if the component has bound inputs) 
    and whenever one or more data-bound input properties change.

    ngOnChanges is called but waiting on button to be clicked.
    When the button is clicked component can get data from getCurrentCityWeather;
    data arrived, and method fetchPolution got parameters

    Idea behind this is to use the data that already arrived with Current Weather Component
    and then use lat and lon inside Air Pollution URL. 
  */

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes['lat'].currentValue && !!changes['lon'].currentValue) {  
        this.currentAirPollutionSub = this.airPollutionService.fetchPollution(changes['lat'].currentValue, changes['lon'].currentValue)
        .subscribe((airPollutionInfo: AirPollution) => {
          this.responsePollution = airPollutionInfo;
          this.responsePollutionValue = this.generatePollutionLabel(airPollutionInfo.list[0]?.main?.aqi);
      });
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
