import { NgModule } from '@angular/core';
import { Routes, RouterModule, InitialNavigation } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/main/main.module').then((m) => m.MainModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
