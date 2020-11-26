import { NgModule } from '@angular/core';

import { MainViewComponent } from './page/main.view';
import { MainRoutingModule } from './main-routing.module';

import { SharedModule } from '@shared/shared.module';

import { FooterComponent, TopbarComponent } from './components';

@NgModule({
    declarations: [
        MainViewComponent,
        TopbarComponent,
        FooterComponent
    ],
    imports: [
        MainRoutingModule,
        SharedModule
    ],
    exports: []
})
export class MainModule { }
