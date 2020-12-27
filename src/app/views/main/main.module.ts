import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainViewComponent } from './page/main.view';
import { MainRoutingModule } from './main-routing.module';
import { OurProjectsViewComponent } from './our-projects/our-projects.component';
import { WhatWeDoViewComponent } from './what-we-do/what-we-do.component';
import { OurServicesViewComponent } from './our-services/our-services.component';
import { OurServiceCardItemComponent } from './our-services/components';
import { PartnersViewComponent } from './partners/partners.component';
import { OurTeamViewComponent } from './our-team/our-team.component';

import { SharedModule } from '@shared/shared.module';

import { FooterComponent } from './components';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OurTeamCardComponent } from './our-team/components';



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
        /** PARTNERS */
        PartnersViewComponent,
        /** OUR TEAM */
        OurTeamViewComponent,
        OurTeamCardComponent
    ],
    imports: [
        MainRoutingModule,
        SharedModule,
        CommonModule,
        SlickCarouselModule
    ],
})
export class MainModule { }
