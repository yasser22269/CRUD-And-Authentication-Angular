import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  logObj(email : string){
    console.log(email);
  }




  form = new FormGroup({
    email : new FormControl('' , [Validators.required] ),
    password : new FormControl('' ),
  })


  get email (): any{
    return this.form.get('email');
  }
  get password (): any{
    return this.form.get('password');
  }

}
