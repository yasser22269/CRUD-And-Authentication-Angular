import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthApiService} from "../Services/auth-api.service";
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private injector : Injector

  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthApiService);
    if(authService.getToken()){
      let tokenizedReq = req.clone(
        {
          setHeaders: {
            Authorization : `Bearer ${authService.getToken()}`
          }
        }
      )
      return  next.handle(tokenizedReq);
    }else{
      return  next.handle(req);
    }
  }
}
