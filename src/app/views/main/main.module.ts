import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainViewComponent } from './page/main.view';
import { MainRoutingModule } from './main-routing.module';
import { OurProjectsViewComponent } from './our-projects/our-projects.component';
import { WhatWeDoViewComponent } from './what-we-do/what-we-do.component';

import { SharedModule } from '@shared/shared.module';

import { FooterComponent } from './components';

import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
    declarations: [
        MainViewComponent,
        OurProjectsViewComponent,
        WhatWeDoViewComponent,
        FooterComponent
    ],
    imports: [
        MainRoutingModule,
        SharedModule,
        CommonModule,
        SlickCarouselModule
    ],
})
export class MainModule { }
