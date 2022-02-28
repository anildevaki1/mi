import { Component, OnInit,Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'

import { MyProvider } from '../../services/provider';
import {formatDate} from '@angular/common';
import { fromEvent } from 'rxjs';

declare var $: any;


// export interface reportViewrModel {
//   trustedUrl: string;
//   params: [];
// }


@Component({
  selector: 'app-rdlcviewer',
  templateUrl: './rdlcviewer.component.html',
  styleUrls: ['./rdlcviewer.component.scss']
})

export class RdlcviewerComponent   implements  OnInit,AfterViewInit {
  @Input() title='';
  @Input() trustedUrl: string;
  @Input() params:any= [];
  @Input() width='';
  @Input() height='';
  @Input() ison:boolean;

  @Output() closemodalfn = new EventEmitter<boolean>();
  rpturl:any;
  currentdate;
  bsspinner:boolean=false;
  constructor(public provider: MyProvider,
              private sanitizer: DomSanitizer,
            
              ) {}

  ngOnInit(): void {
    this.bsspinner=true;
    var currDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
    this.currentdate = "currDate=" + currDate;

    for (var i = 0; i < this.params.length; i++) {
      this.currentdate += "&" + this.params[i].key + "=" + this.params[i].value
    }
    
    document.getElementById('ssrsiframe').style.height=this.height;

    this.rpturl= this.sanitizer.bypassSecurityTrustResourceUrl(this.provider.reportserver + this.trustedUrl+'?'+this.currentdate);
     
  }

  onload(){
    this.bsspinner=false;
  }


  closemodal()
  {
    this.closemodalfn.emit(false);
  }

   ngAfterViewInit(): void {
    const iframe = document.getElementById('ssrsiframe');

    fromEvent(iframe, 'load').subscribe(() => {
      this.bsspinner=false;
    });
   }
 
}
