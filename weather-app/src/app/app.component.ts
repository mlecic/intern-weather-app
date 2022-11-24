import { Component, OnInit } from '@angular/core';
import { CurrentWeatherService } from './current-weather.service';
import { AirPolutionService } from './air-polution.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  response: any;
  responsePolution: any;

  constructor(private currentWeatherService: CurrentWeatherService,
              private airPolutionService: AirPolutionService) { }

  ngOnInit(): void {
    this.currentWeatherService.fetchCity('Belgrade').subscribe((data: any) => {
      this.response = data;  
      console.log(this.response);
        
      
    });

    this.airPolutionService.fetchPolution(44.804, 20.4651).subscribe((dataPol: any) => {
      this.responsePolution = dataPol;  
           
    });
    
  }
}


