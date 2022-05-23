import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { APIResponse } from '@models/api-response';
import { ITraining } from '@models/trainings';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrainingsService {

    constructor(
        private _httpClient: HttpClient
    ) { }

    public getAllTrainings(): Observable<APIResponse<ITraining[]>> {
        return this._httpClient.get<APIResponse<ITraining[]>>('/trainings');
    }

    public getTraining(id: number): Observable<APIResponse<ITraining>> {
        return this._httpClient.get<APIResponse<ITraining>>(`/trainings/${id}`);
    }
}
