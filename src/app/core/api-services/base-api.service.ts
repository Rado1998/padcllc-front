import { Injectable } from '@angular/core';
import { CareerService } from './career.service';

import { MainService } from './main-api.service';
import { TrainingsService } from './trainings.service';

@Injectable({
    providedIn: 'root'
})
export class BaseAPIService {

    constructor(
        public main: MainService,
        public trainings: TrainingsService,
        public career: CareerService
    ) { }

}
