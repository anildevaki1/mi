import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { MyProvider } from 'src/app/assets/services/provider';
import { http } from 'src/app/assets/services/services';

@Component({
  selector: 'app-transporting-and-warehousing',
  templateUrl: './transporting-and-warehousing.component.html',
  styleUrls: ['./transporting-and-warehousing.component.scss']
})
export class TransportingAndWarehousingComponent implements OnInit {
  entity: any = {};
  reference: any = {};
  params: any = [];
  url;
  selectedbranch;
  mode: boolean = true;
  constructor(public provider: MyProvider, public router: Router, public datepipe: DatePipe, public http: http, public spinner: NgxSpinnerService, public dialog: DialogsComponent) { }

  ngOnInit(): void {

    this.reference.company = [];
    this.selectedbranch = this.provider.companyinfo;
    this.entity.sdt = this.datepipe.transform(this.selectedbranch.finyear.fdt, 'yyyy-MM-dd');
    this.entity.edt = this.datepipe.transform(this.selectedbranch.finyear.tdt, 'yyyy-MM-dd');
    this.getcompanyinit();
    this.print();
  }

  getcompanyinit() {
    this.entity.cmp = '';

    this.spinner.show();
    this.http.get('Company/get').subscribe({
      next: res => {
        this.reference.company = res;
        this.reference.company.unshift({ cmp_code: '', cmp_name: '[All]' })

        this.spinner.hide();

      }, error:
        (err) => {
          this.spinner.hide();
          this.dialog.swal({ dialog: 'error', title: 'Error', message: 'err' });
        }
    })
  }


  close() {
    this.router.navigate(['home']);
  }


  print() {

    this.mode = false;


    this.url = "Reports/candf/own/pages/twsAnlys";

    this.params = [
      { key: 'firm_id', value: this.selectedbranch.selectedbranch.firm_id ? this.selectedbranch.selectedbranch.firm_id : '' },
      { key: 'branch_id', value: this.selectedbranch.selectedbranch.branch_id ? this.selectedbranch.selectedbranch.branch_id : '' },
      { key: 'sdt', value: this.entity.sdt },
      { key: 'edt', value: this.entity.edt },
      { key: 'cmp_code', value: this.entity.cmp }

    ]

    setTimeout(() => {
      this.mode = true;
    }, 2000)
  }
}
