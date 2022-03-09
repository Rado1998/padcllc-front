import { NgModule } from '@angular/core';

import { MainViewComponent } from './page/main.view';
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
        SharedModule
    ],
    exports: []
})
export class MainModule { }
