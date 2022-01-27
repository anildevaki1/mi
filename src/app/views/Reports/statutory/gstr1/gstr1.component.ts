import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gstr1',
  templateUrl: './gstr1.component.html',
  styleUrls: ['./gstr1.component.scss']
})
export class Gstr1Component implements OnInit {
  
  report:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }


  showRpt()
  {
    this.report=true;
  }

}
