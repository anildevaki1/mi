import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
 
import { FormsModule } from '@angular/forms'; 
import { ContainerComponent } from './container/container.component';  
import { HttpClientModule } from '@angular/common/http'; 
import { NgxSpinnerModule } from 'ngx-spinner';  
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MydirectiveModule } from './assets/directive/mydirective.module';
import { TestFilterPipe } from './assets/pipes/inrcrdr.pipe';
import { MyProvider } from './assets/services/provider';
import { AuthGuardservice } from './assets/services/services';
 
const appInitializerFn = (MyProvider) => {
  return () => {
    return MyProvider.setConfig();
  };
};


const APP_CONTAINERS = [
  ContainerComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ContainerComponent
    
   ],
  imports: [
    NgxChartsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MydirectiveModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    
  ],
   
  providers: [TestFilterPipe,
    AuthGuardservice,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,

      deps: [MyProvider]
    },

    { provide:LOCALE_ID,  useValue: "en-IN" }],
  bootstrap: [AppComponent]
})
export class AppModule { }

