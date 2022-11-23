import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_APP_ID, API_WEATHER_ENDPOINT } from './utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  response: any;
  responsePolution: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchRequest();
    this.fetchPolutionRequest();
  }

  private fetchRequest() {
    this.http
    .get(`${API_WEATHER_ENDPOINT}/weather?lat=44.8178131&lon=20.4568974&appid=${API_APP_ID}&units=metric`)
    .subscribe((data: any) => {
      this.response = data;      
    });
  }

  private fetchPolutionRequest() {
    this.http
    .get(`${API_WEATHER_ENDPOINT}/air_pollution?lat=44.8178&lon=20.4569&appid=${API_APP_ID}`)
    .subscribe((dataPol: any) => {
      this.responsePolution = dataPol;      
    });
  }
}


