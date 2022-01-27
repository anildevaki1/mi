import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'

import { MyProvider } from '../../services/provider';
import {formatDate} from '@angular/common';


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

export class RdlcviewerComponent   implements  OnInit {

  @Input() trustedUrl: string;
  @Input() params:any= [];

  @Output() closemodalfn = new EventEmitter<boolean>();
  rpturl:any;
  currentdate;
  constructor(public provider: MyProvider,
              private sanitizer: DomSanitizer,
              ) {}

  ngOnInit(): void {

    var currDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
    this.currentdate = "currDate=" + currDate;

    for (var i = 0; i < this.params.length; i++) {
      this.currentdate += "&" + this.params[i].key + "=" + this.params[i].value
    }

    this.rpturl= this.sanitizer.bypassSecurityTrustResourceUrl(this.provider.reportserver + this.trustedUrl+'?'+this.currentdate);

  }


  closemodal()
  {
    this.closemodalfn.emit(false);
  }
}
