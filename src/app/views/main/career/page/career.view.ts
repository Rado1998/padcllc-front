import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { BaseAPIService } from '@api-services/index';
import { IVacancy } from '@models/vacancies';

import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-career-view',
    templateUrl: 'career.view.html',
    styleUrls: ['career.view.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CareerViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    public vacancies: IVacancy[] = [];

    constructor(
        private _baseAPIService: BaseAPIService
    ) { }

    ngOnInit(): void {
        this._getVacancies();
    }

    private _getVacancies(): void {
        this._baseAPIService.career.getVacancies()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(({ data }) => {
                this.vacancies = data;
            });
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
