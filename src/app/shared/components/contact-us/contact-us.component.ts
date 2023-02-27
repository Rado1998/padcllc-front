import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

declare const google;

@Component({
    selector: 'app-contact-us',
    templateUrl: 'contact-us.component.html',
    styleUrls: ['contact-us.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactUsComponent implements OnInit, AfterViewInit, OnDestroy {
    private _map;
    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this._initMap();
    }

    private _initMap(): void {
        this._map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
            center: { lat: 40.798954, lng: 43.843190 },
            zoom: 16,
        });
        this._addMarker(new google.maps.LatLng(40.798954, 43.843190));
    }

    private _addMarker(location) {
        const marker = new google.maps.Marker({
            position: location,
            map: this._map
        });
    }

    ngOnDestroy(): void { }

}
