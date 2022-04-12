import { Injectable } from '@angular/core';
import { IProject } from '@models/projects';
import { Observable } from 'rxjs';

import { MainService } from './main-api.service';

@Injectable({
    providedIn: 'root'
})
export class BaseAPIService {

    constructor(
        public main: MainService
    ) { }

}
