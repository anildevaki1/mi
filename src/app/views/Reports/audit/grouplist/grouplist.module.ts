import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrouplistComponent } from './grouplist.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular'; 
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';


const routes: Routes = [
  {
    path: '',
    component: GrouplistComponent,

  }
];

@NgModule({
  declarations: [
    GrouplistComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    MydirectiveModule,
    RouterModule.forChild(routes)

  ]
})
export class GrouplistModule { }
