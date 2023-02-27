import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CareerRoutingModule } from './career-routing.module';
import { CareerItemComponent } from './components';

@NgModule({
    declarations: [
        ...CareerRoutingModule.components,
        CareerItemComponent
    ],
    imports: [
        CareerRoutingModule,
        SharedModule,
        CommonModule
    ]
})
export class CareerModule { }
