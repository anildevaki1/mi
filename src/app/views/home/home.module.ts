import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';  
import { MydirectiveModule } from 'src/app/assets/directive/mydirective.module';
import { AuthGuardservice } from 'src/app/assets/services/services';



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
  ],
  providers:[AuthGuardservice]
})
export class HomeModule { }
