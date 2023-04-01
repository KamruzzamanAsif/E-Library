import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // check(){
  //   if (document.getElementById('navbar')?.classList.contains('navbar-mobile')) {
  //     document.getElementById('navbar')?.classList.toggle('navbar-mobile')
  //     console.log("pressed")
  //   }
  // }
}
