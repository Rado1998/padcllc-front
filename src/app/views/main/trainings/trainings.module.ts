import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { SharedModule } from '@shared/shared.module';
import { TrainingsRoutingModule } from './trainings-routing.module';

@NgModule({
    declarations: [
        ...TrainingsRoutingModule.components,
    ],
    imports: [
        CommonModule,
        TrainingsRoutingModule,
        SharedModule
    ],
    exports: []
})
export class TrainingsModule { }
