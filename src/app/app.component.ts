import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>
  <ngx-spinner bdColor='rgba(51, 51, 51, 0.8)' size="default" type="ball-spin-clockwise">
  <p style="color: white">Please Wait. </p>
  </ngx-spinner>`,
  
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
   
  constructor(){}

  ngOnInit(): void {}
}
