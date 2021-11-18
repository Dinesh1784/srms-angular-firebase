import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.user = user?.displayName;
    });
  }

  signOut() {
    this.auth.signOut();
    this.router.navigateByUrl('/login');
    window.location.reload();
  }
}
