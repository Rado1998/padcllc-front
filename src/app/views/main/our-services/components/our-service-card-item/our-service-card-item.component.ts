import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ICardData } from '@models/our-services';

@Component({
    selector: 'app-our-service-card-item',
    templateUrl: 'our-service-card-item.component.html',
    styleUrls: ['our-service-card-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OurServiceCardItemComponent implements OnInit, OnDestroy {
    @Input() public cardData: ICardData;

    constructor() { }

    ngOnInit() {
        console.log(this.cardData);
    }

    ngOnDestroy() { }
}
