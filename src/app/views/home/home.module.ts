import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';  
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

  }
];



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MydirectiveModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
