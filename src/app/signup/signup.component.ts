import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }


  logObj(email : string){
    console.log(email);
  }




  form = new FormGroup({
    email : new FormControl('' , [Validators.required] ),
    password : new FormControl('' , [Validators.required]),
    fullName : new FormControl('', [Validators.required] ),
    mobile : new FormControl('' , [Validators.required]),
  })


  get email (): any{
    return this.form.get('email');
  }
  get password (): any{
    return this.form.get('password');
  }


  get fullName (): any{
    return this.form.get('fullName');
  }
  get mobile (): any{
    return this.form.get('mobile');
  }

}
