import { LocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, retryWhen, scan } from 'rxjs'; 
import { DialogsComponent } from '../assets/pg/dialogs/dialogs.component';
import { MyProvider } from '../assets/services/provider';

import {http, Master} from '../assets/services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent implements OnInit {
  entity: any = {};
  reference: any = {};
  stateName='yellowbox';
  bv="assets/KGS Logo.jpg"; 
  return;
  
  constructor(public spinner: NgxSpinnerService,
    private httpclient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public http: http,
    public master: Master,
    private location: LocationStrategy,
    private dialog: DialogsComponent,
    private provider: MyProvider) { 

      history.pushState(null, null, window.location.href);  
      this.location.onPopState(() => {
        history.pushState(null, null, window.location.href);
      });  

      this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/forums');
    }

  ngOnInit(): void {
    this.reference.password = "password";
    this.reference.eye = "bi bi-eye-fill";

  }


  switchState(){
    this.stateName = this.stateName === 'yellowbox' ? 'redbox' : 'yellowbox'
   }  

  login() {
    this.spinner.show();

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', this.entity.username)
      .set('password', this.entity.psw)


    this.httpclient.post(this.provider.server + "/token", body.toString(), {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')

    }).pipe(
      retryWhen(err => err.pipe(delay(2000),
        scan((retrycount) => {
          if (retrycount >= 2) {
            throw err;
          } else {
            retrycount = retrycount + 1;
            return retrycount
          }
        }, 0)
      )
      )

    ).subscribe({
      next: (response: any) => {
        if (response) {
         
          this.provider.companyinfo.userInfo = this.entity;
          this.provider.companyinfo.user.access_token = response.access_token;
          this.provider.companyinfo.compnies = Object.assign({}, this.entity);
          this.master.requestProducts();
          this.spinner.hide();
          this.getbranches();
          this.router.navigate(['/home']);

        } else {
          this.spinner.hide();
          this.dialog.swal({ dialog: "error", title: 'Error', message: "Please Check Username and Password" })
        }
        //user data was hear

      }, error: (error: any) => {
        this.spinner.hide();
        this.dialog.swal({ dialog: "error", title: 'Error', message: "Something Went wrong.." })
      }
    })

  }

  changetype() {
    this.reference.password = this.reference.password == "password" ? "text" : "password";
    this.reference.eye = this.reference.eye == "bi bi-eye-fill" ? "bi bi-eye-slash-fill" : "bi bi-eye-fill";

  }

  getbranches() {

    var promis = new Promise<void>((resolve, rejects) => {
      this.http.get("branch/branches").subscribe({
        next: (res) => {
          this.provider.companyinfo.branches = res;
          resolve()
        }, error: (err) => {
          this.dialog.swal({ dialog: 'error', title: 'Error', message: err });
        }
      })

    })
  }

}


