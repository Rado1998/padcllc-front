import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IProject, APIResponse } from '@models/index';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(
        private _httpClient: HttpClient
    ) { }

    public getOurProjects(): Observable<APIResponse<IProject[]>> {
        return this._httpClient.get<APIResponse<IProject[]>>('/projects/all');
    }
}
