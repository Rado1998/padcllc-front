import {
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ElementRef,
    AfterViewInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseAPIService } from '@api-services/index';
import { IJoinRequest } from '@models/join-request';
import { IVacancy } from '@models/vacancies';

import { map, skip, Subject, switchMap, takeUntil, timer } from 'rxjs';

import * as _ from 'lodash';
import { finalize } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-career-view',
    templateUrl: 'career.view.html',
    styleUrls: ['career.view.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CareerViewComponent implements OnInit, AfterViewInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    @ViewChild('sendRequest') private _sendRequestElement: ElementRef<HTMLElement>;
    public vacancies: IVacancy[] = [];
    public selectedVacancy: IVacancy;
    public joinSubtitle: string;
    public loading: boolean = false;
    public resetForm: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _baseAPIService: BaseAPIService,
        private _toastrService: ToastrService,
        private _titleService: Title
    ) {
        this._titleService.setTitle('Career - PADC, LLC');
    }

    ngOnInit(): void {
        this._getVacancies();
    }

    ngAfterViewInit(): void {
        this._handleRouteChanges();
    }

    private _handleRouteChanges(): void {
        this._activatedRoute.queryParams
            .pipe(
                takeUntil(this._unsubscribe$),
                skip(1),
                map((params) => {
                    const { vacancyId } = params;
                    this._findVacancy(Number(vacancyId));
                }),
                switchMap(() => {
                    return timer(800)
                        .pipe(
                            map(() => {
                                this._sendRequestElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
                            })
                        );
                })
            ).subscribe();
    }

    private _findVacancy(id: number): void {
        this.selectedVacancy = this.vacancies.find((e) => e.id === id);
        if (this.selectedVacancy) {
            this.joinSubtitle = `<b>You're applying for a/an ${this.selectedVacancy.title} vacancy</b>`;
        }
    }

    private _getVacancies(): void {
        this._baseAPIService.career.getVacancies()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(({ data }) => {
                this.vacancies = data;
                const { vacancyId } = this._activatedRoute.snapshot.queryParams;
                this._findVacancy(Number(vacancyId));
            });
    }

    public onFormSubmit(data: IJoinRequest): void {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this._baseAPIService.career.joinCareer(this.selectedVacancy.id, data)
            .pipe(
                takeUntil(this._unsubscribe$),
                map(() => {
                    this.resetForm.next(true);
                    this._toastrService.info(`Message has been successfully sent !`);
                }),
                finalize(() => this.loading = false)
            ).subscribe();
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
