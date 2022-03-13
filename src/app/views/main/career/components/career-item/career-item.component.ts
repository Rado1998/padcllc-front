import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-career-item',
    templateUrl: 'career-item.component.html',
    styleUrls: ['career-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CareerItemComponent implements OnInit, OnDestroy {
    public isSeeMore: boolean = false;

    constructor() { }

    ngOnInit(): void { }

    public onClickSeeMore(): void {
        this.isSeeMore = !this.isSeeMore;
    }

    ngOnDestroy(): void { }
}
