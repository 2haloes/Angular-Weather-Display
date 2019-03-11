import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, enableProdMode } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';
import { HttpClient } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherData: any;
  apiKey: string;
  lang = 'en';
  lat = '0.00';
  lon = '0.00';
  units = 'auto';
  summary = 'current';
  _currentTime: number;
  timeObserInterval = timer(0, 5000);
  weatherSub: Subscription;
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
    this.summary = this.route.snapshot.paramMap.get('summery');
    this.apiURL = `darkskyproxy.php?api=https://api.darksky.net/forecast/${this.apiKey}/${this.lat},${this.lon}?${this.weatherService.setOptionalString(this.lang, this.units)}exclude=hourly`;
    this.timeObserInterval.subscribe(n => this.TimerElapse());

    this.weatherSub = timer(0, 120000).pipe(
      switchMap(
        () => this.weatherService.dataGet(this.apiURL)
      )
    ).subscribe(result => this.weatherData = result);
  }

  TimerElapse() {
    this.CurrentTime = Date.now();
  }

  UnitGet() {
    if (this.weatherData.flags.units === 'us') {
      return '°F';
    } else {
      return '°C';
    }
  }

  UnitRound() {
    if (this.weatherData.flags.units === 'us') {
      return 0;
    } else {
      return 1;
    }
  }

  SummaryGet() {
    if (!!this.summary && this.summary === 'weeklong') {
      return this.weatherData.daily.summary;
    } else if(!!this.summary && this.summary === 'minutely') {
      return this.weatherData.minutely.summary;
    } else {
      return this.weatherData.currently.summary;
    }
  }

  TimeGet(unixTime) {
    return new Date(unixTime * 1000);
  }

}
