import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './page/home.view';

@NgModule({
    declarations: [HomeViewComponent],
    imports: [HomeRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
    exports: []
})
export class HomeModule { }
