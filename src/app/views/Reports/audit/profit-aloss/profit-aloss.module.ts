import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfitALossComponent } from './profit-aloss.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';


const routes: Routes = [
  {
    path: '',
    component: ProfitALossComponent,

  }
];

@NgModule({
  declarations: [ProfitALossComponent],
  imports: [
    CommonModule,
    FormsModule,
    MydirectiveModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfitALossModule { }
