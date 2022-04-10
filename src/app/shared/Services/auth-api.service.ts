import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private http: HttpClient,
    private router : Router,

  ) { }


  registerUser(data:any){
    return this.http.post<any>("http://localhost:3000/SignUpUsers",data)
      .pipe(map((res:any)=>{
        console.log(res);
          localStorage.setItem('token',res.id);
          return res;
      },
        (err : any)=>{
            alert(err);
        }

      ));
  }

  LoginUser(){
    return this.http.get<any>("http://localhost:3000/SignUpUsers")
      .pipe(map((res:any)=>{
          console.log(res);
          return res;
        },
        (err : any)=>{
          alert(err);
        }

      ));
  }

  loggedIn(){
    return !!localStorage.getItem('token'); //true or false
  }

  getToken(){
    return localStorage.getItem('token');
  }
  loggedOutUser(){
     localStorage.removeItem('token');
     this.router.navigate(["/login"]);

  }
}
