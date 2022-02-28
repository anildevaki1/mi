import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  companyinfo:any={};

  constructor() {
    var A=true;
    this.companyinfo.user={
      grants:{A:true}
    }
   }
}
