import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {AuthApiService} from "../Services/auth-api.service";
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuardGuard implements CanActivate {
  constructor(
    private authService : AuthApiService,
    private location : Location,
  ) {}
  canActivate():boolean{
    if(this.authService.loggedIn()){
      this.location.back();
      return false;
    }else{
      return true;
    }
  }

}
