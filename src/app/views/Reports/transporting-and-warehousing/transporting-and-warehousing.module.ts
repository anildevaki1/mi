import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';
import { RouterModule, Routes } from '@angular/router';
import { TransportingAndWarehousingComponent } from './transporting-and-warehousing.component';


const routes: Routes = [
  {
    path: '',
    component: TransportingAndWarehousingComponent,

  }
];


@NgModule({
  declarations: [TransportingAndWarehousingComponent],
  imports: [
    CommonModule,
    FormsModule,
    MydirectiveModule,
    RouterModule.forChild(routes)

  ]
})
export class TransportingAndWarehousingModule { }
