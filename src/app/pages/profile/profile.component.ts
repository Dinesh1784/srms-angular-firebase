import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe((userAuth) => {
      if (userAuth) {
        this.user = userAuth?.displayName;
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
