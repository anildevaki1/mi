import { state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyProvider } from 'src/app/assets/services/provider';
import { http } from 'src/app/assets/services/services';


declare var $: any;

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
   
})
export class ContainerComponent implements OnInit, AfterViewInit {
  ref: any = {};
  entity: any = {};
  branchlist = []
  years = []
  companylist = [];
  bv="assets/kgs.jpg";
  
  constructor(public spinner: NgxSpinnerService, 
              public provider: MyProvider, 
              public router:Router,
              public http: http) { }

  ngOnInit(): void {
    
    this.init();
  }

 
   
  init() {
    this.spinner.show();
    var userInfo = this.provider.companyinfo.userInfo;
    this.http.get("firm/login", { username: userInfo.username }).subscribe({
      next: (res: any) => {
        this.years = res.data.years;
        this.branchlist = res.data.branches;
        this.branchlist.unshift({Branch_name:'[ALL]',Branch_code:''})
 
        this.companylist=res.data.branches[1].firms;
        this.companylist.unshift({firm_name:'[ALL]',firm_id:''})

        this.spinner.hide();
        //set to header
        var yearobj = this.years[this.years.length - 1];
        this.entity.div_id = yearobj.div_id;
        // this.entity.Branch_name = this.branchlist[0].Branch_name;
        // this.entity.branch_id = this.branchlist[0].Branch_code;

        // this.entity.firm_name = this.companylist[0].firm_name;
        // this.entity.firm_id = this.companylist[0].firm_id;

        this.provider.companyinfo.selectedbranch=this.entity;

        this.provider.companyinfo.finyear=this.years[0];
 
      }
    })
  }

  ngAfterViewInit(): void {
   
  }

  changeFinYear() {
    var branchInfo = this.branchlist.filter(s => s.Branch_code == this.ref.Branch_code)[0];
    

    this.entity.Branch_name =branchInfo.Branch_name;
    this.entity.branch_id = branchInfo.Branch_code;
    this.entity.div_id = this.ref.div_id;

    var companylist = this.companylist.filter(s => s.firm_id == this.ref.firm_id)[0];

    this.entity.firm_name = companylist.firm_name;
    this.entity.firm_id = companylist.firm_id;
    
    var selectedYear=companylist.years.filter(f=>f.div_id==this.ref.div_id)[0];


    this.provider.companyinfo.finyear.fdt= selectedYear.fdt;
    
    this.provider.companyinfo.finyear.tdt= selectedYear.tdt;
        
    this.provider.companyinfo.selectedbranch = Object.assign({}, this.entity);

     
     
    $('#FinYearModal').modal('hide');
  //  this.router.navigate(['home']);
  }
 

  logout()
  {

    this.provider.companyinfo.user.access_token=null;
    this.router.navigate(['login']);
  }

  openfinmodal()
  {
    this.ref.Branch_code='';
    this.ref.firm_id=this.companylist[0].firm_id;
    this.ref.div_id="20212022"; 

    $('#FinYearModal').modal('show');
  }

}
