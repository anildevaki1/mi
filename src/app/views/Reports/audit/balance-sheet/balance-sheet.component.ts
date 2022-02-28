import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs'; 
import { LOCALE_ID } from '@angular/core';
import {http, Master} from '../../../../assets/services/services'; 
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { MyProvider } from 'src/app/assets/services/provider';
declare var $: any;


@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.scss']
})
export class BalanceSheetComponent implements OnInit {
  @ViewChild('movement') movementme: ElementRef
  entity: any = {};
  mode: boolean = false;

  plAmount = 0;
  balancesheet;
  list = [];
  columns = [];
  defaultColDef: any = {};
  balance: any = {};
  p: number = 1;
  myem: boolean = false;
  reference: any = {};
  debit = 0;
  credit = 0;
  searchfield: any = {};
  myclass = "bi bi-plus-lg text-dark h5";
  constructor(public datepipe: DatePipe,
    public dialog: DialogsComponent,
    public router: Router,
    public http: http,
    public master: Master,
    public spinner: NgxSpinnerService,
    public provider: MyProvider) { }

  ngOnInit(): void {
    this.reference.lib = 0;
    this.reference.asset = 0;
    this.entity.reportType = "2";
    var year=this.provider.companyinfo.finyear;

    this.entity.fdate = this.datepipe.transform(year.fdt, 'yyyy-MM-dd');
    this.entity.tdate = this.datepipe.transform(year.tdt, 'yyyy-MM-dd');
    
    this.entity.currentDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    if(this.entity.fdate < this.entity.currentDate && this.entity.tdate > this.entity.currentDate){
      this.entity.currentDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    }else{
      this.entity.currentDate=this.entity.tdate;
    }

    
    this.showRecord();
  }

  printReport() {
    if (this.entity.reportType != undefined) {

       
      this.entity.url = "Reports/Finance/Audit/Pages/blsheet";

      var companyinfo = this.provider.companyinfo.selectedbranch;

      this.entity.params = [
        { key: "firm_id", value: companyinfo.firm_id },
        { key: "branch_id", value: companyinfo.branch_id },
        { key: "div_id", value: companyinfo.div_id },
        { key: "edt", value: this.datepipe.transform(new Date(this.entity.currentDate), 'yyyy-MM-dd') },
        { key: "reporttype", value: this.entity.reportType },
      ];


      this.mode = true;
      document.getElementById("offcanvase").click();
    }
    else {
      this.dialog.swal({ dialog: 'Warning', title: 'Warning', message: 'Please Select Report type!' })
    }
  }

  close() {
    this.router.navigate(['home']);
  }

  onclose(s) {
    this.mode = false;
  }


  showRecord() {
    this.debit=this.credit=0;
    
    this.spinner.show();

    var companyinfo = this.provider.companyinfo.selectedbranch;

    var params = {
      firm_id:   companyinfo.firm_id ? companyinfo.firm_id : '',
      branch_id: companyinfo.branch_id ? companyinfo.branch_id : '',
      div_id: companyinfo.div_id,
      username: this.provider.companyinfo.userInfo.username,
      edt: this.entity.currentDate
    }
    this.http.get('Finance/getBalanceSheet', params).subscribe({
      next: (response: any) => {

        var data = response;

        for (let i = 0; i < data.length; i++) {
          this.debit = JSON.parse(this.master.RoundN(this.debit + parseFloat(data[i].debit), 2));
          this.credit = JSON.parse(this.master.RoundN(this.credit + parseFloat(data[i].credit), 2));

        }
        this.plAmount = JSON.parse(this.master.RoundN((this.debit - this.credit), 2));

        if (this.plAmount > 0) {
          var row = {
            'sg_name': 'Net Profit',
            'credit': this.plAmount,
            'debit': 0
          }
          data.push(row);
          this.credit += this.plAmount;
        }
        else {

          row = {
            'sg_name': 'Net Loss',
            'debit': this.plAmount * -1,
            'credit': 0
          }

          data.push(row);
          this.debit += this.plAmount * -1;
        }
        this.provider.ShareData.BalanceSheet = {};
        this.provider.ShareData.BalanceSheet.data = data;
        this.provider.ShareData.BalanceSheet.tdate = this.entity.tdate;
        this.list = this.provider.ShareData.BalanceSheet.data;



        this.spinner.hide();
      }, error: (response) => {
        this.spinner.hide();
        var error = "An Error Has Occured While Loding Report!";

        if (response.msg != null) {
          error = response.msg;
        }

        this.dialog.swal({ dialog: 'error', title: 'Error', message: error });
      }
    });
  }

  search(s) {
    if (s.target.name == 'accdc') {
      this.searchfield = { 'sg_name': this.reference.accdc };

    } else if (s.target.name == 'dbt') {
      
      this.searchfield = { 'debit': this.reference.dbt };
    } else {
      
      this.searchfield = { 'credit': this.reference.cdt }
    }
  }


  screenwidth()
  {
    if(window.innerWidth >=576)
    {
      return true;
    }else{
      return false;
    }
  }

}
