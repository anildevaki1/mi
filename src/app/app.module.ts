import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
 
import { FormsModule } from '@angular/forms'; 
import { ContainerComponent } from './container/container.component'; 
import { MydirectiveModule } from 'src/assets/directive/mydirective.module';

const APP_CONTAINERS = [
  ContainerComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ContainerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MydirectiveModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
   
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

