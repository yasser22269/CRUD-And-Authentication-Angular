import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthApiService} from "../shared/Services/auth-api.service";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
              private http : HttpClient,
              private authApi : AuthApiService,
              private toastr: ToastrService,
              private router : Router,
  ) { }
 // public signupform !: FormGroup;
  ngOnInit(): void {

  }


  signupform = new FormGroup({
    email : new FormControl('' , [Validators.required] ),
    password : new FormControl('' , [Validators.required]),
    fullName : new FormControl('', [Validators.required] ),
    mobile : new FormControl('' , [Validators.required]),
  });


  get email (): any{
    return this.signupform.get('email');
  }
  get password (): any{
    return this.signupform.get('password');
  }


  get fullName (): any{
    return this.signupform.get('fullName');
  }
  get mobile (): any{
    return this.signupform.get('mobile');
  }

  signup() {
    // this.http.post<any>()
    if (this.signupform.status != "INVALID"){
      this.authApi.registerUser(this.signupform.value)
        .subscribe(res => {
            this.toastr.success('Register Successfully');
            this.signupform.reset();
            this.router.navigate(['dashboard']);
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
