import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradinganiComponent } from './tradingani.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';  
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';


const routes: Routes = [
  {
    path: '',
    component: TradinganiComponent,

  }
];

@NgModule({
  declarations: [
    TradinganiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MydirectiveModule,
    RouterModule.forChild(routes)
  ]
})
export class TradinganiModule { }
