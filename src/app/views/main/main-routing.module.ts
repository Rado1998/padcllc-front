import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainViewComponent } from './page/main.view';
import { WhatWeDoViewComponent } from './what-we-do/what-we-do.component';
import { OurProjectsViewComponent } from './our-projects/our-projects.component';
import { OurServicesViewComponent } from './our-services/our-services.component';
import { OurTeamViewComponent } from './our-team/our-team.component';
// import { PartnersViewComponent } from './partners/partners.component';

const mainRoutes: Routes = [
    {
        path: '', component: MainViewComponent,
        children: [
            { path: '', redirectTo: 'home', },
            { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), data: { animation: 'HomePage' } },
            { path: 'our-projects', component: OurProjectsViewComponent, data: { animation: 'OurProjectsPage' } },
            { path: 'what-we-do', component: WhatWeDoViewComponent, data: { animation: 'WhatWeDoPage' } },
            { path: 'our-services', component: OurServicesViewComponent, data: { animation: 'OurServicesPage' } },
            // { path: 'partners', component: PartnersViewComponent, data: { animation: 'PartnersPage' } },
            { path: 'our-team', component: OurTeamViewComponent, data: { animation: 'OurTeamPage' } }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
