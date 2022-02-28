import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { MydirectiveModule } from '../assets/directive/mydirective.module';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent,

  }
];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    MydirectiveModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
