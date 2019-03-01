import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  timeInterval;
  timeObserInterval = interval(5000);
  TestText = 'Testing';

  public get CurrentTime() {
    return this._currentTime;
  }
  public set CurrentTime(_currentTime) {
    this._currentTime = _currentTime;
  }

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.apiKey = this.route.snapshot.paramMap.get('key'),
    this.lang = this.route.snapshot.paramMap.get('lang'),
    this.lat = this.route.snapshot.paramMap.get('lat'),
    this.lon = this.route.snapshot.paramMap.get('lon'),
    this.units = this.route.snapshot.paramMap.get('units'),
    this.summery = this.route.snapshot.paramMap.get('summery');

    this._currentTime = Date.now();


// tslint:disable-next-line: max-line-length
    this.weatherData = this.http.get(`https://api.darksky.net/forecast/${this.apiKey}/${this.lat},${this.lon}?units=${this.units}&lang=${this.lang}&exclude=minutely,hourly`);


    this.timeObserInterval.subscribe(n => this.TimerElapse());
  }

  TimerElapse() {
    console.log('The current time is: ' + Date.now());
    this.CurrentTime = Date.now();
    console.log('Current var time is: ' + this._currentTime);
    this.TestText = 'Testing Update!';
  }

}
