import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-training-details-view',
    templateUrl: 'training-details.view.html',
    styleUrls: ['training-details.view.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TrainingDetailsViewComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void { }
}
