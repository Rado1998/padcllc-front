import { NgModule } from '@angular/core';
import { ContactUsComponent, FooterComponent } from '@components/index';

import { InlineSvgDirective } from './directives';

@NgModule({
    declarations: [
        /* DIRECTIVES */
        InlineSvgDirective,
        /* COMPONENTS */
        FooterComponent,
        ContactUsComponent
    ],
    imports: [],
    exports: [
        InlineSvgDirective,
        FooterComponent,
        ContactUsComponent
    ]
})
export class SharedModule { }
