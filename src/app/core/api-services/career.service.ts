import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '@models/api-response';
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
}
