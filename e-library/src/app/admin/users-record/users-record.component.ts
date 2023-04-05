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

  constructor(private usersService: UsersService, private router: Router) { }

  displayedColumns: string[] = ['name', 'roll', 'session', 'program_level', 'email', 'mobile_number', 'address'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  users: any | Users[] = [];

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users: Users[]) => {
      this.users = users;
      console.log(this.users);
    });
  }

  viewUser(index: number): void {
    this.usersService.setUserToBeViewed(this.users[index]);
    this.router.navigate(["users-settings"])
  }
}
