import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from "@angular/forms";
import {EmployeeModels} from "./employee.models";
import {ApiService} from "../shared/api.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employees !: any;
  ShowAddbutton !: boolean ;
  employeeModels = new EmployeeModels();
  constructor(private formbuilder : FormBuilder,
              private api : ApiService,
              private toastr: ToastrService

  ) {

  }
  AddButton(){
    this.formValue.reset();
    this.ShowAddbutton = true;
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    });
    this.getEmpolyee();
  }

  postEmpolyee(){
    this.employeeModels = new EmployeeModels();
    this.getDetails();
    if(this.validation(this.employeeModels)){
      this.api.postEmployee(this.employeeModels)
        .subscribe(res =>{
          this.toastr.success('Added Successfully');
         // alert("Added Successfully");
          let ref = document.getElementById('Close');
          ref?.click();
          this.formValue.reset();
          this.getEmpolyee();
        },
          res=>{
            this.toastr.warning('wrong');
          }
          )
    }else{
      this.toastr.info('Please fill in the data correctly');
    }
  }

  getEmpolyee(){
    this.api.getEmployee()
      .subscribe(res =>{
          this.employees =res;
        },
        res=>{
          alert("wrong");
        }
      )
  }


  deleteEmpolyee(id:number){
    this.getDetails();
    this.api.deleteEmployee(id)
      .subscribe(res =>{
          this.toastr.success('delete Successfully');
          this.getEmpolyee();
        },
        res=>{
          this.toastr.warning('wrong');
        }
      )
  }

  EditEmpolyee(){
    this.getDetails();
    if(this.validation(this.employeeModels)) {
      this.api.updateEmployee(this.employeeModels, Number(this.employeeModels.id))
        .subscribe(res => {
            this.toastr.success('Edit Successfully');
            let ref = document.getElementById('Close');
            ref?.click();
            this.formValue.reset();
            this.getEmpolyee();
          },
          res => {
            alert(res);
          }
        )
    }else{
      this.toastr.info('Please fill in the data correctly');
    }
  }

  onEdit(row: any){
    this.ShowAddbutton = false;
    this.employeeModels.id = Number(row.id);
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  getDetails(){
    this.employeeModels.firstName = this.formValue.value.firstName;
    this.employeeModels.lastName =this.formValue.value.lastName;
    this.employeeModels.email =this.formValue.value.email;
    this.employeeModels.mobile =this.formValue.value.mobile;
    this.employeeModels.salary =this.formValue.value.salary;
  }



  validation(emp : EmployeeModels){
    function validationEmpty(col: string) {
      return  col != null && col.length > 0 ? true : false;// "Please fill in the data";
    }
    function functionMobile(col: string) {
      if(validationEmpty(col) && col.length == 11){
        return col.match(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        )
      }else{
        return false ; // "Mobile is not valid";
      }

    }
    function functionSalary(col: string) {
      const  salary = Number(col);
      return  col != null && salary >0 ? true : false;// "salary is not valid"  ;
    }
    function validateEmail(email: string) {
      if(validationEmpty(email)){
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      }else{
        return false;
        //"Email is not valid"
      }
    }


    if(validationEmpty(emp.firstName) &&
      validationEmpty(emp.lastName) &&
      validateEmail(emp.email) &&
      functionMobile(emp.mobile) &&
     functionSalary(emp.salary)
    ){
      return true;
    }
    return false;
  }




}
