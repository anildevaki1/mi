import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { MyProvider } from 'src/app/assets/services/provider';
import {http, Master} from '../../../../assets/services/services';

@Component({
  selector: 'app-profit-aloss',
  templateUrl: './profit-aloss.component.html',
  styleUrls: ['./profit-aloss.component.scss']
})
export class ProfitALossComponent implements OnInit {
  list: any = [];
  entity: any = {}
  reference: any = {};
  mode: boolean = false;
  p = 1;
  debit = 0;
  credit = 0;
  plAmount = 0;
  searchfield:any={};
  constructor(public dialog: DialogsComponent,
    public datepipe: DatePipe,
    public router: Router,
    public http: http,
    public master: Master,
    public spinner: NgxSpinnerService,
    public provider: MyProvider) { }

  ngOnInit(): void {
    this.entity.reportType = "2";
    var year=this.provider.companyinfo.finyear;
    this.entity.tdate = this.datepipe.transform(year.tdt, 'yyyy-MM-dd');
    this.entity.fdate = this.datepipe.transform(year.fdt, 'yyyy-MM-dd');
    
    this.entity.currentDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    if(this.entity.fdate < this.entity.currentDate && this.entity.tdate > this.entity.currentDate){
      this.entity.currentDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    }else{
      this.entity.currentDate=this.entity.tdate;
    }

    this.showRecord();
  }



  showRecord() {
    this.debit=this.credit=0;
    var companyinfo = this.provider.companyinfo;

    var params = {
      firm_id: companyinfo.selectedbranch.firm_id ? companyinfo.selectedbranch.firm_id : '',
      branch_id: companyinfo.selectedbranch.branch_id ? companyinfo.selectedbranch.branch_id : '',
      div_id: companyinfo.selectedbranch.div_id,
      username: companyinfo.userInfo.username,
      edt: this.entity.currentDate
    }
    this.spinner.show();
    this.http.get('Finance/getProfitLoss', params).subscribe({
      next: (response)=>{

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
          var row = {
            'sg_name': 'Net Loss',
            'debit': this.plAmount * -1,
            'credit': 0
          }

          data.push(row);
          this.debit += this.plAmount * -1;
        }

        this.provider.ShareData.ProfitLoss = {};
        this.provider.ShareData.ProfitLoss.data = data;
        this.provider.ShareData.ProfitLoss.tdate = this.entity.tdate;
        this.list = this.provider.ShareData.ProfitLoss.data;


        this.spinner.hide();

      }, error: (response) => {
        this.spinner.hide();
        var error = "An Error Has Occured While Loding Report!";

        if (response.msg != null) {
          error = response.msg;
        }


        this.dialog.swal({ dialog: 'error', title: 'Error', message: error })
      }
    });
  }


  printReport() {
    if (this.entity.reportType != undefined) {


      this.entity.url = "Reports/Finance/Audit/Pages/profitLoss";
      var companyinfo = this.provider.companyinfo.selectedbranch;
      this.entity.params = [
        { key: "firm_id", value: companyinfo.firm_id },
        { key: "branch_id", value: companyinfo.branch_id },
        { key: "div_id", value: companyinfo.div_id },

        { key: "edt", value: this.datepipe.transform(this.entity.currentDate, 'yyyy-MM-dd') },
        { key: "reporttype", value: this.entity.reportType },
        { key: "caption", value: "PL" }
      ];

      document.getElementById("offcanvase").click();
      
      this.mode = true;
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


  search(s) {
    if (s.target.name == 'accdc') {
      this.searchfield = { 'sg_name': this.reference.accdc };

    } else if (s.target.name == 'dbt') {
      
      this.searchfield = { 'debit': this.reference.dbt };
    } else {
      
      this.searchfield = { 'credit': this.reference.cdt }
    }
  }
  
}
