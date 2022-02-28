import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfgrComponent } from './mfgr.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';


const routes: Routes = [
  {
    path: '',
    component: MfgrComponent,

  }
];

@NgModule({
  declarations: [
    MfgrComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    MydirectiveModule
  ]
})
export class MfgrModule { }
