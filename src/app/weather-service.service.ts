import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private http: HttpClient) { }

  dataGet(pageUrl: string){
    return this.http.get(pageUrl);
  }

  setOptionalString(lang: string, units: string){
    let returnString = '';

    if (!!lang && this.genLangList().includes(lang)) {
      returnString += `lang=${lang}&`;
    }

    if (!!units && this.genUnitList().includes(units)) {
      returnString += `units=${units}&`;
    }

    return returnString;
  }

  genLangList(){
    return [
      'ar',
      'az',
      'be',
      'bg',
      'bs',
      'ca',
      'cs',
      'da',
      'de',
      'el',
      'en', // The default
      'es',
      'et',
      'fi',
      'fr',
      'he',
      'hr',
      'hu',
      'id',
      'is',
      'it',
      'ja',
      'ka',
      'ko',
      'kw',
      'lv',
      'nb',
      'nl',
      'no',
      'pl',
      'pt',
      'ro',
      'ru',
      'sk',
      'sl',
      'sr',
      'sv',
      'tet',
      'tr',
      'uk',
      'x-pig-latin',
      'zh',
      'zh-tw'
    ];
  }

  genUnitList() {
    return [
      'auto',
      'ca',
      'uk2',
      'us', // The default
      'si'
    ];
  }

}
