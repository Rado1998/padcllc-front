import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainViewComponent } from './page/main.view';

const mainRoutes: Routes = [
    {
        path: '', component: MainViewComponent,
        children: [
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'trainings', loadChildren: () => import('./trainings/trainings.module').then((m) => m.TrainingsModule) },
            { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
            { path: 'career', loadChildren: () => import('./career/career.module').then((m) => m.CareerModule) }
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
    ];
}
