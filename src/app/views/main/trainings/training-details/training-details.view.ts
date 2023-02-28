import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
    public isAvailable: boolean = false;
    public subTitle: string = 'This training is not available for joining, as it has already been completed';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _baseAPIService: BaseAPIService,
        private _titleService: Title
    ) { }

    ngOnInit(): void {
        this._titleService.setTitle('Trainings - PADC, LLC');
        this._getTrainingById();
    }

    private _getTrainingById(): void {
        const { id } = this._activatedRoute.snapshot.params;
        this._baseAPIService.trainings.getTraining(id)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(({ data }) => {
                this.trainigData = data;
                this.isAvailable = data.isAvailable;
                if (this.isAvailable) {
                    this.subTitle = `
                    <b>To join the training, please fill out the form below.</b> <br>
                    <span class="warning-message">(Please be careful with providing data, because if the data is incorrect, we will not be able to contact you) </span>
                    `
                }
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
