import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {EmployeeDashboardComponent} from "./employee-dashboard/employee-dashboard.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {IsSignedInGuardGuard} from "./shared/guard/is-signed-in-guard.guard";

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:"full"},
  {path:'login', component:LoginComponent , canActivate: [IsSignedInGuardGuard]},
  {path:'signup', component:SignupComponent , canActivate: [IsSignedInGuardGuard]},
  {path:'dashboard', component:EmployeeDashboardComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
