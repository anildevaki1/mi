import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { AuthGuardservice } from './assets/services/services';
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
   
  },
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuardservice]
      },
      {
        path: 'reports/salesreport',
        loadChildren: () => import('./views/Reports/audit/salesreport/salesreport.module').then(m => m.SalesreportModule),
        canActivate: [AuthGuardservice]
      },
      {
        path: 'reports/outstanding/debtorSoutstanding',
        loadChildren: () => import('./views/Reports/outstanding/debtors-outstd/debtors-outstd.module').then(m => m.DebtorsOutstdModule),
        canActivate: [AuthGuardservice]
      },

      {
        path: 'reports/outstanding/creditorSoutstanding',
        loadChildren: () => import('./views/Reports/outstanding/creditors-outstd/creditors-outstd.module').then(m => m.CreditorsOutstdModule),
        canActivate: [AuthGuardservice]
      },

      {
        path: 'reports/audit/grouplist',
        loadChildren: () => import('./views/Reports/audit/grouplist/grouplist.module').then(m => m.GrouplistModule),
        canActivate: [AuthGuardservice]
      },
      {
        path: 'reports/audit/trailBalance',
        loadChildren: () => import('./views/Reports/audit/tril-balance/tril-balance.module').then(m => m.TrilBalanceModule),
        canActivate: [AuthGuardservice]

      },
      {
        path: 'reports/audit/balanceSheet',
        loadChildren: () => import('./views/Reports/audit/balance-sheet/balance-sheet.module').then(m => m.BalanceSheetModule),
        canActivate: [AuthGuardservice]

      },
      {
        path: 'reports/audit/mfgr',
        loadChildren: () => import('./views/Reports/audit/mfgr/mfgr.module').then(m => m.MfgrModule),
        canActivate: [AuthGuardservice]
      },
      {
        path: 'reports/audit/profitandLoss',
        loadChildren: () => import('./views/Reports/audit/profit-aloss/profit-aloss.module').then(m => m.ProfitALossModule),
        canActivate: [AuthGuardservice]
      },
      {
        path: 'reports/audit/stkvalue',
        loadChildren: () => import('./views/Reports/audit/stkvalue/stkvalue.module').then(m => m.StkvalueModule),
        canActivate: [AuthGuardservice]
      },

      {
        path: 'reports/audit/tradingAnalysis',
        loadChildren: () => import('./views/Reports/audit/tradingani/tradingani.module').then(m => m.TradinganiModule),
        canActivate: [AuthGuardservice]
      },
      {
        path: 'reports/transporting&warehowsing',
        loadChildren: () => import('./views/Reports/transporting-and-warehousing/transporting-and-warehousing.module').then(m => m.TransportingAndWarehousingModule),
        canActivate: [AuthGuardservice]
      },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
