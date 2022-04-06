import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from "@angular/forms";
import {EmployeeModels} from "./employee.models";
import {ApiService} from "../shared/api.service";
@Component({
  selector: 'employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employees !: any;
  ShowAddbutton : boolean = true;
  employeeModels !: EmployeeModels;
  constructor(private formbuilder : FormBuilder,
              private api : ApiService,

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
    this.api.postEmployee(this.employeeModels)
      .subscribe(res =>{
        alert("Added Successfully");
        let ref = document.getElementById('Close');
        ref?.click();
        this.formValue.reset();
        this.getEmpolyee();
      },
        res=>{
        console.log(res);
          // alert(res);
        }
        )
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
          alert("delete Successfully");
          this.getEmpolyee();
        },
        res=>{
          alert("wrong");
        }
      )
  }

  EditEmpolyee(){
    this.getDetails();
    this.api.updateEmployee(this.employeeModels,this.employeeModels.id)
      .subscribe(res =>{
          alert("Edit Successfully");
          let ref = document.getElementById('Close');
          ref?.click();
          this.formValue.reset();
          this.getEmpolyee();
        },
        res=>{
          alert("wrong");
        }
      )
  }

  onEdit(row: any){
    this.employeeModels.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
    this.ShowAddbutton = false;
  }

  getDetails(){
    this.employeeModels.firstName =this.formValue.value.firstName;
    this.employeeModels.lastName =this.formValue.value.lastName;
    this.employeeModels.email =this.formValue.value.email;
    this.employeeModels.mobile =this.formValue.value.mobile;
    this.employeeModels.salary =this.formValue.value.salary;
  }

}
