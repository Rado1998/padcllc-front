import { NgModule } from '@angular/core';

import { InlineSvgDirective } from './directives';

@NgModule({
    declarations: [
        /* DIRECTIVES */
        InlineSvgDirective
    ],
    imports: [],
    exports: [
        InlineSvgDirective
    ]
})
export class SharedModule { }
