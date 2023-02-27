import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    ContactUsComponent,
    FooterComponent,
    SendRequestComponent
} from '@components/index';
import { NgxMaskModule } from 'ngx-mask';

import { InlineSvgDirective } from './directives';

@NgModule({
    declarations: [
        /* DIRECTIVES */
        InlineSvgDirective,
        /* COMPONENTS */
        FooterComponent,
        ContactUsComponent,
        SendRequestComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        NgxMaskModule
    ],
    exports: [
        InlineSvgDirective,
        FooterComponent,
        ContactUsComponent,
        SendRequestComponent
    ]
})
export class SharedModule { }
