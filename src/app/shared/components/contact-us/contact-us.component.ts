import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

declare const google;

@Component({
    selector: 'app-contact-us',
    templateUrl: 'contact-us.component.html',
    styleUrls: ['contact-us.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactUsComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        this._initMap();
    }

    private _initMap(): void {
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
            center: { lat: 40.828230, lng: 43.823510 },
            zoom: 8,
        });
    }

    ngOnDestroy(): void { }

}
