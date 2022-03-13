import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-send-request',
    templateUrl: 'send-request.component.html',
    styleUrls: ['send-request.component.scss'],
    encapsulation:ViewEncapsulation.None
})
export class SendRequestComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void { }
}
