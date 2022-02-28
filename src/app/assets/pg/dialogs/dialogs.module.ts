import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { DialogsComponent } from './dialogs.component';


const routes: Routes = [
  {
    path: '',
    component: DialogsComponent,
   
  }
];


@NgModule({
  declarations: [DialogsComponent],
  imports: [
    CommonModule
  ]
})
export class DialogsModule { }
