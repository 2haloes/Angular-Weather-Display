import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(public weatherService: WeatherServiceService, private route: ActivatedRoute) { }

  apiKey: string;
  lat: string;
  lon: string;
  lang: string;
  units: string;
  summary: string;
  minLong: string;
  summaryList = [
    'currently',
    'minutely',
    'weeklong'
  ];

  ngOnInit() {
    this.apiKey = this.route.snapshot.paramMap.get('key'),
    this.lang = this.route.snapshot.paramMap.get('lang'),
    this.lat = this.route.snapshot.paramMap.get('lat'),
    this.lon = this.route.snapshot.paramMap.get('lon'),
    this.units = this.route.snapshot.paramMap.get('units'),
    this.summary = this.route.snapshot.paramMap.get('summary');
    this.minLong = this.route.snapshot.paramMap.get('minLong');

    this.units = 'uk2';
  }
  public langChange(event): void{
    this.lang = event.target.value;
  }

  public unitChange(event): void{
    this.units = event.target.value;
  }

  public summaryChange(event): void{
    this.summary = event.target.value;
    console.log(this.summary);
  }

}
