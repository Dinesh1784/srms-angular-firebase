import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any;
  student: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: DbService
  ) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe((userAuth) => {
      if (userAuth) {
        this.user = userAuth?.displayName;
        this.db.getMarkSpecific(userAuth.uid).subscribe((snapshot) => {
          snapshot.docs.forEach((stud) => {
            this.student.push(stud.data());
            console.log(this.student);
          });
        });
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
