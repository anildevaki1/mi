import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-popup',
  templateUrl: './loading-popup.component.html',
  styleUrls: ['./loading-popup.component.scss']
})
export class LoadingPopupComponent implements OnInit {
 @ViewChild('customLoadingTemplate') customLoadingTemplate: TemplateRef<any>;
  public  loading=false;
  constructor() { }

  ngOnInit(): void {
  }

}
