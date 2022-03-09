import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrainingsViewComponent } from './page/trainings.view';
import { TrainingDetailsViewComponent } from './training-details/training-details.view';

const mainRoutes: Routes = [
    { path: '', component: TrainingsViewComponent },
    { path: ':id', component: TrainingDetailsViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class TrainingsRoutingModule {
    public static components = [
        TrainingsViewComponent,
        TrainingDetailsViewComponent
    ];
}
