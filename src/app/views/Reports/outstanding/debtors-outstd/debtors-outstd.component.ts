import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { MyProvider } from 'src/app/assets/services/provider';
import { http } from 'src/app/assets/services/services';
import * as XLSX from 'xlsx';
declare var $: any;



@Component({
  selector: 'app-debtors-outstd',
  templateUrl: './debtors-outstd.component.html',
  styleUrls: ['./debtors-outstd.component.scss']
})
export class DebtorsOutstdComponent implements OnInit, AfterViewInit {
  @ViewChild('myb') myb: ElementRef;

  entity: any = {};
  data: any = {};
  catogories = []
  companyinfoarray;
  reference: any = {};
  mode = 0;
  total = 0;
  maxtotal = 0;
  dmaxhtotal = 0;
  sort: any;
  meee: boolean = true;
  constructor(
    public http: http,
    public router: Router,
    public spinner: NgxSpinnerService,
    public dialog: DialogsComponent,
    public datepipe: DatePipe,
    public provider: MyProvider) {

    this.companyinfoarray = this.provider.companyinfo;
    this.entity.sdt = this.datepipe.transform(this.companyinfoarray.finyear.fdt, 'yyyy-MM-dd');
    this.entity.edt = this.datepipe.transform(this.companyinfoarray.finyear.tdt, 'yyyy-MM-dd');





  }

  ngOnInit(): void {
    this.entity.debtorsOutstanding = {};
    this.entity.debtorsOutstandingdetls = {};
    this.entity.debtorsOutstandingdetls.data = [];
    this.reference.groupList = [];
    this.reference.fields = ["d5", "d4", "d3", "d2", "d1", "d0"];
    this.reference.fields.reverse();
    //getDebtorsoutStanding List


    this.entity.dd5total = 0;
    this.entity.dd4total = 0;
    this.entity.dd3total = 0;
    this.entity.dd2total = 0;
    this.entity.dd1total = 0;
    this.entity.dd0total = 0;

    this.getActGroup();
  }


  ngAfterViewInit(): void {

    var params = {
      firm_id: this.companyinfoarray.selectedbranch.firm_id ? this.companyinfoarray.selectedbranch.firm_id : '',
      branch_id: this.companyinfoarray.selectedbranch.branch_id ? this.companyinfoarray.selectedbranch.branch_id : '',
      div_id: this.companyinfoarray.selectedbranch.div_id,
      from_date: this.datepipe.transform(this.entity.sdt, 'yyyy-MM-dd'),
      to_date: this.datepipe.transform(this.entity.edt, 'yyyy-MM-dd'),
      sg_code: this.entity.sg_code ? this.entity.sg_code : ''
    }

    this.spinner.show();
    this.http.get('outstd/debtorsAge', params).subscribe({
      next: (res) => {

        this.entity.d5total = 0;
        this.entity.d4total = 0;
        this.entity.d3total = 0;
        this.entity.d2total = 0;
        this.entity.d1total = 0;
        this.entity.d0total = 0;

        res.branch_outstd.forEach((element, i) => {
          res.branch_outstd[i].htotal = element.d5 + element.d4 + element.d3 + element.d2 + element.d1 + element.d0

          this.entity.d5total += element.d5
          this.entity.d4total += element.d4
          this.entity.d3total += element.d3
          this.entity.d2total += element.d2
          this.entity.d1total += element.d1
          this.entity.d0total += element.d0
        })

        this.data = JSON.stringify(res.age);

        this.mats(res);

        this.spinner.hide();
      }, error: (err) => {
        this.spinner.hide();
        this.dialog.swal({ dialog: 'error', title: 'Error', message: err })
      }
    })

    // $('table').dataTable( {
    //   "order": [[ 3, "asc" ]]
    // } );
  }

  sorting(s) {


  }

  getActGroup() {
    this.spinner.show();
    this.http.get("accSGroup/subgroups", { id: '5' }).subscribe({
      next: (res: any) => {
        if (res.status_cd == 1) {
          this.reference.groupList = res.data;

          this.reference.groupList.unshift({ sg_code: '', sg_name: '[All]' });
          this.entity.sg_code = '';
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

  submit() {
    this.ngAfterViewInit();
    $('#settingb').modal('hide');
  }

  mats(ore) {

    var data = JSON.parse(this.data)

    var promis = new Promise<void>((resolve, rejects) => {

      var v = ore.age.length + 1;
      
        for (let b = 0; b < v; b++) {
         

          if (b == 0) {

            ore.age[b] = { head: 0 + "-" + ore.age[b], field: this.reference.fields[b] };

          } else {
            if (b != ore.age.length) {

              ore.age[b] = { head: (parseInt(data[b - 1]) + 1) + "-" + data[b], field: this.reference.fields[b] };

            } else {

              ore.age[b] = { head: (parseInt(data[b - 1]) + 1) + " Above", field: this.reference.fields[b] };
            }
          }

        }
      
      
      resolve();

    })

    promis.then(() => {

      var Are = {
        age: ore.age.reverse(),
        branch_outstd: ore.branch_outstd
      }

      this.entity.debtorsOutstanding = Are;
      this.entity.debtorsOutstandingdetls = Are;

      console.log(Are);

      this.maxtotalv()
    })

  }


  maxtotalv() {
    this.maxtotal = 0;

    this.maxtotal = this.entity.d5total + this.entity.d4total + this.entity.d3total + this.entity.d2total + this.entity.d1total + this.entity.d0total;
  }

  close() {
    this.router.navigate(["/home"]);
  }

  details(item) {

    this.entity.dd5total = 0;
    this.entity.dd4total = 0;
    this.entity.dd3total = 0;
    this.entity.dd2total = 0;
    this.entity.dd1total = 0;
    this.entity.dd0total = 0;
    this.dmaxhtotal = 0;
    this.entity.itemdetltitle = item.branch_name;

    item.outstd.forEach((element, i) => {
      item.outstd[i].dhtotal = element.d5 + element.d4 + element.d3 + element.d2 + element.d1 + element.d0


      this.entity.dd5total += element.d5;
      this.entity.dd4total += element.d4;
      this.entity.dd3total += element.d3;
      this.entity.dd2total += element.d2;
      this.entity.dd1total += element.d1;
      this.entity.dd0total += element.d0;
    })

    this.entity.debtorsOutstandingdetls.data = item.outstd;

    this.dmaxhtotal =

      item.d5 +
      item.d4 +
      item.d3 +
      item.d2 +
      item.d1 +
      item.d0;

    this.mode = 1;
  }

  setting() {
    $('#settingb').modal('show');
  }

  exporttoexl() {
    let element = document.getElementById('debtOutRpt');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'DebtorsOutstanding.xlsx');

  }
}
