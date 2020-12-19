import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainViewComponent } from './page/main.view';
import { MainRoutingModule } from './main-routing.module';
import { OurProjectsViewComponent } from './our-projects/our-projects.component';
import { WhatWeDoViewComponent } from './what-we-do/what-we-do.component';
import { OurServicesViewComponent } from './our-services/our-services.component';

import { SharedModule } from '@shared/shared.module';

import { FooterComponent } from './components';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OurServiceCardItemComponent } from './our-services/components';


@NgModule({
    declarations: [
        FooterComponent,
        /** MAIN */
        MainViewComponent,
        /** OUR PROJECTS */
        OurProjectsViewComponent,
        /** OUR SERVICES */
        OurServicesViewComponent,
        OurServiceCardItemComponent,
        /** WHAT WE DO */
        WhatWeDoViewComponent,

    ],
    imports: [
        MainRoutingModule,
        SharedModule,
        CommonModule,
        SlickCarouselModule
    ],
})
export class MainModule { }
