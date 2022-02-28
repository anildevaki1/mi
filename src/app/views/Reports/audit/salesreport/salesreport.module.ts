import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesreportComponent } from './salesreport.component';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { RouterModule, Routes } from '@angular/router'; 
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';
 

const routes: Routes = [
  {
    path: '',
    component: SalesreportComponent,

  }
];


@NgModule({
  declarations: [
    SalesreportComponent
  ],
  imports: [
    
    CommonModule,
    UiSwitchModule,
    FormsModule,
    MydirectiveModule,
    RouterModule.forChild(routes)
  ]
})
export class SalesreportModule { }
