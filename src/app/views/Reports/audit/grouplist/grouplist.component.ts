import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RowNode } from 'ag-grid-community'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { InrcrdrPipe } from 'src/app/assets/pipes/inrcrdr.pipe';
import { MyProvider } from 'src/app/assets/services/provider';
 
import { http } from '../../../../assets/services/services';

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.scss']
})
export class GrouplistComponent implements OnInit {
@ViewChild('f') myform:NgForm;

  entity: any = {};
  reference: any = {};
  mode: boolean = false;
  list = [];
  columns = [];
  defaultColDef: any = {};
  api: any;
  rpt: any = {};
  gridColumnApi;
  total;
  constructor(
    public spinner: NgxSpinnerService,
    public http: http,
    public router: Router,
    public datepipe: DatePipe,
    public provider: MyProvider,
    public inrcdrpipe: InrcrdrPipe,
    public dialog: DialogsComponent) { }

  ngOnInit(): void {

    var sdt = this.datepipe.transform(this.provider.companyinfo.finyear.fdt, 'yyyy-MM-dd');
    var tdt = this.datepipe.transform(this.provider.companyinfo.finyear.tdt, 'yyyy-MM-dd');

    this.entity.sdt = sdt;
    this.entity.edt = tdt;
    this.rpt.s_dt = sdt;
    this.rpt.e_dt = tdt;

    this.columns = [
      {
        field: 'Acc_name',
        headerName: 'Account Name',
        filter: "agTextColumnFilter",
        width: '300'
      },
      {
        field: 'City_name',
        headerName: 'City',
        filter: "agTextColumnFilter",
        width: '230'
      },
      {
        field: 'mobile_no',
        headerName: 'Mobile',
        filter: "agTextColumnFilter",

        width: '100'
      },
      {
        field: 'opening',
        headerName: 'Opening',
        type: 'rightAligned',
        filter: "agTextColumnFilter",
        width: '120',
        //valueFormatter: params => params.data.opening.toFixed(2),
        cellRenderer: (data) => {
          // moment(data.createdAt).format('MM/DD/YYYY HH:mm')

          return this.inrcdrpipe.transform(data.data.opening,2);

        }
      },
      {
        field: 'current',
        headerName: 'Current',
        type: 'rightAligned',
        filter: "agTextColumnFilter",
        width: '120',
        // valueFormatter: params => params.data.current.toFixed(2),
        cellRenderer: (data) => {
                
          return this.inrcdrpipe.transform(data.data.current,2);
        }
      },
      {
        field: 'closing',
        headerName: 'Closing',
        type: 'rightAligned',
        filter: "agTextColumnFilter",
        width: '120',
        //   valueFormatter: params => params.data.closing.toFixed(2),
        cellRenderer: (data) => {
          return this.inrcdrpipe.transform(data.data.closing,2);
        }
      }

    ]



    this.defaultColDef = {
      sortable: true,
      floatingFilter: true,
      resizable: true,
      suppressHorizontalScroll: true,
    };

    this.getActGroup();

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

    let columnsWithAggregation = ['opening','current', 'closing']
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

  getActGroup() {
    this.spinner.show();
    this.http.get("accSGroup/subgroups").subscribe({
      next: (res: any) => {
        if (res.status_cd == 1) {
          this.reference.groupList = res.data;
          this.spinner.hide();
        } else {
          var error = "An Error has occured while getting record!";
          if (res.error)
            if (res.error.message)
              error = res.error.message;

          this.spinner.hide();

          this.dialog.swal({ dialog: 'error', title: 'Error', message: error });
        }

      }, error: (err) => {
        this.spinner.hide();
        var error = "An Error Has Occured While Loding Groups!";

        if (err.msg != null) {
          error = err.msg;
        }
        this.dialog.swal({ dialog: 'error', title: 'Error', message: error });
      }
    });
  };


  print() {
    if (this.rpt.s_dt != undefined && this.rpt.e_dt != undefined) {

      var fromdate = this.datepipe.transform(this.rpt.s_dt, 'yyyy-MM-dd');
      var todate = this.datepipe.transform(this.rpt.e_dt, 'yyyy-MM-dd');

      var sg_code = '';

      if (this.rpt.sg_code != undefined)
        sg_code = this.rpt.sg_code;

      var companyinfo = this.provider.companyinfo.selectedbranch;

      this.entity.url = "Reports/Finance/Audit/Pages/Sub_Group_List";

     

      this.entity.params = [
        { key: "firm_id", value: companyinfo.firm_id },
        { key: "branch_id", value: companyinfo.branch_id },
        { key: "div_id", value: companyinfo.div_id },
        { key: "sdt", value: fromdate },
        { key: "edt", value: todate },
        { key: "sg_code", value: sg_code }


      ];

      this.mode = true;
      document.getElementById('offcanvase').click();
    }
  }

  r_showData() {

    if(this.myform.valid){

    if (this.entity.sg_code != undefined && this.entity.sdt != undefined && this.entity.edt != undefined) {

      this.spinner.show();

      var fromdate = this.datepipe.transform(this.entity.sdt, 'yyyy-MM-dd');
      var todate = this.datepipe.transform(this.entity.edt, 'yyyy-MM-dd');

      var sg_code = null;

      if (this.entity.sg_code != undefined || this.entity.sg_code != null)
        sg_code = this.entity.sg_code;

      var companyinfo = this.provider.companyinfo.selectedbranch;
      //For Grid View
      var params = {
        firm_id:   companyinfo.firm_id ? companyinfo.firm_id : '',
        branch_id:  companyinfo.branch_id ?  companyinfo.branch_id : '',
        div_id: companyinfo.div_id,
        sdt: fromdate,
        edt: todate,
        sg_code: sg_code == '' ? "null" : sg_code
      }

      this.http.get('Finance/getDebtorsList', params).subscribe({
        next: (response: any) => {

          response.forEach((value, key) => {

            value.opening = parseFloat(value.op_credit) - parseFloat(value.op_debit);
            value.current = parseFloat(value.curr_credit) - parseFloat(value.curr_debit);
            value.closing = parseFloat(value.cl_credit) - parseFloat(value.cl_debit);

          });

          this.provider.ShareData.audit.subgrouplist = {};
          this.provider.ShareData.audit.subgrouplist.data = response;
          this.list = this.provider.ShareData.audit.subgrouplist.data;
          this.provider.ShareData.audit.subgrouplist.tdate = this.entity.r_to_date;
          this.provider.ShareData.audit.subgrouplist.sg_code = this.entity.r_sg_code;
          this.spinner.hide();

          let pinnedBottomData = this.generatePinnedBottomData();
          this.api.setPinnedBottomRowData([pinnedBottomData]);
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
    else {
      this.dialog.swal({ dialog: 'error', title: 'Error', message: 'Please Select Account Group And Date Range!' });

    }
  }else{
    this.dialog.swal({dialog:'error',title:'Error',message:'Please Fill All Details'});
  }
  }

  close() {
    this.router.navigate(['home']);
  }

  onclose(s) {
    this.mode = false;
  }



}
