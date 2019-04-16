import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { WeatherServiceService } from '../weather-service.service';
import { Subscription, timer, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

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
  minLong = '2';
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
    this.summary = this.route.snapshot.paramMap.get('summary');
    this.minLong = this.route.snapshot.paramMap.get('minLong');
    // enviroment.serverExt defaults to php, building with '--configuration=asp' will use the aspx file instead
    this.apiURL = `darkskyproxy.${environment.serverExt}?api=https://api.darksky.net/forecast/${this.apiKey}/${this.lat},${this.lon}?${this.weatherService.setOptionalString(this.lang, this.units)}exclude=hourly`;
    this.timeObserInterval.subscribe(n => this.TimerElapse());

    this.InitWeatherGet(0);
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

  MinLongGet() {
    if (!!this.minLong) {
      // One minute per value of minLong
      return +this.minLong * 60000;
    } else {
      // Default to 2 minutes
      return 120000;
    }
  }

  TimeGet(unixTime) {
    return new Date(unixTime * 1000);
  }

  InitWeatherGet(startAfter: number) {
    this.weatherSub = timer(startAfter, this.MinLongGet()).pipe(
      switchMap(
        () => this.weatherService.dataGet(this.apiURL)
      ),
      catchError(error => {
        console.log('Error occured accessing the proxy server: ' + error.statusText);
        if (!!this.weatherData) {
          this.weatherData.currently.icon = 'Error-Retrying';
        }
        this.InitWeatherGet(60000);
        return new Observable();
      })
    ).subscribe(result => this.weatherData = result);
  }

  WeatherGetError(Error: any){
    console.log('Error occured accessing the proxy server: ' + Error);
    if (!!this.weatherData) {
      this.weatherData.currently.icon = 'Error-Retrying';
    }
    this.InitWeatherGet(60000);
  }

}
