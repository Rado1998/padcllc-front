import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTPHelpers } from '@helpers/http';

import { IProject, APIResponse, ITeamMember, IJoinRequest } from '@models/index';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainService {

    constructor(
        private _httpClient: HttpClient
    ) { }

    public getOurProjects(): Observable<APIResponse<IProject[]>> {
        return this._httpClient.get<APIResponse<IProject[]>>('/projects');
    }

    public getTeamData(): Observable<ITeamMember[]> {
        return this._httpClient.get<ITeamMember[]>(`${window.location.origin}/assets/data/team.json`);
    }

    public sendContactRequest(body: IJoinRequest): Observable<APIResponse<null>> {
        const formData = HTTPHelpers.createFormDataFromObject(body);
        return this._httpClient.post<APIResponse<null>>(`/contact-requests`, formData);
    }
}
