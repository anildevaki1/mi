import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DebtorsOutstdComponent } from './debtors-outstd.component';
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';

 
const routes: Routes = [
  {
    path: '',
    component: DebtorsOutstdComponent,

  }
];

@NgModule({
  declarations: [DebtorsOutstdComponent],
  imports: [
    CommonModule,
   
    MydirectiveModule,
    RouterModule.forChild(routes)
  ]
})
export class DebtorsOutstdModule { }
