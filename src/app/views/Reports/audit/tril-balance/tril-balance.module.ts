import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrilBalanceComponent } from './tril-balance.component';
import { FormsModule } from '@angular/forms'; 
import { AgGridModule } from 'ag-grid-angular'; 
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';


const routes: Routes = [
  {
    path: '',
    component: TrilBalanceComponent,

  }
];

@NgModule({
  declarations: [TrilBalanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    MydirectiveModule,
    RouterModule.forChild(routes)
  ]
})
export class TrilBalanceModule { }
