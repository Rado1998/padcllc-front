import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit() { }

    ngOnDestroy() { }
}
