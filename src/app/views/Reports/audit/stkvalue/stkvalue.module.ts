import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StkvalueComponent } from './stkvalue.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';


const routes: Routes = [
  {
    path: '',
    component: StkvalueComponent,

  }
];

@NgModule({
  declarations: [
    StkvalueComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    MydirectiveModule
  ]
})
export class StkvalueModule { }
