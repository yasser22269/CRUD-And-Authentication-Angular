import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthApiService} from "../shared/Services/auth-api.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
              private http : HttpClient,
              private authApi : AuthApiService,
              private toastr: ToastrService,
              private router : Router
  ) { }
  // public loginForm !: FormGroup;
  ngOnInit(): void {

  }


  loginForm = new FormGroup({
    email : new FormControl('' , [Validators.required] ),
    password : new FormControl('' , [Validators.required]),
  });


  get email (): any{
    return this.loginForm.get('email');
  }
  get password (): any{
    return this.loginForm.get('password');
  }


  login() {
    // this.http.post<any>()
    if (this.loginForm.status != "INVALID"){
      this.authApi.LoginUser()
        .subscribe(res => {
          const  user = res.find((a:any) => {
              return a.email == this.loginForm.value.email && a.password == this.loginForm.value.password
          });
          if(user){
            this.toastr.success('Register Successfully');
            this.loginForm.reset();
            localStorage.setItem('token',user.id);
            this.router.navigate(['dashboard']);
          }else{
            this.toastr.info('User Not Found');
          }

          },
          res => {
            this.toastr.info('Please fill in the data correctly');
          }
        );
    }else{
      this.toastr.info('Please fill in the data correctly');
    }
  }
}
