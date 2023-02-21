import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    ContactUsComponent,
    FooterComponent,
    SendRequestComponent
} from '@components/index';

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
    imports: [RouterModule],
    exports: [
        InlineSvgDirective,
        FooterComponent,
        ContactUsComponent,
        SendRequestComponent
    ]
})
export class SharedModule { }
