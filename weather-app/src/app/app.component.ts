import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_APP_ID, API_WEATHER_ENDPOINT } from './utils/constants';
import { CurrentWeatherService } from './current-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  response: any;
  responsePolution: any;

  constructor(private http: HttpClient, 
              private currentWeatherService: CurrentWeatherService) { }

  ngOnInit(): void {
    this.currentWeatherService.fetchCity('Belgrade').subscribe((data: any) => {
      this.response = data;    
      
    });

    this.currentWeatherService.fetchPolution(44.804, 20.4651).subscribe((dataPol: any) => {
      this.responsePolution = dataPol; 
           
    });
    
  }
}


