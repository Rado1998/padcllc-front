import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainViewComponent } from './page/main.view';

const mainRoutes: Routes = [
    {
        path: '', component: MainViewComponent,
        children: [
            { path: '', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
