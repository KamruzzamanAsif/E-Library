import { Component } from '@angular/core';
import { MemberRequest } from 'src/app/models/member-request';
import { MemberRequestService } from 'src/app/services/member-request.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BookCatalogService } from 'src/app/services/book-catalog.service';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-member-request',
  templateUrl: './member-request.component.html',
  styleUrls: ['./member-request.component.css']
})
export class MemberRequestComponent implements AfterViewInit{
  constructor(private memberRequestService:MemberRequestService, private _liveAnnouncer: LiveAnnouncer, private userService:UsersService){
    this.dataSource.data = this.dataSource.data.filter(memberRequest => memberRequest.status === 'n/a');
  }
  dataSource = new MatTableDataSource(this.memberRequestService.getApplicants());
  displayedColumns: string[] = ['position', 'name', 'roll', 'batch','session','program_level','mobile_number','email','address','approve'];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  approveRow(row: MemberRequest) {
    row.status = 'approved';
    let user:Users=new Users;
    ({ status, ...user } = { ...row });
    this.userService.addNewUser(user);
    this.dataSource.data = this.dataSource.data.filter(item => item.status === "n/a");
  }
  
  
}
