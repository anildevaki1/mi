import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BalanceSheetComponent } from './balance-sheet.component';
import { FormsModule } from '@angular/forms';
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';
  
const routes: Routes = [
  {
    path: '',
    component: BalanceSheetComponent,

  }
];

@NgModule({
  declarations: [BalanceSheetComponent],
  imports: [
    CommonModule,
    FormsModule,
     
    MydirectiveModule,
    RouterModule.forChild(routes)
  ]
})
export class BalanceSheetModule { }
