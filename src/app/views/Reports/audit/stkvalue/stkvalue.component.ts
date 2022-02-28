import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { MyProvider } from 'src/app/assets/services/provider';

import {http, Master} from '../../../../assets/services/services';

declare var $: any;

@Component({
  selector: 'app-stkvalue',
  templateUrl: './stkvalue.component.html',
  styleUrls: ['./stkvalue.component.scss']
})
export class StkvalueComponent implements OnInit {
  entity: any = {};
  reference: any = {};
  mode: boolean = false;
  list = [];
  groups = [];
  p = 1;
  tomTotal = 0;
  isgroup: boolean = false;

  allgroup = { 'grp_name': 'ALL', 'grp_code': '' };
  allid = { 'I_Name': 'ALL', 'I_id': '' };

  pageBreakData = [
    { cd: "N", nm: "No" },
    { cd: "Y", nm: "Yes" }
  ];
  searchfield: any = {};

  constructor(public provider: MyProvider,
    public spinner: NgxSpinnerService,
    public master: Master,
    public http: http,
    public router: Router,
    public datepipe: DatePipe,
    public dialog: DialogsComponent) { }

  ngOnInit(): void {
    this.entity.i_group='';
    this.entity.i_id='';
    this.entity.pageBreak = 'N';
    this.entity.tom = 0;

    var year = this.provider.companyinfo.finyear;

    this.entity.fdate = this.datepipe.transform(year.fdt, 'yyyy-MM-dd');
    this.entity.tdate = this.datepipe.transform(year.tdt, 'yyyy-MM-dd');

    this.entity.currentDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    if(this.entity.fdate < this.entity.currentDate && this.entity.tdate > this.entity.currentDate){
      this.entity.currentDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    }else{
      this.entity.currentDate=this.entity.tdate;
    }


    this.reference.toms = [];
    this.reference.group = [];
    this.reference.product = [];
    this.reference.toms = this.master.tom();

    this.reference.product.unshift(this.allid);
    this.reference.group.unshift(this.allgroup);
    this.entity.I_id = '';
    this.entity.grp_code = '';
    this.getgroupList();

    this.showRecord()
  }

  getgroupList() {
    const index = this.reference.product.indexOf("ALL");
    if (index > -1) {
      this.reference.product.splice(index, 1); // 1nd parameter means remove one item only
    }

    this.http.get("productGroup/prodGroups").subscribe({
      next: (res: any) => {

        this.reference.group = res.data;
        this.reference.group.unshift(this.allgroup);
        this.spinner.hide();
      }, error: (err) => {

        this.spinner.hide();

        this.dialog.swal({ dialog: 'error', title: "Error", message: err });
      }
    })
  }

  getiGroup(s) {
    this.entity.i_group = s.grp_code;
  }

  showGroups = function (tom) {
    this.reference.tom_name = tom.tom_name;
    this.tom_id = tom.tom_id;
    this.groups = tom.groups;
    this.groupTotal = tom.val;
    this.isgroup = true;
  };


  getProductList() {

    if (this.entity.grp_code) {


      this.spinner.show();
      var grp = 0;

      if (this.entity.i_group > 0) {

        grp = this.entity.i_group;

        const index = this.reference.product.indexOf("ALL");
        if (index > -1) {
          this.reference.product.splice(index, 1); // 1nd parameter means remove one item only
        }

        this.master.Products(this.provider.companyinfo.selectedbranch.firm_id, JSON.parse(this.entity.tom), grp).then((res: any) => {

          this.reference.product = res;

          this.reference.product.unshift(this.allid);

          if (this.reference.product.length != 0) {
            this.entity.i_id = this.reference.product[0].I_id;
          }

          this.spinner.hide();

        })
      }
    } else {
      $("#grptoast").toast("show");
    }
  }

  showRecord() {

    this.tomTotal = 0;
    var companyinfo = this.provider.companyinfo.selectedbranch;

    var params = {
      firm_id: companyinfo.firm_id ? companyinfo.firm_id : '',
      branch_id: companyinfo.branch_id ? companyinfo.branch_id:'',
      div_id: companyinfo.div_id,
      edt: this.entity.currentDate
    }
    this.spinner.show();
    this.http.get('Finance/getstkVal', params).subscribe({
      next: (res: any) => {
        if (res.status_cd == 1) {
          var data = res.data;

          for (let i = 0; i < data.length; i++) {
            this.tomTotal = JSON.parse(this.master.RoundN(this.tomTotal + parseFloat(data[i].val), 2));
          }

          this.provider.ShareData.audit.stkVal = {};
          this.provider.ShareData.audit.stkVal.data = data;
          this.provider.ShareData.audit.stkVal.tdate = this.entity.tdate;



          this.list = this.provider.ShareData.audit.stkVal.data;

          this.spinner.hide();
        }
        else {
          this.spinner.hide();
          var error = "An Error has occured while getting report!";
          if (res.error)
            if (res.error.message)
              error = res.error.message;


          this.dialog.swal({ dialog: 'error', title: 'Error', message: error });
        }

      }, error: (response) => {
        this.spinner.hide();
        var error = "An Error Has Occured While Loding Report!";

        if (response.msg != null) {
          error = response.msg;
        }


        this.dialog.swal({ dialog: 'error', title: 'Error', message: error });
      }
    });


  };


  showReport() {
    if (this.entity.edt != undefined) {



      this.mode = true;

      this.entity.url = "Reports/Finance/Audit/Pages/StockValuation";

      var companyinfo = this.provider.companyinfo.selectedbranch;

      this.entity.params = [
        { key: "firm_id", value: companyinfo.firm_id },
        { key: "branch_id", value: companyinfo.branch_id },
        { key: "div_id", value: companyinfo.div_id },
        { key: "edt", value: this.datepipe.transform(this.entity.currentDate, 'yyyy-MM-dd') },
        { key: "tom", value: this.entity.tom },
        { key: "i_group", value: this.entity.i_group },
        { key: "i_id", value: this.entity.i_id},
        { key: "pageBreak", value: this.entity.pageBreak }
      ];

      document.getElementById("offcanvase").click();

    }
    else {
      this.dialog.swal({ dialog: 'Warning', title: 'Warning', message: 'Please Select Date Range!' })
    }
  }

  close() {
    this.router.navigate(['home']);
  }

  onclose(s) {
    this.mode = false;
  }


  search(s) {
    if (s.target.name == 'goods') {
      this.searchfield = { tom_name: this.reference.goods }
    } else {
      this.searchfield = { val: this.reference.stk }

    }
  }

}
