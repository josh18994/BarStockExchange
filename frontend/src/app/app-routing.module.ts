import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // CL
import { LiquorComponent } from './components/liquor/liquor.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouteGuard } from './route-guards.guard';


const accountDashboardModule = () => import('./account-dashboard/account-dashboard.module').then(x => x.AccountDashboardModule);

const routes: Routes = [
  { path: 'liquor', component: LiquorComponent, canActivate: [RouteGuard]},
  { path: '', redirectTo: '/account', pathMatch: 'full' },
  { path: 'account', loadChildren: accountDashboardModule },
  // { path: '**', component: PageNotFoundComponent } <--- Need to create 404 page
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
