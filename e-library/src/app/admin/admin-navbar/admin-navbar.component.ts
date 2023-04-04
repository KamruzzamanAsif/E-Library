import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {

  constructor(private router: Router, private ngxService: NgxUiLoaderService,
  ) { }

  onLogOut() {
    this.ngxService.start();
    localStorage.removeItem('token');
    this.router.navigate(['/home']).then(() => { 
      window.location.reload(); 
      this.ngxService.stop();
    });
  }


}
