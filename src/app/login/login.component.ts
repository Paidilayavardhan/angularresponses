import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl:'./login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  department:any[]=[]
  DeptObj:any={
    "departmentName":"",
    "departmentLogo":"",
  }
  http=inject(HttpClient)
  ngOnInit(): void {
      this.getData()
  }
  getData(){
    this.http.get("https://projectapi.gerasim.in/api/Complaint/GetParentDepartment").subscribe((res:any)=>{
      this.department=res.data
  })
}
onSubmit(){
  this.http.post("https://projectapi.gerasim.in/api/Complaint/AddNewDepartment",this.DeptObj).subscribe((res:any)=>{
    if(res.res){
      alert("Successfully Created Record")
      this.getData()
    }
    else{
      alert("res.error");
    }
  })
  console.log(this.DeptObj)
}
onUpdate(){
  this.http.post("https://projectapi.gerasim.in/api/Complaint/UpdateDepartment",this.DeptObj).subscribe((res:any)=>{
    if(res.res){
      alert("Successfully Created Record")
      this.getData()
    }
    else{
      alert("res.error");
    }

  })
  
}
onDelete(id:any){
  const isDelete= confirm("you need to delete this Record")
  if(isDelete){
  this.http.delete("https://projectapi.gerasim.in/api/Complaint/DeletedepartmentBydepartmentId"+id).subscribe((res:any)=>{
    if(res.res){
      alert("Successfully Created Record")
      this.getData()
    }
    else{
      alert("res.error");
    }
  

  })
}
}

}