import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  public id: any;
  public studentForm = new FormGroup({
    code: new FormControl(''),
    gender: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    picture: new FormControl(''),
  })

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      //load data
      this.loadData(this.id);
    }
  }

  private loadData(id: any) {
    console.log('load data: ', id);
    this.serverHttp.getStudent(id).subscribe(data => {
      console.log('getStudent: ', data);
      for (const controlName in this.studentForm.controls) {
        if (controlName) {
          this.studentForm.controls[controlName].setValue(data[controlName]);
        }
      }
    })
  }

  private createNewData() {
    const newStudent: any = {};
    for (const controlName in this.studentForm.controls) {
      if (controlName) {
        newStudent[controlName] = this.studentForm.controls[controlName].value;
      }
    }
    return newStudent;
  }

  public saveAndGoToList() {
    if (this.id > 0) {
      this.serverHttp.modifyStudent(this.id, this.createNewData()).subscribe(data => {
      this.router.navigate(['students']); //Trở về lại trang Student sau khi add
      });
    } else {
      this.serverHttp.addStudent(this.createNewData()).subscribe(data => {
        // console.log("Student added:", data);
        this.router.navigate(['students']); //Trở về lại trang Student sau khi add
      });
    }
  }

  public save() {
    if (this.id > 0) {
      this.serverHttp.modifyStudent(this.id, this.createNewData()).subscribe(data => {
      });
    } else {
      this.serverHttp.addStudent(this.createNewData()).subscribe(data => {
        this.common.increamentStudent();
        this.studentForm.reset();
      });
    }
  }
}
