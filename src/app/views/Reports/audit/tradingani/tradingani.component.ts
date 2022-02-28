import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import { DialogsComponent } from 'src/app/assets/pg/dialogs/dialogs.component';
import { MyProvider } from 'src/app/assets/services/provider';

import {http, Master} from '../../../../assets/services/services';
@Component({
  selector: 'app-tradingani',
  templateUrl: './tradingani.component.html',
  styleUrls: ['./tradingani.component.scss']
})
export class TradinganiComponent implements OnInit {
  mode:boolean=false;
  entity:any={};
  reference:any={};
  allgroup = { 'grp_name': 'ALL', 'grp_code': '' };
  allid = { 'I_Name': 'ALL', 'I_id': '' };
  manufacture={mfgr_code:'',mfgr_alias:'ALL',mfgr_name:'ALL'};

  units=[
    {
        "cd":1,
        "nm":"Billing Unit"
    },
    {
        "cd":2,
        "nm":"Alternate Unit"
    }
]


Report=[
  {
      "cd":1,
      "nm":"ProductWise"
  },
  {
      "cd":2,
      "nm":"AccountWise"
  }
]
    

  constructor(public http:http,
              public provider:MyProvider,
              public datepipe:DatePipe,
              public master:Master,
              public router:Router,
              public dialog:DialogsComponent,
              public spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.entity.sdt=this.datepipe.transform(this.provider.companyinfo.finyear.fdt,'yyyy-MM-dd');
    this.entity.edt=this.datepipe.transform(this.provider.companyinfo.finyear.tdt,'yyyy-MM-dd');
    this.entity.utp=1;
    this.entity.repTyp=1;
    this.entity.tom=0;
    this.reference.group=[];
    this.reference.mfgr=[];
    this.entity.params=[];
    this.entity.showOwnAcc=false;
    this.entity.showBranch=false;

    this.reference.toms = this.master.tom();
    var address = [
      { url: 'productGroup/prodGroups' },
      { url: 'relatives/mfgr' }
  ];

  
  this.http.getrelatives(address).then((res)=>{
    this.reference.group = res[0].data;
    this.reference.group.unshift(this.allgroup)
    this.reference.mfgr = res[1].data;
    this.entity.grp_code = this.reference.group[0].grp_code;
    this.reference.mfgr.unshift(this.manufacture)
    this.entity.mfgr_code='';
  })
  }
 
  getiGroup(s)
  {
    this.entity.i_group=s.grp_code;
  }

  
  show()
  {
   
        this.entity.url = "Reports/Finance/Audit/Pages/tradeAnlysis";

        var companyinfo=this.provider.companyinfo.selectedbranch;

        this.entity.params = [
            { key: "firm_id", value: this.entity.mergeAllFirm==false ? this.provider.companyinfo.selectedbranch.firm_id :''},
            { key: "branch_id", value: this.provider.companyinfo.selectedbranch.branch_id },
            { key: "div_id", value: this.provider.companyinfo.selectedbranch.div_id },
            { key: "sdt", value: this.datepipe.transform(this.entity.sdt, 'yyyy-MM-dd') },
            { key: "edt", value: this.datepipe.transform(this.entity.edt, 'yyyy-MM-dd') },
            { key: "tom", value: this.entity.tom==0 ?'' :this.entity.tom },
            { key: "grp_code", value: this.entity.grp_code },
            { key: "mfgr_code", value: this.entity.mfgr_code },
            { key: "showOwnAcc", value: this.entity.showOwnAcc },
            { key: "showBranch", value: this.entity.showBranch },
            { key: "utp", value: this.entity.utp },
            { key: "repTyp", value: this.entity.repTyp }
        ];

        this.mode = true;
   
  }

  

  close()
  {
    this.router.navigate(['home']);
  }

  onclose(s)
  {
    this.mode=false;
  }

}
