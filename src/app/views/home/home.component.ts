import { AfterViewInit, Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyProvider } from 'src/app/assets/services/provider';
import { http } from 'src/app/assets/services/services';
import { filter } from 'rxjs/operators';
import { LocationStrategy } from '@angular/common'; 
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, AfterViewInit {
  grplistimg="assets/img/list.svg";
  trialblcimg="assets/img/libra.svg";
  balanceshitimg="assets/img/balance-sheet.svg";
  mfgrimg="assets/img/trading.svg";
  PAndLimg="assets/img/money.svg";
  stkimg="assets/img/pallet.svg";
  trdAnimg="assets/img/productvalue.png";

  isCollapsed = true;
  constructor(public router: Router,
    public spinner: NgxSpinnerService,
    public dialog: DialogsComponent,
    private location: LocationStrategy,
    public http: http, public provider: MyProvider) {

      history.pushState(null, null, window.location.href);  
      this.location.onPopState(() => {
        history.pushState(null, null, window.location.href);
      });  
    }


ngOnInit() {
  
}

  ngAfterViewInit(): void {

    var scope = this;
    //is sira  found?
    if (this.provider.companyinfo.sira) {
      var b = document.getElementById(this.provider.companyinfo.sira);
      b.classList.add("show");
    }


    //clear sira
    $('.accordion-header').click(function (e) {
      if(scope.provider.companyinfo.sira){
      var b = document.getElementById(scope.provider.companyinfo.sira);
      b.classList.remove("show");
      scope.provider.companyinfo.sira = null;
      }
    })
 
  }

  
  salesrpt() {
    this.router.navigate(['/salesreport'])
  }


  GSTR1() {
    this.router.navigate(['reports/statutory/gstr1']);
  }


  Trans_and_Ware(){
    this.router.navigate(['reports/transporting&warehowsing']);
  }
 
  navpage(s) {
    // if (this.provider.companyinfo.selectedbranch.firm_id == "") {
    //   this.dialog.swal({ dialog: 'Warning', title: 'Warning', message: 'Please Select firm..' });
    // } else {

      var scope = this;
      //click to sira store id
      $('.accordion-collapse').click(function (e) {

        e.preventDefault();
        var parentId = $(this).closest('div').prop('id');
        scope.provider.companyinfo.sira = parentId;
        scope.router.navigate([s])
      });

   // }
  }

  sales() {

    this.router.navigate(['reports/salesreport'])
  }

  auditinvalid() {
    this.dialog.swal({ dialog: 'Warning', title: 'Warning', message: 'Please Select the Firm  and try Again...' });
  }
 
}
