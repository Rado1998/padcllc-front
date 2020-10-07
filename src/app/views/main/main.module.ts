import { NgModule } from '@angular/core';

import { MainViewComponent } from './page/main.view';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    declarations: [MainViewComponent],
    imports: [MainRoutingModule],
    exports: []
})
export class MainModule { }
