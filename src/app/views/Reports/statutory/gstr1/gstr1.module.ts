import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Gstr1Component } from './gstr1.component';


const routes: Routes = [
  {
    path: '',
    component: Gstr1Component,

  }
];


@NgModule({
  declarations: [Gstr1Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class Gstr1Module { }
