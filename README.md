# Angular Weather Display

![Image showing the Angular Weather Display](https://sites.2haloes.co.uk/images/weatherdisplay_angular.PNG)
## What is it?
A basic application that shows the weather, it works on any relatively modern device. It displays the current time and weather as well as a 5 day forecast. 

This is designed to be developed alongside the [Dotnet core Weather Display](https://github.com/2haloes/Weather-Display-Dotnet-Core) that is easier to setup, however this has much wider compatibility (Mainly on ARM devices such as the Raspberry Pi)

## System requirements
* Any decently modern browser (See Angular compatibility [here](https://angular.io/guide/browser-support))
* A screen wider than it is tall (Basically anything outside of a phone in portrait mode)
* An internet connection
* Access to any kind of ASP.NET or PHP server (This can be self hosted and has been tested with XSP on Linux)

## Features
* See the current weather easily
* 5 day forecast 
* Usable anywhere for any location
* Supports SI (°C) and US (°F) units
* Works fullscreen for embedded devices
* Content expands with the window size while retaining image and text quality (Tested up to 1080P)
* Easy to configure settings
* Easy to modify to suit your needs using Visual Studio code or any editor

## Tested on
* Windows 10 using latest Firefox (As of 2019-03-28)
* Ubuntu 18.04 using latest Firefox (As of 2019-03-28)
* Raspbian Pixel using latest Chromium (As of 2019-03-28)

## Editing and building
[See the Wiki page](https://github.com/2haloes/Angular-Weather-Display/wiki/Editing-and-Building)

## Deployment
[See the Wiki page](https://github.com/2haloes/Angular-Weather-Display/wiki/Deployment)

## Setup on Raspberry Pi
Coming Soon!

## Troubleshooting
[See the Wiki page](https://github.com/2haloes/Angular-Weather-Display/wiki/Troubleshooting)

## Known issues
* Data cannot be fetched without using a proxy server, this is impossible to fix as Dark Sky have disabled CORS

## Credits
* DarkSky for making the API that this program runs on
* Icons made by <a href="https://www.flaticon.com/authors/rns" title="RNS">RNS</a> from <a href="https://www.flaticon.com/" 		    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 		    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
