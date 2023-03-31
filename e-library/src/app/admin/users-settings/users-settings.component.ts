import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Users } from '../users';

@Component({
  selector: 'app-users-settings',
  templateUrl: './users-settings.component.html',
  styleUrls: ['./users-settings.component.css']
})
export class UsersSettingsComponent {
  constructor(private usersService:UsersService, private router:Router){}

  user:Users=new Users();
  ngOnInit():void{
    this.user=this.usersService.getUserToBeViewed();
  }
  confirmRemoval():void{
    this.usersService.deleteUser(this.user.email);
    this.router.navigate(["users-record"])
  }
}
