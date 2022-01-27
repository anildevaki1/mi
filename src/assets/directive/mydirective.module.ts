import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  SpecialwithnumDirective,
  UppercaseDirective
} from './mydirective.directive';

import { ArraySortPipe, dssDate, InrcrdrPipe,  trimWhiteSpace } from '../pipes/inrcrdr.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms'; 
import { NavbarComponent } from '../../assets/pg/navbar/navbar.component';
import { RdlcviewerComponent } from '../../assets/pg/rdlcviewer/rdlcviewer.component';
import { DialogsModule } from '../../assets/pg/dialogs/dialogs.module';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxPaginationModule } from 'ngx-pagination'; 

import { CompressImageService } from '../services/services';
import {NgxImageCompressService} from 'ngx-image-compress';  
import {MatButtonModule} from '@angular/material/button';  
import {MatIconModule} from '@angular/material/icon';
import { ButtonRendererComponent } from '../pg/btn-cell-renderer/btn-cell-renderer.component';
import { DialogsComponent } from '../pg/dialogs/dialogs.component';

const array = [
  NavbarComponent,
  RdlcviewerComponent,
  intigerOnlyDirective,
  InrcrdrPipe,
  ArraySortPipe,
  dssDate,
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
    array
  ],
  imports: [
     
     MatButtonModule,
     MatIconModule,
    NgSelectModule,
    DialogsModule,
    CommonModule,
  
    FormsModule,
    NgxPaginationModule,
   
    UiSwitchModule,
     
  ],
  providers:[
    CompressImageService,
    NgxImageCompressService,
    ButtonRendererComponent,
    DialogsComponent
  ],
  exports: [
    array,
    NgSelectModule,
    MatButtonModule,
    MatIconModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MydirectiveModule { }
