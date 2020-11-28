import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainViewComponent } from './page/main.view';
import { WhatWeDoViewComponent } from './what-we-do/what-we-do.component';
import { OurProjectsViewComponent } from './our-projects/our-projects.component';

const mainRoutes: Routes = [
    {
        path: '', component: MainViewComponent,
        children: [
            { path: '', redirectTo: 'home', },
            { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), data: { animation: 'HomePage' } },
            { path: 'our-projects', component: OurProjectsViewComponent, data: { animation: 'OurProjectsPage' } },
            { path: 'what-we-do', component: WhatWeDoViewComponent, data: { animation: 'WhatWeDoPage' } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
