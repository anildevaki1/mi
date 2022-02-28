import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { MyProvider } from 'src/app/assets/services/provider';

import {http} from '../../../../assets/services/services';

@Component({
  selector: 'app-tril-balance',
  templateUrl: './tril-balance.component.html',
  styleUrls: ['./tril-balance.component.scss']
})
export class TrilBalanceComponent implements OnInit {
  entity: any = {};
  mode: boolean = false;
  list = [];
  columns: any = {};
  defaultColDef: any = {};
  api;
  gridColumnApi;
  constructor(public datepipe: DatePipe,
    public router: Router,
    public http: http,
    public decimalpipe:DecimalPipe,
    public spinner: NgxSpinnerService,
    public dialog: DialogsComponent,
    public provider: MyProvider) { }

  ngOnInit(): void {
    this.entity.reportMode = "1";
    var finyear=this.provider.companyinfo.finyear;
    this.entity.to_date=this.datepipe.transform( finyear.tdt, 'yyyy-MM-dd');

    this.entity.s_dt=this.datepipe.transform( finyear.fdt, 'yyyy-MM-dd');
    this.entity.e_dt=this.datepipe.transform( finyear.tdt, 'yyyy-MM-dd');


    this.entity.currentDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    if(this.entity.s_dt < this.entity.currentDate && this.entity.e_dt > this.entity.currentDate){
      this.entity.currentDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    }else{
      this.entity.currentDate=this.entity.e_dt;
    }

    this.columns = [
      {
        field: 'srNo',
        headerName: 'Sr No',
        hide:true
      },
      {
        field: 'Group',
        headerName: 'Group',
        filter: "agTextColumnFilter",
        width: '900'
      },
      {
        field: 'Debit',
        headerName: 'Debit',
        type: 'rightAligned',
        filter: "agTextColumnFilter",
        //valueFormatter: params => params.data.Debit.toFixed(2),
        cellRenderer: (data) => {
           return this.decimalpipe.transform(data.data.Debit,'1.2-2');
        },
        width: '200'
      },
      {
        field: 'Credit',
        headerName: 'Credit',
        type: 'rightAligned',
        filter: "agTextColumnFilter",
       // valueFormatter: params => params.data.Credit.toFixed(2),
        cellRenderer: (data) => {
          return this.decimalpipe.transform(data.data.Credit,'1.2-2');
       },
        width: '200'
      },

    ]

     
    this.defaultColDef = {
      sortable: true,
      floatingFilter: true,
      resizable: true,
      suppressHorizontalScroll: true,
    };
 
    this.showData();
  }


  showData() {

    this.spinner.show()

    var todate = this.datepipe.transform(this.entity.currentDate, 'yyyy-MM-dd');

    var companyinfo = this.provider.companyinfo.selectedbranch;

    //For Grid View
    var params = {
      firm_id: companyinfo.firm_id ? companyinfo.firm_id : '',
      branch_id: companyinfo.branch_id ?  companyinfo.branch_id:'',
      div_id: companyinfo.div_id,
      edt: todate
    }

    this.http.get('Finance/getTrial2', params).subscribe({
      next: (res: any) => {
        if (res.status_cd == 1) {

          this.provider.ShareData.audit.TrialBalance = {};
          this.provider.ShareData.audit.TrialBalance.data = res.data;
          this.provider.ShareData.audit.TrialBalance.tdate = this.entity.to_date;

          this.list = this.provider.ShareData.audit.TrialBalance.data;

          this.spinner.hide()


          let pinnedBottomData = this.generatePinnedBottomData();
          this.api.setPinnedBottomRowData([pinnedBottomData]);
        }
        else {
          var error = "An Error has occurred while getting records!";

          if (res.error)
            if (res.error.message)
              error = res.error.message;

          this.spinner.hide()


          this.dialog.swal({ dialog: 'error', title: 'Error', message: error });
        }


      }, error: (response) => {
        this.spinner.hide()
        var error = "An Error Has Occured While Loding Report!";

        if (response.msg != null) {
          error = response.msg;
        }

        this.dialog.swal({ dialog: 'error', title: 'Error', message: error });
      }
    });

  }


  print() {
    if (this.entity.s_dt && this.entity.e_dt && this.entity.reportMode) {

      var fromdate = this.datepipe.transform(this.entity.s_dt, 'yyyy-MM-dd');
      var todate = this.datepipe.transform(this.entity.e_dt, 'yyyy-MM-dd');
      var companyinfo = this.provider.companyinfo.selectedbranch;
      
      // For RDLC Report
      if (this.entity.reportMode == 1) {
        this.entity.url = "Reports/Finance/Audit/Pages/Trial_Balance2";
        this.entity.params = [
          { key: "firm_id", value: companyinfo.firm_id },
          { key: "branch_id", value: companyinfo.branch_id },
          { key: "div_id", value: companyinfo.div_id },
          { key: "edt", value: todate }

        ];

        
        //this.entity.src = $sce.trustAsResourceUrl(ajax.rpt_url + "Reports/Finance/Audit/Pages/Trial_Balance2?firm_id=" + this.companyinfo.firm_id + "&branch_id=" + this.companyinfo.branch_id + "&div_id=" + this.companyinfo.div_id + "&edt=" + todate);
      }
      else {
        this.entity.url = "Reports/Finance/Audit/Pages/Trial_Balance1";

        this.entity.params = [
          { key: "firm_id", value: companyinfo.firm_id },
          { key: "branch_id", value: companyinfo.branch_id },
          { key: "div_id", value: companyinfo.div_id },
          { key: "sdt", value: fromdate },
          { key: "edt", value: todate }
        ]
        //  this.entity.src = $sce.trustAsResourceUrl(ajax.rpt_url + "Reports/Finance/Audit/Pages/Trial_Balance1?firm_id=" + this.companyinfo.firm_id + "&branch_id=" + this.companyinfo.branch_id + "&div_id=" + this.companyinfo.div_id + "&sdt=" + fromdate + "&edt=" + todate);

      }
      document.getElementById("offcanvase").click();
      this.mode = true;
    }
    else {

      this.dialog.swal({ dialog: 'Warning', title: 'Warning', message: 'Please Date Range!' })
    }
  }
 
  generatePinnedBottomData() {
    // generate a row-data with null values
    let result = {};

    this.gridColumnApi.getAllGridColumns().forEach(item => {
      result[item.colId] = null;
    });
    return this.calculatePinnedBottomData(result);
  }

  calculatePinnedBottomData(target: any) {
    //console.log(target);
    //**list of columns fo aggregation**

    if (this.api.isAnyFilterPresent()) {
      this.api.onFilterChanged()
    }

    let columnsWithAggregation = ['Debit','Credit']
    columnsWithAggregation.forEach(element => {
  
      this.list.forEach(on => {
        target[element] += Number(on[element].toFixed(2));
      })

    })
    //console.log(target);
    return target;
  }


  onGridReady(params) {
    params.api.sizeColumnsToFit();
    this.api = params.api;
    this.gridColumnApi = params.columnApi;
  }

  close() {
    this.router.navigate(['home']);
  }

  onclose(s) {
    this.mode = false;
  }
}
