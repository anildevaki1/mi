import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import {
  capitalizeDirective,
  combiOnlyDirective,
  currencyDirective,
  decimalDirective,
  finDateDirective,
  imguploadDirective,
  InputRestrictionDirective,
  intigerOnlyDirective,
  minmaxDirective,
  noWhiteSpaceDirective,
  NumberOnlyDirective,
  SortDirective,
  SpecialwithnumDirective,
  UppercaseDirective
} from './mydirective.directive';

import { ArraySortPipe, dssDate, InrcrdrPipe,  trimWhiteSpace } from '../pipes/inrcrdr.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';  
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxPaginationModule } from 'ngx-pagination'; 

import { AuthGuardservice, CompressImageService, Master } from '../services/services';
import {NgxImageCompressService} from 'ngx-image-compress';  
import {MatButtonModule} from '@angular/material/button';  
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon'; 
import { SimpleModalModule } from 'ngx-simple-modal';
import {  AgGridModule } from 'ag-grid-angular'; 
import {TestFilterPipe} from '../pipes/inrcrdr.pipe';
import "@angular/common/locales/global/en-IN";  
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { NavbarComponent } from '../pg/navbar/navbar.component';
import { RdlcviewerComponent } from '../pg/rdlcviewer/rdlcviewer.component';
import { HelperComponent } from '../pg/helper/helper.component';
import { DialogsModule } from '../pg/dialogs/dialogs.module';
import { ButtonRendererComponent } from '../pg/btn-cell-renderer/btn-cell-renderer.component';
import { DialogsComponent } from '../pg/dialogs/dialogs.component';
 
const array = [
  NavbarComponent,
  RdlcviewerComponent,
  intigerOnlyDirective,
  InrcrdrPipe,
  ArraySortPipe,
  dssDate,
  SortDirective,
  HelperComponent,
  SpecialwithnumDirective,
   minmaxDirective,
  capitalizeDirective,
  UppercaseDirective,
  combiOnlyDirective,
  imguploadDirective,
  decimalDirective,  
  finDateDirective,
  currencyDirective,
  NumberOnlyDirective,
  noWhiteSpaceDirective,
  trimWhiteSpace,
  InputRestrictionDirective
]

@NgModule({
  declarations: [
    array,
    
    TestFilterPipe,
  ],
  imports: [
    
    MatButtonModule,
    MatIconModule,
    NgSelectModule,
    DialogsModule,
    CommonModule,
    AgGridModule,
    FormsModule,
    NgxPaginationModule,
   SimpleModalModule.forRoot({ container: document.body }),
    UiSwitchModule,
    NgxChartsModule,
    MatCardModule,
     
  ],
  providers:[
    CompressImageService,
    NgxImageCompressService,
    ButtonRendererComponent,
     DialogsComponent,
    InrcrdrPipe,
    Master,
    SortDirective,
    DecimalPipe,
    ArraySortPipe,
    DatePipe,
    CurrencyPipe,
    AuthGuardservice,
    { provide: LOCALE_ID, useValue: "en-IN" }
  ],
  exports: [
    array,
    
    NgxPaginationModule,
    NgSelectModule,
    TestFilterPipe,
    AgGridModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    UiSwitchModule,
    InrcrdrPipe,
    DecimalPipe,
    NgxChartsModule,
    
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MydirectiveModule { }
