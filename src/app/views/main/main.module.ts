import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { SharedModule } from '@shared/shared.module';

import { TopbarComponent } from './components';

@NgModule({
    declarations: [
        ...MainRoutingModule.components,
        TopbarComponent
    ],
    imports: [
        MainRoutingModule,
        SharedModule,
        CommonModule
    ],
    exports: []
})
export class MainModule { }
