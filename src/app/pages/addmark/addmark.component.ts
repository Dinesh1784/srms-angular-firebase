import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addmark',
  templateUrl: './addmark.component.html',
  styleUrls: ['./addmark.component.scss'],
})
export class AddmarkComponent implements OnInit {
  userId: string = '';
  teacherData: any[] = [];
  constructor(
    private db: DbService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe((userAuth) => {
      if (userAuth) {
        this.userId = userAuth.uid;
        this.db.getCurrentTeacher(this.userId).subscribe((snapshot) => {
          this.teacherData.push(snapshot.data());
        });
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  onSubmit(f: NgForm) {
    const { name, stdClass, stdRegno, mark } = f.form.value;
    if (name === '' || stdClass === '' || stdRegno === '' || mark === '') {
      this.toastr.error('All fields are required');
    } else {
      this.db.createMarkSpecific(
        this.userId,
        name,
        stdClass,
        stdRegno,
        this.teacherData[0]?.subject,
        mark
      );
      this.toastr.success('Marks added successful');
      this.router.navigateByUrl('/');
      // console.log(this.teacherData[0]?.subject);
      // console.log(this.userId);
      // console.log(name);
      // console.log(stdClass);
      // console.log(stdRegno);
      // console.log(mark);
    }
  }
}
