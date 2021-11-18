import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user_uid: any;
  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private db: DbService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  handleSubmit(f: NgForm) {
    const { name, subject, email, password, phone } = f.form.value;
    this.spinner.show();
    this.auth
      .signUp(email, password)
      .then((authUser) => {
        this.user_uid = authUser.user?.uid;
        authUser.user?.updateProfile({
          displayName: name,
        });
        this.db.addUser(this.user_uid, name, subject, email, phone);
      })
      .then(() => {
        this.spinner.hide();
        this.router.navigateByUrl('/');
        this.toastr.success('Registration Successfull');
      })
      .catch((err) => {
        this.spinner.hide();
        this.toastr.error(err.message);
      });
  }
}
