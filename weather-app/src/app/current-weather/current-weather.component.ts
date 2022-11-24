import { Component, OnInit } from '@angular/core';
import { CurrentWeatherService } from '../current-weather.service';


@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  response: any;

  constructor(private currentWeatherService: CurrentWeatherService) { }

  ngOnInit(): void {
    this.currentWeatherService.fetchCity('Belgrade').subscribe((data: any) => {
      this.response = data;          
      
    });
  }

}
