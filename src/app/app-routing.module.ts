import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'reports/salesreport',
        loadChildren: () => import('./views/Reports/salesreport/salesreport.module').then(m => m.SalesreportModule),
      },
      {
        path: 'reports/statutory/gstr1',
        loadChildren: () => import('./views/Reports/statutory/gstr1/gstr1.module').then(m => m.Gstr1Module),
      },
      
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
