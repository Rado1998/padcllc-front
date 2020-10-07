import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './page/home.view';

@NgModule({
    declarations: [HomeViewComponent],
    imports: [HomeRoutingModule],
    exports: []
})
export class HomeModule { }
