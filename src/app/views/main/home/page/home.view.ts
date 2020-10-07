import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-home-view',
    templateUrl: 'home.view.html',
    styleUrls: ['home.view.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeViewComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit() { }

    ngOnDestroy() { }
}
