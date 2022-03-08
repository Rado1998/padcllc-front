import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainViewComponent } from './page/main.view';
import { TrainingsViewComponent } from './trainings/trainings.view';

const mainRoutes: Routes = [
    {
        path: '', component: MainViewComponent,
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'trainings', component: TrainingsViewComponent },
            { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
    public static components = [
        MainViewComponent,
        TrainingsViewComponent
    ];
}
