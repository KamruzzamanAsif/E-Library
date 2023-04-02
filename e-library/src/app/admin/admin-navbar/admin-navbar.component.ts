import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(private router: Router) { }

  onLogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }


}
