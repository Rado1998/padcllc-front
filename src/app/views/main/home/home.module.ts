import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './page/home.view';

import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
    declarations: [HomeViewComponent],
    imports: [
        HomeRoutingModule,
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        SlickCarouselModule
    ],
    exports: []
})
export class HomeModule { }
