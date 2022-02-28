import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { MyProvider } from 'src/app/assets/services/provider';
import { http } from 'src/app/assets/services/services';
import * as XLSX from 'xlsx';

declare var $: any;

@Component({
  selector: 'app-creditors-outstd',
  templateUrl: './creditors-outstd.component.html',
  styleUrls: ['./creditors-outstd.component.scss']
})
export class CreditorsOutstdComponent implements OnInit, AfterViewInit {
  maxtotal = 0;
  mode = 0;
  dmaxhtotal = 0;
  entity: any = {};
  data: any = {};
  catogories = [];
  companyinfoarray;
  reference: any = {};
  constructor(
    public http: http,
    public router: Router,
    public spinner: NgxSpinnerService,
    public dialog: DialogsComponent,
    public datepipe: DatePipe,
    public provider: MyProvider) {
    //get data from provider.ts
    this.companyinfoarray = this.provider.companyinfo;

    this.entity.sdt = this.datepipe.transform(this.companyinfoarray.finyear.fdt, 'yyyy-MM-dd');
    this.entity.edt = this.datepipe.transform(this.companyinfoarray.finyear.tdt, 'yyyy-MM-dd');

  }

  ngOnInit(): void {
    this.entity.creditorsOutstanding = {};
    this.entity.creditorsOutstandingdetls = {};
    this.entity.creditorsOutstandingdetls.data = [];
    this.reference.groupList = [];
    //getDebtorsoutStanding List
    this.getActGroup();
  }


  ngAfterViewInit(): void {
    var params = {
      firm_id: this.companyinfoarray.selectedbranch.firm_id ? this.companyinfoarray.selectedbranch.firm_id : '',
      branch_id: this.companyinfoarray.selectedbranch.branch_id ? this.companyinfoarray.selectedbranch.branch_id : '',
      div_id: this.companyinfoarray.selectedbranch.div_id,
      from_date: this.datepipe.transform(this.entity.sdt, 'yyyy-MM-dd'),
      to_date: this.datepipe.transform(this.entity.edt, 'yyyy-MM-dd'),
      sg_code: this.entity.sg_code ? this.entity.sg_code  : ''
    }

    this.spinner.show();
    this.http.get('outstd/creditorsAge', params).subscribe({
      next: (res) => {
        this.data = JSON.stringify(res.age);

        this.entity.opbl = 0;
        this.entity.d5total = 0;
        this.entity.d4total = 0;
        this.entity.d3total = 0;
        this.entity.d2total = 0;
        this.entity.d1total = 0;
        this.entity.d0total = 0;
        res.branch_outstd.forEach((element, i) => {
          res.branch_outstd[i].htotal = element.opbl + element.d5 + element.d4 + element.d3 + element.d2 + element.d1 + element.d0
          this.entity.opbl += element.opbl
          this.entity.d5total += element.d5
          this.entity.d4total += element.d4
          this.entity.d3total += element.d3
          this.entity.d2total += element.d2
          this.entity.d1total += element.d1
          this.entity.d0total += element.d0
        })


        this.mats(res);



        this.spinner.hide();
      }, error: (err) => {
        this.spinner.hide();
        this.dialog.swal({ dialog: 'error', title: 'Error', message: err })
      }
    })
  }


  getActGroup() {
    this.spinner.show();
    this.http.get("accSGroup/subgroups", { id: '14' }).subscribe({
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

          ore.age[b] = 0 + "-" + ore.age[b];

        } else {
          if (b != ore.age.length) {

            ore.age[b] = (parseInt(data[b - 1]) + 1) + "-" + data[b];

          } else {

            ore.age[b] = (parseInt(data[b - 1]) + 1) + " Above";
          }
        }
      }

      resolve();

    })

    promis.then(() => {

      this.entity.creditorsOutstanding = ore;
      this.entity.creditorsOutstandingdetls = ore;
      this.maxtotalv();
    })

  }


  maxtotalv() {
    this.maxtotal = 0;
    
    this.maxtotal = this.entity.opbl + this.entity.d5total + this.entity.d4total + this.entity.d3total + this.entity.d2total + this.entity.d1total + this.entity.d0total;
  }

  details(item) {
    this.entity.ddopbl = 0;
    this.entity.dd5total = 0;
    this.entity.dd4total = 0;
    this.entity.dd3total = 0;
    this.entity.dd2total = 0;
    this.entity.dd1total = 0;
    this.entity.dd0total = 0;
    this.dmaxhtotal = 0;
    this.entity.itemdetltitle = item.branch_name;

    item.outstd.forEach((element, i) => {
      item.outstd[i].dhtotal = element.opbl + element.d5 + element.d4 + element.d3 + element.d2 + element.d1 + element.d0

      this.entity.ddopbl += element.opbl
      this.entity.dd5total += element.d5
      this.entity.dd4total += element.d4
      this.entity.dd3total += element.d3
      this.entity.dd2total += element.d2
      this.entity.dd1total += element.d1
      this.entity.dd0total += element.d0
    })

    this.entity.creditorsOutstandingdetls.data = item.outstd;
 
    this.dmaxhtotal = item.opbl+ item.d5 + item.d4 + item.d3 + item.d2 + item.d1 + item.d0;
    
    this.mode = 1;
  }


  close() {
    this.router.navigate(['home']);
  }

  setting() {
    $('#settingb').modal('show');
  }
 
  exporttoexl()
  {
    let element = document.getElementById('crdtOutRpt');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'CreditorsOutstanding.xlsx');
  }
}


