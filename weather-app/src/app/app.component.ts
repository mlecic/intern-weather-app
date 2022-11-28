import { Component, OnInit } from '@angular/core';
import { AirPolutionService } from './air-polution.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  responsePolution: any;

  constructor(private airPolutionService: AirPolutionService) { }

  ngOnInit(): void {    

    this.airPolutionService.fetchPolution(44.804, 20.4651).subscribe((dataPol: any) => {
      this.responsePolution = dataPol;  
           
    });
    
  }  
}


