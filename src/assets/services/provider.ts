import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MyProvider {
  companyinfo: any = { company: {}, accounts: [], last_api_calls: {}, branches: [] };
  ShareData: any = {};

  //  dss server
  server = "http://localhost:28843/";

  serverapi = this.server   //+"/api/";       

  reportserver = "http://192.168.1.161:4100/ssrs/";


  //ifscService="https://ifsc.razorpay.com/";

  //host server
  // "http://192.168.1.161:4100/pi";  //
  //"http://192.168.1.161:4100/pi/api/"; //


  // reportserver = "http://localhost:62668/";

  // NK Host
  // this.server = "http://192.168.1.161:4100/pi";
  // this.reportserver = "http://192.168.1.161:4100/ssrs/";
  // this.server = "http://demo.dsserp.in/pi"

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


  constructor() {
    var A = true;
    this.companyinfo.user = {
      grants: { A: true }
    }
  }

}

