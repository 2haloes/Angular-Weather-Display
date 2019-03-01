import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherData: object;
  apiKey: string;
  lang = 'en';
  lat = '0.00';
  lon = '0.00';
  units = 'auto';
  summery = 'current';
  currentTime: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.apiKey = this.route.snapshot.paramMap.get("key"),
    this.lang = this.route.snapshot.paramMap.get('lang'),
    this.lat = this.route.snapshot.paramMap.get('lat'),
    this.lon = this.route.snapshot.paramMap.get('lon'),
    this.units = this.route.snapshot.paramMap.get('units'),
    this.summery = this.route.snapshot.paramMap.get('summery');

    this.currentTime = Date.now();


// tslint:disable-next-line: max-line-length
    this.weatherData = this.http.get(`https://api.darksky.net/forecast/${this.apiKey}/${this.lat},${this.lon}?units=${this.units}&lang=${this.lang}&exclude=minutely,hourly`);
    console.log(this.weatherData);
    console.log(this.apiKey);
    console.log(this.route.snapshot.params);
  }

}
