import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BaseAPIService } from '@api-services/base-api.service';
import { environment } from '@env';
import { IMediaFile } from '@models/media-files';
import { ITraining } from '@models/trainings';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-trainings-view',
    templateUrl: 'trainings.view.html',
    styleUrls: ['trainings.view.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TrainingsViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    public trainings: ITraining[] = [];

    constructor(
        private _baseAPIService: BaseAPIService,
        private _titleService: Title
    ) { }

    ngOnInit(): void {
        this._titleService.setTitle('Trainings - PADC, LLC');
        this._getAllTrainings();
    }

    private _getAllTrainings(): void {
        this._baseAPIService.trainings.getAllTrainings()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(({ data }) => {
                this.trainings = data;
            });
    }

    public getImageUrl(mediaFiles: IMediaFile): string {
        return `${environment.apiUrl}/${mediaFiles?.path}`;
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
