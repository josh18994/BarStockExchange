import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiquorComponent } from './components/liquor/liquor.component';
import { RouteGuard } from './route-guards.guard';


const accountDashboardModule = () => import('./account-dashboard/account-dashboard.module').then(x => x.AccountDashboardModule);

const routes: Routes = [
  { path: 'liquor', component: LiquorComponent, canActivate: [RouteGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'account', loadChildren: accountDashboardModule }];
// { path: '**', component: PageNotFoundComponent }

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
