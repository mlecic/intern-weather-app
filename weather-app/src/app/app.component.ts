import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    .get('https://api.openweathermap.org/data/2.5/weather?lat=44.8178131&lon=20.4568974&appid=5637da4b8906e7d92ccc594c24b3a782&units=metric')
    .subscribe((data: any) => {
      this.response = data;      
    });
  }

  private fetchPolutionRequest() {
    this.http
    .get('http://api.openweathermap.org/data/2.5/air_pollution?lat=44.8178&lon=20.4569&appid=5637da4b8906e7d92ccc594c24b3a782')
    .subscribe((dataPol: any) => {
      this.responsePolution = dataPol;      
    });
  }
}


