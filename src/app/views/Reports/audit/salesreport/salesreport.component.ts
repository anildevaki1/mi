import { CurrencyPipe, DatePipe } from '@angular/common';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { MyProvider } from 'src/app/assets/services/provider';
 
import {http} from '../../../../assets/services/services';


declare var $: any;

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.scss']
})
export class SalesreportComponent implements OnInit, AfterViewInit {
  mode=false;
  entity: any = {};
  reference: any = {};
  branchList = [];
  branchList1 = [];
  params:any={};
  url;
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Branches';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Amount';
  asstsb="assets/img/norecordfound.png";
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };


  catogories = [

    { id: '1', cat: 'Fertilizer' },
    { id: '2', cat: 'Seeds' },
    { id: '3', cat: 'Pesticides' },
    { id: '4', cat: 'WSF' },
  ]

  reportType = [
    { id: 1, rt: 'Year' },
    { id: 2, rt: 'Month' },
     
  ]

  reportBy = [
    { id: 1, rt: 'Detail' },
    { id: 2, rt: 'Summary' },
    
  ]

  constructor(
    public provider: MyProvider,
    public http: http,
    public currencypipe:CurrencyPipe,
    public router: Router,
    public datepipe: DatePipe,
    public dialog: DialogsComponent,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.reference.catparam = { 'id': '', 'cat': '[All]' },
    
   // this.reportType.unshift(this.reference.rptType);
    this.catogories.unshift(this.reference.catparam);

    this.entity.category = '';
    this.entity.type = 1;
    this.entity.by=1;


    this.entity.sdt = this.datepipe.transform(this.provider.companyinfo.finyear.fdt, 'yyyy-MM-dd');
    this.entity.edt = this.datepipe.transform(this.provider.companyinfo.finyear.tdt, 'yyyy-MM-dd');

    this.entity.currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    if (this.entity.sdt < this.entity.currentDate && this.entity.edt > this.entity.currentDate) {
      this.entity.currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    } else {
      this.entity.currentDate = this.entity.edt;
    }

    this.submit()
  }

  ngAfterViewInit(): void {
    this.entity.reportType = "";
    this.entity.category = "";
  }


  reportype() {
    $('#reporttype').modal('show');
  }


  closesalesRpt() {
    this.router.navigate(['home']);
  }


  submit() {
    this.branchList = [];
    this.branchList1 = [];

    var params =
    {
      firm_id:   this.provider.companyinfo.selectedbranch.firm_id ? this.provider.companyinfo.selectedbranch.firm_id : '',
      branch_id: this.provider.companyinfo.selectedbranch.branch_id ? this.provider.companyinfo.selectedbranch.branch_id : '',
      tp: '',
      grp_code: this.entity.category ? this.entity.category : '',
      edt: this.entity.currentDate
    }
    var g = [];
    var promis = new Promise<void>((resolve, reject) => {

      this.spinner.show();
      this.http.get("misReports/daySale", params).subscribe({next: res => {

        //find branch name
        this.provider.companyinfo.branches.data.forEach(el => {

          for (let b = 0; b < res.length; b++) {

            if (res[b].branch_id == el.Branch_code) {

              //for Graph
              g.push(
                {
                  name: el.Branch_name,
                  series: [
                    { name: 'Yesterday', value:  res[b].yesterday},
                    { name: 'Today', value: res[b].today}
                  ]
                })

              this.branchList = [...g];

              //for list
              this.branchList1.push({
                name: el.Branch_name,
                yesterday: res[b].yesterday,
                today: res[b].today
              })

            }
          }
          resolve();
        });
      },error:(err)=>{
        this.spinner.hide();
        this.dialog.swal({dialog:'error',title:'Error',message:err});
      }});
      
    })

    promis.then(res => {
      this.spinner.hide();
      $('#reporttype').modal('hide');
    })
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



  rptShow()
  {
    this.url="Reports/Sales/Register/Pages/yearly_sales";


    var selectedbranch=this.provider.companyinfo.selectedbranch;

    this.params=[
      { key: "firm_id", value: selectedbranch.firm_id?selectedbranch.firm_id : '' },
      { key: "branch_id", value: selectedbranch.branch_id ? selectedbranch.branch_id : '' },
      { key: "sdt", value: this.datepipe.transform(this.entity.sdt,'yyyy-MM-dd')},
      { key: "edt", value:this.datepipe.transform(this.entity.edt,'yyyy-MM-dd') },
      { key: "by", value: this.entity.by },
      { key: "typ", value: this.entity.type }
    ]

    this.mode=true;
    $('#reporttype').modal('hide');
  }


  onclose(S)
  {
    this.mode = false;
  }

}
