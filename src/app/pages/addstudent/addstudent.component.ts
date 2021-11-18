import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DbService } from 'src/app/services/db.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss'],
})
export class AddstudentComponent implements OnInit {
  constructor(
    private db: DbService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    const { name, stdclass, rollno } = f.form.value;
    if (name === '' || stdclass === '' || rollno === '') {
      this.toastr.error('All fields are required');
    } else {
      this.spinner.show();
      this.db.addStudent(name, stdclass, rollno);
      this.spinner.hide();
      this.toastr.success('Student added');
    }
  }
}
