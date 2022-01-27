import { style } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal"; 


declare var $: any;


export interface ConfirmModel {
  list: [];
  columns: [];
  rows: string;
}

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent extends SimpleModalComponent<ConfirmModel, boolean>
  implements ConfirmModel {
    api: any;
   
  list: any = [];
  columns: any = [];
  rows: any;
   
  defaultColDef = {
    sortable: true,
    floatingFilter: true,
    resizable: true,
  };


  constructor() {
    super();
  }

  confirm(s) {
    this.result = s;
    this.close();
  }


  ngOnInit() { 
     
  }

 

  onGridReady(params) {
    params.api.sizeColumnsToFit();
    this.api = params.api;
  }
 

  onSelectionChanged(s){
    this.result = s;
    this.close();
  }

 
 

}
