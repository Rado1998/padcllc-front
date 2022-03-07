import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/main/main.module').then((m) => m.MainModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      useHash: false,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
