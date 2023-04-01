import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-record',
  templateUrl: './users-record.component.html',
  styleUrls: ['./users-record.component.css']
})
export class UsersRecordComponent {
  constructor(private usersService:UsersService, private router:Router){}
  users:Users[]=[];

  ngOnInit():void{
    this.users=this.usersService.getUsers();
  }

  viewUser(index:number):void{
    this.usersService.setUserToBeViewed(index);
    this.router.navigate(["users-settings"])
  }
}
