import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

declare const google;

@Component({
    selector: 'app-home-view',
    templateUrl: 'home.view.html',
    styleUrls: ['home.view.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeViewComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit() {
        this._initMap();
    }

     private _initMap(): void {
       const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: { lat: 40.828230, lng: 43.823510 },
          zoom: 8,
        });
      }
    ngOnDestroy() { }
}
