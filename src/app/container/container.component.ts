import { Component, OnInit } from '@angular/core';


declare var $:any;

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  ref:any={};
  entity:any={};
  branchlist=[
    {id:1,name:'Krushna Godavari'},
    {id:2,name:'abcd'},
    {id:3,name:'xyz'},
    {id:4,name:'asdasd'}
  ]
  
  years=[
    '20202021','20212022'
  ]
  constructor() { }

  ngOnInit(): void {
    this.ref.branch=1;
    this.ref.year='20202021';
    this.entity.branch='Krushna Godavari';
    this.entity.year='20202021';
  }


  changeFinYear()
  {
     
    this.entity.branch=this.branchlist.filter(s=>s.id==this.ref.branch)[0].name;
    this.entity.year=this.ref.year;
    $('#FinYearModal').modal('hide');
  }

}
