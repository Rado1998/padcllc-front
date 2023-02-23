import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTPHelpers } from '@helpers/http';
import { APIResponse } from '@models/api-response';
import { IJoinRequest } from '@models/join-request';
import { IVacancy } from '@models/vacancies';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CareerService {

    constructor(
        private _httpClient: HttpClient
    ) { }

    getVacancies(): Observable<APIResponse<IVacancy[]>> {
        return this._httpClient.get<APIResponse<IVacancy[]>>('/vacancies');
    }

    joinCareer(id: number, body: IJoinRequest): Observable<APIResponse<null>> {
        const formData = HTTPHelpers.createFormDataFromObject(body);
        return this._httpClient.post<APIResponse<null>>(`/vacancies/${id}/submit`, formData);
    }
}
