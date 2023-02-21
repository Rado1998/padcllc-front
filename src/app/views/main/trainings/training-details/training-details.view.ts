import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseAPIService } from '@api-services/base-api.service';
import { environment } from '@env';
import { IMediaFile } from '@models/media-files';
import { ITraining } from '@models/trainings';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-training-details-view',
    templateUrl: 'training-details.view.html',
    styleUrls: ['training-details.view.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TrainingDetailsViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    public trainigData: ITraining = {} as ITraining;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _baseAPIService: BaseAPIService
    ) { }

    ngOnInit(): void {
        this._getTrainingById();
    }

    private _getTrainingById(): void {
        const { id } = this._activatedRoute.snapshot.params;
        this._baseAPIService.trainings.getTraining(id)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(({ data }) => {
                this.trainigData = data;
            });
    }

    public getImageUrl(mediaFiles: IMediaFile): string {
        console.log(mediaFiles,'media');
        return `${environment.apiUrl}/${mediaFiles?.path}`;
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
