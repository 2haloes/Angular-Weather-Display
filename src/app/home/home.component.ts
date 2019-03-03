import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

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
  _currentTime: number;
  timeObserInterval = interval(5000);
  apiURL: string;

  public get CurrentTime() {
    return this._currentTime;
  }
  public set CurrentTime(_currentTime) {
    this._currentTime = _currentTime;
  }

  constructor(private weatherService: WeatherServiceService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.apiKey = this.route.snapshot.paramMap.get('key'),
    this.lang = this.route.snapshot.paramMap.get('lang'),
    this.lat = this.route.snapshot.paramMap.get('lat'),
    this.lon = this.route.snapshot.paramMap.get('lon'),
    this.units = this.route.snapshot.paramMap.get('units'),
    this.summery = this.route.snapshot.paramMap.get('summery');
    this.apiURL = `https://api.darksky.net/forecast/${this.apiKey}/${this.lat},${this.lon}?${this.weatherService.setOptionalString(this.lang, this.units)}exclude=minutely,hourly`
    this.CurrentTime = Date.now();
    console.log(this.apiURL);
    console.log(`The current unit is ${this.units} and the current lang is ${this.lang}`);
    this.timeObserInterval.subscribe(n => this.TimerElapse());
  }

  TimerElapse() {
    this.CurrentTime = Date.now();
  }

}
