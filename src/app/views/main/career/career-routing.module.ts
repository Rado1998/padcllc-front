import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerViewComponent } from './page/career.view';

const routes: Routes = [
    { path: '', component: CareerViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CareerRoutingModule {
    public static components = [CareerViewComponent];
}
