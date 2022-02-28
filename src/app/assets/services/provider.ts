
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class MyProvider {
  server;
  serverapi;
  reportserver;

  companyinfo: any = {
    company: {},
    accounts: [],
    last_api_calls: {},
    branches: [],
    finyear: {},
    user: {},
    selectedbranch: {}
  };



  ShareData: any = {
    audit: {}
  };

  constructor(public http: HttpClient) { }

  setConfig() {
    this.http.get('assets/app-config.json')
      .subscribe((config: any) => {

        this.server = config.api;
        this.serverapi = this.server + "/api/";

        this.reportserver = config.ssrs + "/";
      });
  }





  // // NK Host
  // server = "http://192.168.1.117:4100/pi";
  // serverapi = this.server + "/api/";

  // reportserver = "http://localhost:62668/";

  //reportserver = "http://192.168.1.117:4100/ssrs/";

  // reportserver = "http://192.168.1.117:4100/ssrs/";

  // this.server = "http://demo.dsserp.in/pi"

  //server = "http://192.168.1.161:4100/pi";
  // reportserver = "http://192.168.1.161:4100/ssrs/";
  //server = "http://demo.dsserp.in/pi"

  // Patil-PC
  // this.server = "http://192.168.1.20:4100/pi";
  // this.reportserver = "http://192.168.1.20:4100/ssrs/";
  // "http://192.168.1.161:4100/ssrs/Reports/candf/Vouchers/whLorryAdv";
  // KGS
  // GFL SERVER
  // this.server = "http://182.75.214.86/whtms/pi/";

  //KGS SERVER
  // server = "https://kgscoop.co.in/whtms.api";
  // serverapi =this.server+"/api/";
  // reportserver = "https://www.kgscoop.co.in/whtms.ssrs/";




}

