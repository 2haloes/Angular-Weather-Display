import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  apiKey: string;
  lat: string;
  MainText: string;

  ngOnInit() {
    this.apiKey = this.route.snapshot.paramMap.get('key');
    this.lat = this.route.snapshot.paramMap.get('lat');

    if (!!this.apiKey) {
      if (!!this.lat) {
        this.MainText = 'The URL is currently missing the longitude number, this can be appiled by adding "/[long]" to the end of the website address. If you do not know this then use the link below to find the lat and long of the location';
      } else {
        this.MainText = 'The URL is currently missing the latitude and longitude numbers, this can be appiled by adding "/[lat]/[long]" to the end of the website address. If you do not know this then use the link below to find the lat and long of the location';
      }
    } else {
      this.MainText = 'The URL is currently missing the API key, this is required for the application to pull data from the Darksky API, this can be applied by adding "/[API key]" to the end of the website address. If you do not have one or do not know what it is then use the link below to either create an account or to copy your key from'
    }
  }

}
