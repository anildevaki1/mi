import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreditorsOutstdComponent } from './creditors-outstd.component';
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';


const routes: Routes = [
  {
    path: '',
    component: CreditorsOutstdComponent,

  }
];


@NgModule({
  declarations: [CreditorsOutstdComponent],
  imports: [
    CommonModule,
    MydirectiveModule,
    RouterModule.forChild(routes)
  ]
})
export class CreditorsOutstdModule { }
