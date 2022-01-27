import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

import { MyProvider } from '../../services/provider';


declare let document: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() action: any = '';
 
  @Output() newItemEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(public el: ElementRef,
    public renderer:Renderer2,
    public provider: MyProvider,
  ) { }

  ngOnInit() {
    this.selectNav_item(this.action);
  }

  @HostListener('click') onclick() {
    if (this.action)
      this.selectNav_item(this.action);
  }


  selectNav_item(s) {
    switch (s) {
      case "save": {
        this.newItemEvent.emit(this.action);
        break;
      }
      case "undo": {
        this.newItemEvent.emit(this.action);
        break;
      }
      case "new": {
        this.newItemEvent.emit(this.action);
        break;
      }

      case "edit": {
        this.newItemEvent.emit(this.action);
        break;
      }

      case "close": {
        this.newItemEvent.emit(this.action);
        break;
      }

       default:{
        this.newItemEvent.emit(this.action);
        break;
       }
    }


  }


  formatbutton(s) {
    var allow = this.provider.companyinfo.user.grants;

    if ((s == "new" && allow.A == true)     || (s == "edit" && allow.E == true)) {
     
      document.getElementById("new").disabled = true;
      document.getElementById("edit").disabled = true;
      document.getElementById("print").disabled = true;
      // document.getElementById("mail").disabled = true;
      document.getElementById("attach").disabled = true;
      document.getElementById("export").disabled = true;
      document.getElementById("save").disabled = false;
      document.getElementById("undo").disabled = false;

      //document.getElementById("close").disabled = false;
      document.getElementById("new").style.color = "gray";
      document.getElementById("edit").style.color = "gray";
      document.getElementById("print").style.color = "gray";
      //  document.getElementById("mail").style.color = "gray";
      document.getElementById("attach").style.color = "gray";
      document.getElementById("export").style.color = "gray";
      document.getElementById("save").style.color = "white";
      document.getElementById("undo").style.color = "white";

    } else {

      document.getElementById("new").disabled = allow.A == true ? false : true;
      document.getElementById("edit").disabled = allow.E == true ? false : true;
      document.getElementById("print").disabled = allow.P == true ? false : true;
      //  document.getElementById("mail").disabled = allow.P == true ? false : true;;
      document.getElementById("attach").disabled = false;
      document.getElementById("export").disabled = allow.P == true ? false : true;;
      document.getElementById("save").disabled = true;
      document.getElementById("undo").disabled = true;
      //document.getElementById("close").disabled = false;
      document.getElementById("new").style.color = allow.A == true ? "white" : "gray";
      document.getElementById("edit").style.color = allow.E == true ? "white" : "gray";
      document.getElementById("print").style.color = allow.P == true ? "white" : "gray";
      // document.getElementById("mail").style.color = allow.P == true ? "white" : "gray";
      document.getElementById("attach").style.color = "white";
      document.getElementById("export").style.color = allow.P == true ? "white" : "gray";
      document.getElementById("save").style.color = "gray";
      document.getElementById("undo").style.color = "gray";
    }


    if (this.action.pageFor == "APPROVAL") {
      document.getElementById("save").innerHTML = '<i class="fa fa-save fa-md"></i>&nbsp;&nbsp;Approval';
      document.getElementById("undo").innerHTML = '<i class="fa fa-undo fa-md"></i>&nbsp;&nbsp;Reject';
    }


    if (this.action.navtype == "M") {

      document.getElementById("print").style.display = "none";
      //   document.getElementById("mail").style.display = "none";
      document.getElementById("attach").style.display = "none";
      document.getElementById("export").style.display = "none";
      document.getElementById("sep3").style.display = "none";
    }
  }


}
