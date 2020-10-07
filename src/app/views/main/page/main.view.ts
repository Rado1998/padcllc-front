import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-main-view',
    templateUrl: 'main.view.html',
    styleUrls: ['main.view.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainViewComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit() { }

    ngOnDestroy() { }
}
