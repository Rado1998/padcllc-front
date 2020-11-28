import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components';
import { InlineSvgDirective } from './directives';

@NgModule({
    declarations: [
        /* COMPONENTS */
        NavbarComponent,
        /* DIRECTIVES */
        InlineSvgDirective
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        NavbarComponent,
        InlineSvgDirective
    ]
})
export class SharedModule { }
