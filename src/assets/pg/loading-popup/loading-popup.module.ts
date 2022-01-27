import {   NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoadingPopupComponent } from './loading-popup.component';




const routes: Routes = [
  {
    path: '',
    component: LoadingPopupComponent,

  }
];

@NgModule({
  declarations: [LoadingPopupComponent],
  imports: [

    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class LoadingPopupModule { }
