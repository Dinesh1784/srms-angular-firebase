import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleSubmit(f: NgForm) {
    const { email, password } = f.form.value;
    this.spinner.show();
    this.auth
      .signIn(email, password)
      .then(() => {
        this.spinner.hide();
        this.toastr.success('Sign In Successfull');
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        this.spinner.hide();
        this.toastr.error(err.message);
      });
  }
}
