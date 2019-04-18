import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(public weatherService: WeatherServiceService, private route: ActivatedRoute, private router: Router) { }

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

  onSubmit(){
    let extraParams = [];

    if (!!this.minLong && !isNaN(+this.minLong)) {
      extraParams.push({minLong: this.minLong});
    }
    if (!!this.units && this.weatherService.genUnitList().includes(this.units)) {
      extraParams.push({units: this.units});
    }
    if (!!this.lang && this.weatherService.genLangList().includes(this.lang)) {
      extraParams.push({lang: this.lang});
    }
    if (!!this.summary && this.summaryList.includes(this.summary)) {
      extraParams.push({summary: this.summary});
    }
    this.router.navigate([`/${this.apiKey}/${this.lat}/${this.lon}`], {queryParams: extraParams});
  }

}
